package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var (
	ErrInvalidToken = errors.New("无效的token")
	ErrTokenExpired = errors.New("token已过期")
	ErrWrongType    = errors.New("token类型不匹配")
)

// JwtAuth JWT 配置（从 yaml 注入）
type JwtAuth struct {
	Secret        string
	AccessExpire  int64
	RefreshExpire int64
	Issuer        string
}

// SignToken 签发 Token
func (j *JwtAuth) SignToken(userId int64, username string, role int32, tokenType string) (string, error) {
	var expireTime time.Time

	switch tokenType {
	case TokenTypeAccess:
		expireTime = time.Now().Add(time.Duration(j.AccessExpire) * time.Second)
	case TokenTypeRefresh:
		expireTime = time.Now().Add(time.Duration(j.RefreshExpire) * time.Second)
	default:
		return "", errors.New("不支持的token类型")
	}

	claims := CustomClaims{
		UserId:   userId,
		Username: username,
		Role:     role,
		TokenType: tokenType,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    j.Issuer,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(j.Secret))
}

// ParseToken 解析并验证 Token
func (j *JwtAuth) ParseToken(tokenStr string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return []byte(j.Secret), nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrTokenExpired
		}
		return nil, ErrInvalidToken
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}

// GenerateTokenPair 生成 Access + Refresh Token 对
func (j *JwtAuth) GenerateTokenPair(userId int64, username string, role int32) (accessToken, refreshToken string, err error) {
	accessToken, err = j.SignToken(userId, username, role, TokenTypeAccess)
	if err != nil {
		return "", "", err
	}

	refreshToken, err = j.SignToken(userId, username, role, TokenTypeRefresh)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}
