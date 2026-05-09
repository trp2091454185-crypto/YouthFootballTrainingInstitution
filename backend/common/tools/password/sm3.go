package password

import (
	"bytes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"hash"
	"io"

	"github.com/tjfoc/gmsm/sm3"
	"github.com/tjfoc/gmsm/sm4"
)

// ======================== 常量定义 ========================

const (
	// SaltLength 定义盐值长度（字节）
	SaltLength = 16

	// SM4KeyLength SM4 密钥长度（字节，128位）
	SM4KeyLength = 16

	// SM4BlockSize SM4 分组大小（字节）
	SM4BlockSize = 16

	// DefaultPBKDF2Iterations 默认 PBKDF2 迭代次数（可根据安全需求调整）
	DefaultPBKDF2Iterations = 10000

	// MinPasswordLength 最小密码长度
	MinPasswordLength = 1

	// MaxPasswordLength 最大密码长度（防止 DoS）
	MaxPasswordLength = 128
)

// ======================== 密码哈希（SM3） ========================

const (
	// algoSM3 存储格式前缀标识
	algoSM3    = "sm3"
	algoPBKDF2 = "pbkdf2"
	sep        = "$"
)

// PasswordHash 存储密码哈希信息
type PasswordHash struct {
	Hash string `json:"hash"` // SM3 哈希值（十六进制编码）
	Salt string `json:"salt"` // 盐值（十六进制编码）
}

// PBKDF2PasswordHash 基于 PBKDF2 的密码哈希信息（更安全）
type PBKDF2PasswordHash struct {
	Hash      string `json:"hash"`       // 派生密钥哈希值
	Salt      string `json:"salt"`       // 盐值
	Iterations int    `json:"iterations"` // 迭代次数
}

// GenerateSalt 生成随机盐值
func GenerateSalt() (string, error) {
	salt := make([]byte, SaltLength)
	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		return "", fmt.Errorf("生成盐值失败: %w", err)
	}
	return hex.EncodeToString(salt), nil
}

// HashPassword 使用 SM3 对密码进行哈希（带盐值）
// 采用 HMAC 风格的盐值组合：SM3(salt + password)，更安全
func HashPassword(password, salt string) string {
	// 将盐值和密码组合（盐值在前，防止哈希长度扩展攻击）
	combined := []byte(salt + password)

	// 计算 SM3 哈希（gmsm 的 Sm3Sum 返回 []byte）
	hash := sm3.Sm3Sum(combined)

	// 返回十六进制编码的哈希值
	return hex.EncodeToString(hash)
}

// GeneratePasswordHash 生成完整的密码哈希（包含随机盐值）
func GeneratePasswordHash(password string) (*PasswordHash, error) {
	if err := validatePassword(password); err != nil {
		return nil, err
	}

	// 生成随机盐值
	salt, err := GenerateSalt()
	if err != nil {
		return nil, err
	}

	// 计算密码哈希
	hash := HashPassword(password, salt)

	return &PasswordHash{
		Hash: hash,
		Salt: salt,
	}, nil
}

// VerifyPassword 验证密码是否匹配（使用简单 SM3 哈希）
func VerifyPassword(password, storedHash, storedSalt string) bool {
	// 边界检查
	if password == "" || storedHash == "" || storedSalt == "" {
		return false
	}

	// 使用存储的盐值计算输入密码的哈希
	computedHash := HashPassword(password, storedSalt)

	// 比较哈希值（使用常量时间比较防止时序攻击）
	return constantTimeCompare(computedHash, storedHash)
}

// EncodePasswordHash 一键生成并编码为数据库存储格式
// 返回: $sm3$<hash>$<salt>
//
// 用法（创建用户）:
//
//	req.Password, err = password.EncodePasswordHash("plainPassword")
func EncodePasswordHash(plaintext string) (string, error) {
	pw, err := GeneratePasswordHash(plaintext)
	if err != nil {
		return "", err
	}
	return sep + algoSM3 + sep + pw.Hash + sep + pw.Salt, nil
}

// VerifyStoredPassword 一键解析存储格式并验证密码
// stored 为数据库中存储的字符串，如 "$sm3$<hash>$<salt>"
//
// 用法（登录验证）:
//
//	ok := password.VerifyStoredPassword("userInput", dbRecord.Password)
func VerifyStoredPassword(input, stored string) bool {
	parts := splitStored(stored)
	// 格式: $<algo>$<hash>$<salt> → 分割后 3 段
	if len(parts) < 3 || parts[0] != algoSM3 {
		return false
	}
	return VerifyPassword(input, parts[1], parts[2])
}

// ======================== PBKDF2-HMAC-SM3 密钥派生（更安全的密码存储） ========================

// GeneratePBKDF2Hash 使用 PBKDF2-HMAC-SM3 生成密码哈希
// 推荐用于生产环境，具有抗暴力破解能力
func GeneratePBKDF2Hash(password string, iterations int) (*PBKDF2PasswordHash, error) {
	if err := validatePassword(password); err != nil {
		return nil, err
	}
	if iterations <= 0 {
		iterations = DefaultPBKDF2Iterations
	}

	// 生成随机盐值
	salt, err := GenerateSalt()
	if err != nil {
		return nil, fmt.Errorf("生成 PBKDF2 盐值失败: %w", err)
	}

	// 计算 PBKDF2-HMAC-SM3 派生密钥
 dk := pbkdf2(sm3.New, []byte(password), []byte(salt), iterations, 32)

	return &PBKDF2PasswordHash{
		Hash:      hex.EncodeToString(dk),
		Salt:      salt,
		Iterations: iterations,
	}, nil
}

// VerifyPBKDF2Password 验证 PBKDF2 哈希密码
func VerifyPBKDF2Password(password, storedHash, storedSalt string, iterations int) bool {
	if password == "" || storedHash == "" || storedSalt == "" || iterations <= 0 {
		return false
	}

	dk := pbkdf2(sm3.New, []byte(password), []byte(storedSalt), iterations, 32)
	computedHash := hex.EncodeToString(dk)

	return constantTimeCompare(computedHash, storedHash)
}

// pbkdf2 通用 PBKDF2 实现（基于任意哈希函数）
// hashFunc: 哈希函数构造器（如 sm3.New，返回 hash.Hash）
// password: 密码/口令
// salt: 盐值
// iterations: 迭代次数
// keyLen: 派生密钥长度（字节）
func pbkdf2(hashFunc func() hash.Hash, password, salt []byte, iterations, keyLen int) []byte {
	hashSize := 32 // SM3 输出长度为 32 字节

	// 计算需要的块数
	numBlocks := (keyLen + hashSize - 1) / hashSize
	dk := make([]byte, 0, numBlocks*hashSize)

	for block := 1; block <= numBlocks; block++ {
		// U_1 = PRF(password, salt || INT(i))
		h := hashFunc()
		h.Write(password)
		h.Write(salt)
		h.Write([]byte{byte(block >> 24), byte(block >> 16), byte(block >> 8), byte(block)})
		u := h.Sum(nil)

		result := make([]byte, len(u))
		copy(result, u)

		// U_2 ... U_c = PRF(password, U_{c-1})
		for i := 1; i < iterations; i++ {
			h = hashFunc()
			h.Write(password)
			h.Write(u)
			u = h.Sum(nil)

			for j := range result {
				result[j] ^= u[j]
			}
		}

		dk = append(dk, result...)
	}

	return dk[:keyLen]
}

// ======================== SM4 对称加解密 ========================

// SM4Cipher SM4 加密结果
type SM4Cipher struct {
	Ciphertext string `json:"ciphertext"` // 密文（Base64 编码）
	Nonce      string `json:"nonce"`       // IV/Nonce（十六进制编码）
}

// GenerateSM4Key 生成随机 SM4 密钥
func GenerateSM4Key() (string, error) {
	key := make([]byte, SM4KeyLength)
	_, err := io.ReadFull(rand.Reader, key)
	if err != nil {
		return "", fmt.Errorf("生成 SM4 密钥失败: %w", err)
	}
	return hex.EncodeToString(key), nil
}

// GenerateSM4Nonce 生成随机 SM4 Nonce/IV
func GenerateSM4Nonce() (string, error) {
	nonce := make([]byte, SM4BlockSize)
	_, err := io.ReadFull(rand.Reader, nonce)
	if err != nil {
		return "", fmt.Errorf("生成 SM4 Nonce 失败: %w", err)
	}
	return hex.EncodeToString(nonce), nil
}

// SM4Encrypt SM4 加密（CBC 模式，PKCS7 填充）
// keyHex: 十六进制编码的密钥（32 个字符 / 16 字节）
// plaintext: 明文字符串
// 返回：密文（Base64 编码）+ 错误
func SM4Encrypt(keyHex, plaintext string) (string, error) {
	// 校验密钥
	key, err := hex.DecodeString(keyHex)
	if err != nil || len(key) != SM4KeyLength {
		return "", fmt.Errorf("无效的 SM4 密钥：期望 %d 字节的十六进制字符串", SM4KeyLength)
	}

	// 生成随机 IV
	iv := make([]byte, SM4BlockSize)
	if _, err = io.ReadFull(rand.Reader, iv); err != nil {
		return "", fmt.Errorf("生成 IV 失败: %w", err)
	}

	// 创建 SM4 加密块
	block, err := sm4.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("创建 SM4 加密器失败: %w", err)
	}

	// PKCS7 填充
	data := pkcs7Pad([]byte(plaintext), SM4BlockSize)

	// CBC 模式加密
	mode := cipher.NewCBCEncrypter(block, iv)
	ciphertext := make([]byte, len(data))
	mode.CryptBlocks(ciphertext, data)

	// 格式：IV(16字节) + 密文 → Base64
	result := append(iv, ciphertext...)
	return encodeBase64(result), nil
}

// SM4Decrypt SM4 解密（CBC 模式，PKCS7 填充）
// keyHex: 十六进制编码的密钥
// ciphertextB64: Base64 编码的密文（包含 IV 前缀）
// 返回：明文 + 错误
func SM4Decrypt(keyHex, ciphertextB64 string) (string, error) {
	// 校验密钥
	key, err := hex.DecodeString(keyHex)
	if err != nil || len(key) != SM4KeyLength {
		return "", fmt.Errorf("无效的 SM4 密钥：期望 %d 字节的十六进制字符串", SM4KeyLength)
	}

	// Base64 解码
	data, err := decodeBase64(ciphertextB64)
	if err != nil {
		return "", fmt.Errorf("Base64 解码失败: %w", err)
	}

	// 数据至少需要包含 IV + 至少一个分块
	if len(data) < SM4BlockSize*2 || len(data)%SM4BlockSize != 0 {
		return "", fmt.Errorf("密文长度无效")
	}

	// 分离 IV 和密文
	iv := data[:SM4BlockSize]
	ciphertext := data[SM4BlockSize:]

	// 创建 SM4 解密块
	block, err := sm4.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("创建 SM4 解密器失败: %w", err)
	}

	// CBC 模式解密
	mode := cipher.NewCBCDecrypter(block, iv)
	plaintext := make([]byte, len(ciphertext))
	mode.CryptBlocks(plaintext, ciphertext)

	// 移除 PKCS7 填充
	plaintext, err = pkcs7Unpad(plaintext)
	if err != nil {
		return "", fmt.Errorf("PKCS7 去填充失败: %w", err)
	}

	return string(plaintext), nil
}

// SM4EncryptWithNonce 使用指定 Nonce 进行 SM4 加密
// 适用于需要管理 Nonce 的场景（如数据库字段加密）
func SM4EncryptWithNonce(keyHex, nonceHex, plaintext string) (string, error) {
	key, err := hex.DecodeString(keyHex)
	if err != nil || len(key) != SM4KeyLength {
		return "", fmt.Errorf("无效的 SM4 密钥")
	}

	iv, err := hex.DecodeString(nonceHex)
	if err != nil || len(iv) != SM4BlockSize {
		return "", fmt.Errorf("无效的 SM4 Nonce")
	}

	block, err := sm4.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("创建 SM4 加密器失败: %w", err)
	}

	data := pkcs7Pad([]byte(plaintext), SM4BlockSize)
	mode := cipher.NewCBCEncrypter(block, iv)
	ciphertext := make([]byte, len(data))
	mode.CryptBlocks(ciphertext, data)

	return encodeBase64(ciphertext), nil
}

// SM4DecryptWithNonce 使用指定 Nonce 进行 SM4 解密
func SM4DecryptWithNonce(keyHex, nonceHex, ciphertextB64 string) (string, error) {
	key, err := hex.DecodeString(keyHex)
	if err != nil || len(key) != SM4KeyLength {
		return "", fmt.Errorf("无效的 SM4 密钥")
	}

	iv, err := hex.DecodeString(nonceHex)
	if err != nil || len(iv) != SM4BlockSize {
		return "", fmt.Errorf("无效的 SM4 Nonce")
	}

	data, err := decodeBase64(ciphertextB64)
	if err != nil {
		return "", fmt.Errorf("Base64 解码失败: %w", err)
	}

	if len(data) < SM4BlockSize || len(data)%SM4BlockSize != 0 {
		return "", fmt.Errorf("密文长度无效")
	}

	block, err := sm4.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("创建 SM4 解密器失败: %w", err)
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	plaintext := make([]byte, len(data))
	mode.CryptBlocks(plaintext, data)

	plaintext, err = pkcs7Unpad(plaintext)
	if err != nil {
		return "", fmt.Errorf("去填充失败: %w", err)
	}

	return string(plaintext), nil
}

// ======================== 内部工具函数 ========================

// splitStored 解析存储格式字符串
// 格式: $<algo>$<hash>$<salt>[$<iterations>]
func splitStored(stored string) []string {
	// 快速检查：必须以 $ 开头
	if len(stored) == 0 || stored[0] != sep[0] {
		return nil
	}
	parts := make([]string, 0, 4)
	start := 1 // 跳过开头的 $
	for i := 1; i < len(stored); i++ {
		if stored[i] == sep[0] {
			parts = append(parts, stored[start:i])
			start = i + 1
		}
	}
	if start < len(stored) {
		parts = append(parts, stored[start:])
	}
	return parts
}

// constantTimeCompare 常量时间字符串比较，防止时序攻击
func constantTimeCompare(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	var result byte
	for i := 0; i < len(a); i++ {
		result |= a[i] ^ b[i]
	}
	return result == 0
}

// validatePassword 验证密码输入合法性
func validatePassword(password string) error {
	if len(password) < MinPasswordLength {
		return fmt.Errorf("密码长度不能小于 %d 个字符", MinPasswordLength)
	}
	if len(password) > MaxPasswordLength {
		return fmt.Errorf("密码长度不能超过 %d 个字符", MaxPasswordLength)
	}
	return nil
}

// pkcs7Add PKCS7 填充
func pkcs7Pad(data []byte, blockSize int) []byte {
	padding := blockSize - len(data)%blockSize
	padText := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(data, padText...)
}

// pkcs7Unpad PKCS7 去填充
func pkcs7Unpad(data []byte) ([]byte, error) {
	if len(data) == 0 {
		return nil, fmt.Errorf("数据为空")
	}
	padding := int(data[len(data)-1])
	if padding < 1 || padding > SM4BlockSize {
		return nil, fmt.Errorf("填充值无效: %d", padding)
	}
	for i := len(data) - padding; i < len(data); i++ {
		if data[i] != byte(padding) {
			return nil, fmt.Errorf("填充数据不正确")
		}
	}
	return data[:len(data)-padding], nil
}

// encodeBase64 Base64 编码
func encodeBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

// decodeBase64 Base64 解码
func decodeBase64(s string) ([]byte, error) {
	return base64.StdEncoding.DecodeString(s)
}
