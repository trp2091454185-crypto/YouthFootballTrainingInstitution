// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package auth

import (
	"context"
	"errors"
	"server/common/jwt"
	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/gateway/internal/types"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type RefreshTokenLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRefreshTokenLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RefreshTokenLogic {
	return &RefreshTokenLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RefreshTokenLogic) RefreshToken(req *types.RefreshTokenReq) (*types.RefreshTokenResp, error) {
	// 1. 参数校验
	if req.RefreshToken == "" {
		return nil, xerr.UNAUTHORIZED_TOKEN_NOT_EXIST
	}

	// 2. 解析并验证 RefreshToken
	claims, err := l.svcCtx.JwtAuth.ParseToken(req.RefreshToken)
	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			l.Errorf("刷新Token已过期")
			return nil, xerr.TOKEN_EXPIRE_ERROR
		}
		l.Errorf("刷新Token校验失败: %v", err)
		return nil, xerr.UNAUTHORIZED_TOKEN_INVALIDATE_ERROR
	}

	// 3. 校验 Token 类型（必须是 refresh token）
	if claims.TokenType != jwt.TokenTypeRefresh {
		return nil, xerr.UNAUTHORIZED_TOKEN_INVALIDATE_ERROR
	}

	// 4. 查询用户是否仍有效（防止禁用用户续期）
	var user models.SysUser
	if err := l.svcCtx.DB.Select("id", "username", "role", "status").First(&user, claims.UserId).Error; err != nil || user.Status != 1 {
		return nil, xerr.ADMIN_LOGIN_VERIFY_PWD_OR_NAME_ERROR
	}

	// 5. 签发新的 Token 对
	accessToken, refreshToken, err := l.svcCtx.JwtAuth.GenerateTokenPair(user.Id, user.Username, user.Role)
	if err != nil {
		l.Errorf("签发新Token失败: userId=%d, err=%v", claims.UserId, err)
		return nil, xerr.TOKEN_GENERATE_ERROR
	}

	l.Infof("Token刷新成功: userId=%d", claims.UserId)

	return &types.RefreshTokenResp{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpireIn:     l.svcCtx.JwtAuth.AccessExpire,
	}, nil
}
