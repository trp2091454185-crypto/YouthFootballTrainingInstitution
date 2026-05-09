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

type CreateUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateUserLogic {
	return &CreateUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateUserLogic) CreateUser(req *models.SysUser) error {
	// 一键 SM3 哈希 + 编码存储格式: $sm3$<hash>$<salt>
	var err error
	req.Password, err = password.EncodePasswordHash(req.Password)
	if err != nil {
		l.Errorf("密码加密失败: %v", err)
		return err
	}

	return l.svcCtx.DB.Create(req).Error
}
