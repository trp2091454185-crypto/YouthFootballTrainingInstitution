// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package auth

import (
	"context"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type LogoutReq struct{}

type LogoutLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLogoutLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LogoutLogic {
	return &LogoutLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LogoutLogic) Logout(req *LogoutReq) error {
	// JWT 无状态设计：客户端清除本地 Token 即可完成登出
	// Token 过期后自动失效，无需服务端维护黑名单
	// 如需强制失效（如账号被禁用），可在中间件增加数据库状态检查
	l.Infof("用户登出成功")
	return nil
}
