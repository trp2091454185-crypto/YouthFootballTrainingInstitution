// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package config

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateConfigLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateConfigLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateConfigLogic {
	return &CreateConfigLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateConfigLogic) CreateConfig(req *models.SysConfig) error {
	return l.svcCtx.DB.Create(req).Error
}
