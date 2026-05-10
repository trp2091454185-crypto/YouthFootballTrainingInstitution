package middleware

import (
	"context"
	"net/http"
	"strings"

	"server/common/jwt"
	"server/common/xerr"

	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// 从 Context 获取当前用户信息的 Key
const (
	CtxKeyUserId   = "userId"
	CtxKeyUsername = "username"
	CtxKeyRole     = "role"
)

// AuthMiddleware JWT 认证中间件（路由级）
// 用于 rest.WithMiddleware(authMid, Route{...}) 场景
func AuthMiddleware(jwtAuth *jwt.JwtAuth) func(http.HandlerFunc) http.HandlerFunc {
	return func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			authHandler(jwtAuth, w, r, next)
		}
	}
}

// AuthMiddlewareWhiteList JWT 认证中间件（全局级，白名单路由放行）
// 适用于注册为 server.Use(rest.ToMiddleware(...)) 全局中间件
// routes.go 由 goctl 自动生成不受影响，新增公开路由只需在此白名单追加路径
func AuthMiddlewareWhiteList(jwtAuth *jwt.JwtAuth, whiteList []string) func(http.Handler) http.Handler {
	whiteMap := make(map[string]struct{}, len(whiteList))
	for _, path := range whiteList {
		whiteMap[path] = struct{}{}
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if _, ok := whiteMap[r.URL.Path]; ok {
				next.ServeHTTP(w, r)
				return
			}
			authHandler(jwtAuth, w, r, next.ServeHTTP)
		})
	}
}

// authHandler 核心认证逻辑（统一入口）
func authHandler(jwtAuth *jwt.JwtAuth, w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		httpx.WriteJson(w, http.StatusUnauthorized, map[string]interface{}{
			"code":         xerr.UNAUTHORIZED_TOKEN_NOT_EXIST.GetErrCode(),
			"success":      false,
			"errorMessage": xerr.UNAUTHORIZED_TOKEN_NOT_EXIST.GetErrMsg(),
		})
		return
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		httpx.WriteJson(w, http.StatusUnauthorized, map[string]interface{}{
			"code":         xerr.UNAUTHORIZED_TOKEN_INVALIDATE_ERROR.GetErrCode(),
			"success":      false,
			"errorMessage": "Authorization格式错误，应为: Bearer <token>",
		})
		return
	}

	tokenStr := parts[1]

	claims, err := jwtAuth.ParseToken(tokenStr)
	if err != nil {
		code := xerr.UNAUTHORIZED_TOKEN_INVALIDATE_ERROR
		msg := "Token校验失败"
		if err == jwt.ErrTokenExpired {
			code = xerr.UNAUTHORIZED_TOKENTIMEOUT_ERROR
			msg = "Token已过期，请重新登录"
		}
		httpx.WriteJson(w, http.StatusUnauthorized, map[string]interface{}{
			"code":         code.GetErrCode(),
			"success":      false,
			"errorMessage": msg,
		})
		return
	}

	if claims.TokenType != jwt.TokenTypeAccess {
		httpx.WriteJson(w, http.StatusUnauthorized, map[string]interface{}{
			"code":         xerr.UNAUTHORIZED_TOKEN_INVALIDATE_ERROR.GetErrCode(),
			"success":      false,
			"errorMessage": "Token类型错误",
		})
		return
	}

	ctx := context.WithValue(r.Context(), CtxKeyUserId, claims.UserId)
	ctx = context.WithValue(ctx, CtxKeyUsername, claims.Username)
	ctx = context.WithValue(ctx, CtxKeyRole, claims.Role)

	logx.WithContext(r.Context()).Debugf("用户认证通过")

	next(w, r.WithContext(ctx))
}
