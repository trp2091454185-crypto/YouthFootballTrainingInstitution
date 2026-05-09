// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package user

import (
	"context"
	"server/common/tools/password"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateUserLogic {
	return &UpdateUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateUserLogic) UpdateUser(req *models.SysUser) error {
	if req.Password != "" {
		var err error
		req.Password, err = password.EncodePasswordHash(req.Password)
		if err != nil {
			l.Errorf("密码加密失败: %v", err)
			return err
		}
	}

	return l.svcCtx.DB.Updates(req).Error
}
