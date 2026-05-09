// Package password 提供国密密码工具集
//
// # 功能概览
//
// 本工具包基于中国国家密码标准（GM/T）实现，包含以下功能：
//
// ## 1. SM3 密码哈希（单向）
//
// 用于用户密码的安全存储（注册/登录场景）：
//
//	// 注册时生成密码哈希
//	pwHash, err := password.GeneratePasswordHash("userPassword123")
//	// 将 pwHash.Hash 和 pwHash.Salt 存储到数据库
//
//	// 登录时验证密码
//	isValid := password.VerifyPassword(inputPassword, storedHash, storedSalt)
//
// ## 2. PBKDF2-HMAC-SM3 密钥派生（推荐，更安全）
//
// 使用 PBKDF2 算法增强抗暴力破解能力，适用于高安全要求场景：
//
//	// 生成 PBKDF2 哈希（默认迭代 10000 次）
//	pwHash, err := password.GeneratePBKDF2Hash("securePassword", 10000)
//	// 存储 pwHash.Hash、pwHash.Salt、pwHash.Iterations
//
//	// 验证密码
//	isValid := password.VerifyPBKDF2Password(pwd, hash, salt, iterations)
//
// ## 3. SM4 对称加解密（可逆加密）
//
// 用于敏感数据的加密存储和传输（如手机号、身份证号等）：
//
//	// 生成密钥（需妥善保管，可存储在配置中心或环境变量中）
//	key, _ := password.GenerateSM4Key()
//
//	// 加密（自动生成随机 IV，密文格式：Base64(IV + Ciphertext)）
//	ciphertext, _ := password.SM4Encrypt(key, "敏感数据")
//
//	// 解密
//	plaintext, _ := password.SM4Decrypt(key, ciphertext)
//
//	// 或使用指定 Nonce（适合数据库字段加密等需要固定 Nonce 的场景）
//	nonce, _ := password.GenerateSM4Nonce()
//	ct, _ := password.SM4EncryptWithNonce(key, nonce, "数据")
//	pt, _ := password.SM4DecryptWithNonce(key, nonce, ct)
//
// # 安全特性
//
//   - SM3: 中国国家密码标准哈希算法（SHA-2 替代方案）
//   - SM4: 中国国家密码标准对称加密算法（AES 替代方案）
//   - 每个密码使用密码学安全随机盐值 (crypto/rand)
//   - 常量时间字符串比较防止时序攻击
//   - CBC 模式 + PKCS7 填充 + 随机 IV 保证语义安全
//   - 输入长度校验防止 DoS 攻击
//   - PBKDF2 迭代增强抗暴力破解能力
//
// # 最佳实践建议
//
// 1. **密码存储**：优先使用 GeneratePBKDF2Hash / VerifyPBKDF2Password（PBKDF2-HMAC-SM3）
// 2. **SM4 密钥管理**：密钥应通过配置中心或 KMS 管理，不要硬编码在代码中
// 3. **SM4 Nonce**：同一密钥 + 同一 Nonce 不要重复使用加密不同明文
// 4. **迭代次数**：PBKDF2 迭代次数可根据性能需求调整（建议 >= 10000）
package password
