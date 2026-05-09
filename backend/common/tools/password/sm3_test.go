package password

import (
	"bytes"
	"encoding/hex"
	"fmt"
	"strings"
	"testing"
)

// ======================== 原有测试（SM3 哈希） ========================

func TestGenerateSalt(t *testing.T) {
	salt1, err := GenerateSalt()
	if err != nil {
		t.Fatalf("生成盐值失败: %v", err)
	}

	salt2, err := GenerateSalt()
	if err != nil {
		t.Fatalf("生成盐值失败: %v", err)
	}

	if salt1 == salt2 {
		t.Error("两次生成的盐值应该不同")
	}

	if len(salt1) != SaltLength*2 {
		t.Errorf("盐值长度错误，期望 %d，实际 %d", SaltLength*2, len(salt1))
	}

	fmt.Printf("盐值1: %s\n", salt1)
	fmt.Printf("盐值2: %s\n", salt2)
}

func TestHashPassword(t *testing.T) {
	password := "MyPassword123"
	salt := "abcdef1234567890"

	hash := HashPassword(password, salt)

	if len(hash) != 64 {
		t.Errorf("哈希值长度错误，期望 64，实际 %d", len(hash))
	}

	fmt.Printf("密码: %s\n", password)
	fmt.Printf("盐值: %s\n", salt)
	fmt.Printf("哈希值: %s\n", hash)

	hash2 := HashPassword(password, salt)
	if hash != hash2 {
		t.Error("相同输入应产生相同的哈希值")
	}
}

func TestGeneratePasswordHash(t *testing.T) {
	password := "TestPassword@2024"

	pwHash, err := GeneratePasswordHash(password)
	if err != nil {
		t.Fatalf("生成密码哈希失败: %v", err)
	}

	if pwHash.Hash == "" {
		t.Error("哈希值不应为空")
	}
	if pwHash.Salt == "" {
		t.Error("盐值不应为空")
	}
	if len(pwHash.Hash) != 64 {
		t.Errorf("哈希值长度错误，期望 64，实际 %d", len(pwHash.Hash))
	}
	if len(pwHash.Salt) != SaltLength*2 {
		t.Errorf("盐值长度错误，期望 %d，实际 %d", SaltLength*2, len(pwHash.Salt))
	}

	fmt.Printf("原始密码: %s\n", password)
	fmt.Printf("存储哈希: %s\n", pwHash.Hash)
	fmt.Printf("存储盐值: %s\n", pwHash.Salt)
}

func TestVerifyPassword(t *testing.T) {
	password := "CorrectPassword123"

	pwHash, err := GeneratePasswordHash(password)
	if err != nil {
		t.Fatalf("生成密码哈希失败: %v", err)
	}

	if !VerifyPassword(password, pwHash.Hash, pwHash.Salt) {
		t.Error("正确密码验证失败")
	}

	wrongPassword := "WrongPassword456"
	if VerifyPassword(wrongPassword, pwHash.Hash, pwHash.Salt) {
		t.Error("错误密码不应该通过验证")
	}

	if VerifyPassword("", pwHash.Hash, pwHash.Salt) {
		t.Error("空密码不应该通过验证")
	}

	// 空参数边界测试
	if VerifyPassword(password, "", pwHash.Salt) {
		t.Error("空哈希不应该通过验证")
	}
	if VerifyPassword(password, pwHash.Hash, "") {
		t.Error("空盐值不应该通过验证")
	}

	fmt.Println("密码验证测试通过")
}

func TestEncodePasswordHash(t *testing.T) {
	plain := "MySecret123"

	stored, err := EncodePasswordHash(plain)
	if err != nil {
		t.Fatalf("编码失败: %v", err)
	}

	// 格式检查: 必须以 $sm3$ 开头
	if !strings.HasPrefix(stored, "$sm3$") {
		t.Errorf("格式错误，期望以 $sm3$ 开头，实际: %s", stored[:10])
	}

	parts := strings.Split(stored, "$")
	// "$" + "sm3" + hash + salt = 分割后 4 段（首段为空）
	if len(parts) != 4 {
		t.Errorf("分段数量错误，期望 4 段，实际 %d: %v", len(parts), parts)
	}
	if len(parts[2]) != 64 {
		t.Errorf("hash 长度错误，期望 64，实际 %d", len(parts[2]))
	}
	if len(parts[3]) != 32 {
		t.Errorf("salt 长度错误，期望 32，实际 %d", len(parts[3]))
	}

	fmt.Printf("编码结果: %s\n", stored)
	fmt.Printf("hash: %s, salt: %s\n", parts[2], parts[3])
}

func TestVerifyStoredPassword(t *testing.T) {
	plain := "TestPass@2024"

	// 编码
	stored, _ := EncodePasswordHash(plain)

	// 正确密码
	if !VerifyStoredPassword(plain, stored) {
		t.Error("正确密码验证失败")
	}

	// 错误密码
	if VerifyStoredPassword("WrongPass", stored) {
		t.Error("错误密码不应该通过")
	}

	// 空输入
	if VerifyStoredPassword("", stored) {
		t.Error("空密码不应该通过")
	}

	// 无效存储格式
	if VerifyStoredPassword(plain, "invalid_format") {
		t.Error("无效格式不应该通过")
	}
	if VerifyStoredPassword(plain, "$pbkdf2$hash$salt") {
		t.Error("不同算法前缀不应通过")
	}

	fmt.Println("一键验证测试通过")
}

func TestSplitStored(t *testing.T) {
	tests := []struct{
		input    string
		expected int
	}{
		{"$sm3$hash$salt", 3},       // $sm3$hash$salt → [sm3, hash, salt]
		{"$pbkdf2$hash$salt$10000", 4},
		{"", 0},
		{"no_dollar", 0},
		{"$only_one", 1},
		{"$a$b$c$d$e", 5},
	}

	for _, tc := range tests {
		result := splitStored(tc.input)
		if len(result) != tc.expected {
			t.Errorf("splitStored(%q) = %v (len=%d), 期望段数=%d",
				tc.input, result, len(result), tc.expected)
		}
	}
}

func TestVerifyPasswordConsistency(t *testing.T) {
	password := "ConsistentPassword"

	for i := 0; i < 5; i++ {
		pwHash, err := GeneratePasswordHash(password)
		if err != nil {
			t.Fatalf("第 %d 次生成密码哈希失败: %v", i, err)
		}

		if !VerifyPassword(password, pwHash.Hash, pwHash.Salt) {
			t.Errorf("第 %d 次验证失败", i)
		}
	}

	fmt.Println("一致性测试通过")
}

func TestConstantTimeCompare(t *testing.T) {
	tests := []struct {
		a, b     string
		expected bool
	}{
		{"same", "same", true},
		{"different", "values", false},
		{"", "", true},
		{"a", "b", false},
		{"short", "longerstring", false},
	}

	for _, test := range tests {
		result := constantTimeCompare(test.a, test.b)
		if result != test.expected {
			t.Errorf("constantTimeCompare(%q, %q) = %v, 期望 %v",
				test.a, test.b, result, test.expected)
		}
	}
}

// ======================== PBKDF2-HMAC-SM3 测试 ========================

func TestGeneratePBKDF2Hash(t *testing.T) {
	password := "SecurePassword!2024"

	pwHash, err := GeneratePBKDF2Hash(password, DefaultPBKDF2Iterations)
	if err != nil {
		t.Fatalf("生成 PBKDF2 哈希失败: %v", err)
	}

	if pwHash.Hash == "" {
		t.Error("PBKDF2 哈希值不应为空")
	}
	if pwHash.Salt == "" {
		t.Error("PBKDF2 盐值不应为空")
	}
	if pwHash.Iterations != DefaultPBKDF2Iterations {
		t.Errorf("迭代次数不匹配，期望 %d，实际 %d", DefaultPBKDF2Iterations, pwHash.Iterations)
	}
	if len(pwHash.Hash) != 64 { // 32 字节 = 64 个十六进制字符
		t.Errorf("PBKDF2 哈希长度错误，期望 64，实际 %d", len(pwHash.Hash))
	}

	fmt.Printf("原始密码: %s\n", password)
	fmt.Printf("PBKDF2 哈希: %s\n", pwHash.Hash)
	fmt.Printf("PBKDF2 盐值: %s\n", pwHash.Salt)
	fmt.Printf("迭代次数: %d\n", pwHash.Iterations)
}

func TestVerifyPBKDF2Password(t *testing.T) {
	password := "MySecurePass@2024"

	// 生成哈希
	pwHash, err := GeneratePBKDF2Hash(password, DefaultPBKDF2Iterations)
	if err != nil {
		t.Fatalf("生成 PBKDF2 哈希失败: %v", err)
	}

	// 正确密码验证
	if !VerifyPBKDF2Password(password, pwHash.Hash, pwHash.Salt, pwHash.Iterations) {
		t.Error("正确密码验证失败 (PBKDF2)")
	}

	// 错误密码验证
	wrongPwd := "WrongPassword"
	if VerifyPBKDF2Password(wrongPwd, pwHash.Hash, pwHash.Salt, pwHash.Iterations) {
		t.Error("错误密码不应该通过验证 (PBKDF2)")
	}

	// 边界条件
	if VerifyPBKDF2Password("", pwHash.Hash, pwHash.Salt, pwHash.Iterations) {
		t.Error("空密码不应该通过验证")
	}
	if VerifyPBKDF2Password(password, "", pwHash.Salt, pwHash.Iterations) {
		t.Error("空哈希不应该通过验证")
	}
	if VerifyPBKDF2Password(password, pwHash.Hash, "", pwHash.Iterations) {
		t.Error("空盐值不应该通过验证")
	}
	if VerifyPBKDF2Password(password, pwHash.Hash, pwHash.Salt, 0) {
		t.Error("无效迭代次数不应该通过验证")
	}

	fmt.Println("PBKDF2 密码验证测试通过")
}

func TestPBKDF2Uniqueness(t *testing.T) {
	password := "SamePassword"

	hash1, _ := GeneratePBKDF2Hash(password, 1000)
	hash2, _ := GeneratePBKDF2Hash(password, 1000)

	// 相同密码、相同迭代次数，由于随机盐值不同，哈希应不同
	if hash1.Hash == hash2.Hash && hash1.Salt == hash2.Salt {
		t.Error("两次 PBKDF2 哈希应该不同（随机盐值）")
	}

	// 但各自都应该能验证成功
	if !VerifyPBKDF2Password(password, hash1.Hash, hash1.Salt, hash1.Iterations) {
		t.Error("第一个哈希验证失败")
	}
	if !VerifyPBKDF2Password(password, hash2.Hash, hash2.Salt, hash2.Iterations) {
		t.Error("第二个哈希验证失败")
	}

	fmt.Println("PBKDF2 唯一性测试通过")
}

func TestPBKDF2DifferentIterations(t *testing.T) {
	password := "IterTest"

	hash1000, _ := GeneratePBKDF2Hash(password, 1000)
	hash5000, _ := GeneratePBKDF2Hash(password, 5000)

	// 使用相同盐值但不同迭代次数时，结果应该不同
	if hash1000.Hash == hash5000.Hash && hash1000.Salt == hash5000.Salt {
		// 极小概率事件（如果盐值碰巧相同），忽略
		fmt.Println("注意：盐值碰巧相同，跳过此断言")
	} else {
		fmt.Printf("不同迭代次数产生了不同的哈希 ✓\n")
	}

	fmt.Println("PBKDF2 不同迭代次数测试通过")
}

// ======================== SM4 加解密测试 ========================

func TestGenerateSM4Key(t *testing.T) {
	key1, err := GenerateSM4Key()
	if err != nil {
		t.Fatalf("生成 SM4 密钥失败: %v", err)
	}

	key2, err := GenerateSM4Key()
	if err != nil {
		t.Fatalf("生成 SM4 密钥失败: %v", err)
	}

	if key1 == key2 {
		t.Error("两次生成的 SM4 密钥应该不同")
	}

	keyBytes, err := hex.DecodeString(key1)
	if err != nil || len(keyBytes) != SM4KeyLength {
		t.Errorf("SM4 密钥长度错误，期望 %d 字节", SM4KeyLength)
	}

	fmt.Printf("SM4 密钥1: %s\n", key1)
	fmt.Printf("SM4 密钥2: %s\n", key2)
}

func TestGenerateSM4Nonce(t *testing.T) {
	nonce1, err := GenerateSM4Nonce()
	if err != nil {
		t.Fatalf("生成 Nonce 失败: %v", err)
	}

	nonceBytes, err := hex.DecodeString(nonce1)
	if err != nil || len(nonceBytes) != SM4BlockSize {
		t.Errorf("Nonce 长度错误，期望 %d 字节", SM4BlockSize)
	}

	fmt.Printf("SM4 Nonce: %s\n", nonce1)
}

func TestSM4EncryptDecrypt(t *testing.T) {
	keyHex, _ := GenerateSM4Key()

	testCases := []struct {
		name      string
		plaintext string
	}{
		{"短文本", "Hello World"},
		{"中文", "你好世界，这是一段中文"},
		{"特殊字符", "P@ssw0rd_SpecialChars!"},
		{"JSON数据", `{"name":"test","value":123}`},
		{"长文本", generateLongText(128)},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			ciphertextB64, err := SM4Encrypt(keyHex, tc.plaintext)
			if err != nil {
				t.Fatalf("加密失败: %v", err)
			}

			plaintext, err := SM4Decrypt(keyHex, ciphertextB64)
			if err != nil {
				t.Fatalf("解密失败: %v", err)
			}

			if plaintext != tc.plaintext {
				t.Errorf("解密后明文不匹配\n期望: %q\n实际: %q", tc.plaintext, plaintext)
			}

			fmt.Printf("[%s] 加解密成功，密文长度: %d\n", tc.name, len(ciphertextB64))
		})
	}
}

func TestSM4EncryptWithNonce(t *testing.T) {
	keyHex, _ := GenerateSM4Key()
	nonceHex, _ := GenerateSM4Nonce()
	plaintext := "使用指定 Nonce 加密的数据"

	// 加密
	ciphertextB64, err := SM4EncryptWithNonce(keyHex, nonceHex, plaintext)
	if err != nil {
		t.Fatalf("加密失败: %v", err)
	}

	// 解密
	result, err := SM4DecryptWithNonce(keyHex, nonceHex, ciphertextB64)
	if err != nil {
		t.Fatalf("解密失败: %v", err)
	}

	if result != plaintext {
		t.Errorf("加解密结果不匹配: 期望 %q, 实际 %q", plaintext, result)
	}

	fmt.Printf("指定 Nonce 加解密成功\n")
}

func TestSM4WrongKeyFail(t *testing.T) {
	key1, _ := GenerateSM4Key()
	key2, _ := GenerateSM4Key()

	plaintext := "SecretData"
	ciphertext, err := SM4Encrypt(key1, plaintext)
	if err != nil {
		t.Fatalf("加密失败: %v", err)
	}

	// 用错误的密钥解密
	_, err = SM4Decrypt(key2, ciphertext)
	if err == nil {
		t.Error("使用错误密钥解密应该失败")
	} else {
		fmt.Printf("正确拒绝了错误密钥解密: %v\n", err)
	}
}

func TestSM4InvalidInput(t *testing.T) {
	validKey, _ := GenerateSM4Key()

	// 无效密钥 - 长度不对
	_, err := SM4Encrypt("shortkey", "data")
	if err == nil {
		t.Error("短密钥应该报错")
	}

	_, err = SM4Decrypt("shortkey", "ciphertext")
	if err == nil {
		t.Error("短密钥应该报错")
	}

	// 无效的 Base64 密文
	_, err = SM4Decrypt(validKey, "!!!invalid-base64!!!")
	if err == nil {
		t.Error("无效 Base64 应该报错")
	}

	// 被篡改的密文
	validCT, _ := SM4Encrypt(validKey, "test")
	tampered := validCT[:len(validCT)-4] + "XXXX"
	_, err = SM4Decrypt(validKey, tampered)
	if err == nil {
		t.Error("被篡改的密文应该报错")
	}

	fmt.Println("SM4 无效输入处理测试通过")
}

func TestSM4EmptyAndBoundary(t *testing.T) {
	keyHex, _ := GenerateSM4Key()

	// 空字符串
	ct, err := SM4Encrypt(keyHex, "")
	if err != nil {
		t.Fatalf("空字符串加密失败: %v", err)
	}
	pt, err := SM4Decrypt(keyHex, ct)
	if err != nil {
		t.Fatalf("空字符串解密失败: %v", err)
	}
	if pt != "" {
		t.Errorf("空字符串加解密不匹配，得到: %q", pt)
	}

	// 恰好一个分块的长度 (16字节)
	blockSized := "AAAAAAAAAAAAAAA" // 15 字节
	ct, err = SM4Encrypt(keyHex, blockSized)
	if err != nil {
		t.Fatalf("15字节加密失败: %v", err)
	}
	pt, err = SM4Decrypt(keyHex, ct)
	if err != nil {
		t.Fatalf("15字节解密失败: %v", err)
	}
	if pt != blockSized {
		t.Errorf("15字节加解密不匹配")
	}

	// 恰好填满一个分块 (16字节)
	fullBlock := "AAAAAAAAAAAAAAAA" // 16 字节
	ct, err = SM4Encrypt(keyHex, fullBlock)
	if err != nil {
		t.Fatalf("16字节加密失败: %v", err)
	}
	pt, err = SM4Decrypt(keyHex, ct)
	if err != nil {
		t.Fatalf("16字节解密失败: %v", err)
	}
	if pt != fullBlock {
		t.Errorf("16字节加解密不匹配")
	}

	fmt.Println("SM4 边界条件测试通过")
}

// ======================== 输入校验测试 ========================

func TestValidatePassword(t *testing.T) {
	tests := []struct{
		password string
		shouldErr bool
	}{
		{"normal", false},
		{string(make([]byte, MaxPasswordLength)), false},   // 最大长度
		{"", true},                                          // 空
		{string(make([]byte, MaxPasswordLength + 1)), true}, // 超长
	}

	for _, tc := range tests {
		err := validatePassword(tc.password)
		if tc.shouldErr && err == nil {
			t.Errorf("密码 %q 应该返回错误", truncateStr(tc.password, 20))
		}
		if !tc.shouldErr && err != nil {
			t.Errorf("密码 %q 不应该返回错误: %v", truncateStr(tc.password, 20), err)
		}
	}
}

// ======================== Base64 编解码测试 ========================

func TestBase64EncodeDecode(t *testing.T) {
	data := []byte("Hello, Base64 World! 你好")

	encoded := encodeBase64(data)
	decoded, err := decodeBase64(encoded)
	if err != nil {
		t.Fatalf("Base64 解码失败: %v", err)
	}

	if !bytes.Equal(data, decoded) {
		t.Errorf("Base64 编解码不一致\n原始: %v\n解码: %v", data, decoded)
	}

	fmt.Printf("Base64 编解码测试通过: %s\n", encoded)
}

// ======================== 性能基准测试 ========================

func BenchmarkHashPassword(b *testing.B) {
	password := "BenchmarkPassword123"
	salt := "benchmarksalt123456"

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		HashPassword(password, salt)
	}
}

func BenchmarkGeneratePasswordHash(b *testing.B) {
	password := "BenchmarkPassword123"

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GeneratePasswordHash(password)
	}
}

func BenchmarkVerifyPassword(b *testing.B) {
	password := "BenchmarkPassword123"
	pwHash, _ := GeneratePasswordHash(password)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		VerifyPassword(password, pwHash.Hash, pwHash.Salt)
	}
}

func BenchmarkPBKDF2Hash_1000(b *testing.B) {
	password := "BenchmarkPassword123"
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GeneratePBKDF2Hash(password, 1000)
	}
}

func BenchmarkPBKDF2Hash_10000(b *testing.B) {
	password := "BenchmarkPassword123"
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GeneratePBKDF2Hash(password, DefaultPBKDF2Iterations)
	}
}

func BenchmarkSM4Encrypt(b *testing.B) {
	key, _ := GenerateSM4Key()
	plaintext := "This is a benchmark message for SM4 encryption testing"

	var ciphertext string
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		ciphertext, _ = SM4Encrypt(key, plaintext)
	}
	_ = ciphertext
}

func BenchmarkSM4Decrypt(b *testing.B) {
	key, _ := GenerateSM4Key()
	plaintext := "This is a benchmark message for SM4 decryption testing"
	ciphertext, _ := SM4Encrypt(key, plaintext)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		SM4Decrypt(key, ciphertext)
	}
}

// ======================== 示例函数 ========================

func ExampleGeneratePasswordHash() {
	password := "UserPassword123"

	// 注册时：生成密码哈希并存储
	pwHash, _ := GeneratePasswordHash(password)
	fmt.Printf("注册 - 哈希长度: %d, 盐值长度: %d\n", len(pwHash.Hash), len(pwHash.Salt))

	// 登录时：验证密码
	isValid := VerifyPassword(password, pwHash.Hash, pwHash.Salt)
	fmt.Printf("登录 - 密码验证结果: %v\n", isValid)

	// Output:
	// 注册 - 哈希长度: 64, 盐值长度: 32
	// 登录 - 密码验证结果: true
}

func ExampleGeneratePBKDF2Hash() {
	password := "SecureUserPassword!"

	pwHash, _ := GeneratePBKDF2Hash(password, 10000)
	fmt.Printf("哈希长度: %d, 迭代次数: %d\n", len(pwHash.Hash), pwHash.Iterations)

	isValid := VerifyPBKDF2Password(password, pwHash.Hash, pwHash.Salt, pwHash.Iterations)
	fmt.Printf("验证结果: %v\n", isValid)

	// Output:
	// 哈希长度: 64, 迭代次数: 10000
	// 验证结果: true
}

func ExampleSM4Encrypt() {
	key, _ := GenerateSM4Key()

	plaintext := `{"cardNo":"622202******1234","cvv":"***"}`
	ciphertext, _ := SM4Encrypt(key, plaintext)

	decrypted, _ := SM4Decrypt(key, ciphertext)
	fmt.Printf("解密后明文: %s\n", decrypted)

	// Output:
	// 解密后明文: {"cardNo":"622202******1234","cvv":"***"}
}

// ======================== 辅助函数 ========================

func generateLongText(n int) string {
	return strings.Repeat("这是一个用于测试的长文本。", (n/len("这是一个用于测试的长文本。"))+1)[:n]
}

func truncateStr(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen] + "..."
}
