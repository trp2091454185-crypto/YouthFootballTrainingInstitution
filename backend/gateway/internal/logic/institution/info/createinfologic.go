// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package info

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateInfoLogic {
	return &CreateInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateInfoLogic) CreateInfo(req *models.InstitutionInfo) error {
	return l.svcCtx.DB.Create(req).Error
}
