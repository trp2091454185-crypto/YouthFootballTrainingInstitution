package jwt

import (
	"github.com/golang-jwt/jwt/v4"
)

// TokenType Token 类型常量
const (
	TokenTypeAccess  = "access"
	TokenTypeRefresh = "refresh"
)

// CustomClaims 自定义 JWT Claims，包含用户身份信息
type CustomClaims struct {
	UserId   int64  `json:"userId"`   // 用户ID
	Username string `json:"username"` // 用户名
	Role     int32  `json:"role"`     // 角色: 1管理员 2超级管理员
	TokenType string `json:"tokenType"` // token类型: access | refresh
	jwt.RegisteredClaims              // 标准 Claims（含 Exp、Iss、Nbf 等）
}
