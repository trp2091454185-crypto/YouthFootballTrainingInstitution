// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package auth

import (
	"context"
	"server/common/middleware"
	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetCurrentUserResp struct {
	Id       int64   `json:"id"`
	Username string  `json:"username"`
	Role     int32   `json:"role"`
	RoleName string  `json:"roleName"`
	Phone    *string `json:"phone,optional"`
	Email    *string `json:"email,optional"`
}

type GetCurrentUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCurrentUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCurrentUserLogic {
	return &GetCurrentUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCurrentUserLogic) GetCurrentUser() (*GetCurrentUserResp, error) {
	// 1. 从上下文获取当前用户ID（由中间件注入）
	userIdValue := l.ctx.Value(middleware.CtxKeyUserId)
	if userIdValue == nil {
		return nil, xerr.USER_NOT_LOGIN
	}

	userId, ok := userIdValue.(int64)
	if !ok || userId == 0 {
		return nil, xerr.CANNOT_GET_USER_INFO_ERROR
	}

	// 2. 查询用户信息
	var user models.SysUser
	if err := l.svcCtx.DB.Select("id", "username", "role", "phone", "email").First(&user, userId).Error; err != nil {
		l.Errorf("获取用户信息失败: userId=%d, err=%v", userId, err)
		return nil, xerr.CANNOT_GET_USER_INFO_ERROR
	}

	// 3. 构造角色名称
	roleName := "管理员"
	if user.Role == 2 {
		roleName = "超级管理员"
	}

	return &GetCurrentUserResp{
		Id:       user.Id,
		Username: user.Username,
		Role:     user.Role,
		RoleName: roleName,
		Phone:    user.Phone,
		Email:    user.Email,
	}, nil
}
