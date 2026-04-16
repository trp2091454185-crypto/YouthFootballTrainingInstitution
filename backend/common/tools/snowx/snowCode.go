package snowx

import (
	"strconv"
	"sync"
)

var (
	codeMu  sync.Mutex
	codeNum int64 = 999 // 起始值999，首次调用+1后为1000
)

// GenerateRegistrationNo 生成报名编号，从1000开始依次递增
func GenerateRegistrationNo() string {
	codeMu.Lock()
	defer codeMu.Unlock()

	codeNum++
	return formatCode(codeNum)
}

func GenerateRegistrationNoPointer() *string {
	codeMu.Lock()
	defer codeMu.Unlock()

	codeNum++
	return formatCodePointer(codeNum)
}

// GenerateRegistrationNoWithPrefix 生成带前缀的报名编号
// prefix: 编号前缀，如 "REG"
func GenerateRegistrationNoWithPrefix(prefix string) string {
	codeMu.Lock()
	defer codeMu.Unlock()

	codeNum++
	return prefix + formatCode(codeNum)
}

// SetCodeBase 设置编号基数（用于从数据库最大编号恢复）
func SetCodeBase(base int64) {
	codeMu.Lock()
	defer codeMu.Unlock()

	if base > codeNum {
		codeNum = base
	}
}

// GetCodeCurrent 获取当前编号值
func GetCodeCurrent() int64 {
	codeMu.Lock()
	defer codeMu.Unlock()

	return codeNum
}

func formatCode(n int64) string {
	s := strconv.FormatInt(n, 10)
	return s
}

func formatCodePointer(n int64) *string {
	s := strconv.FormatInt(n, 10)
	return &s
}
