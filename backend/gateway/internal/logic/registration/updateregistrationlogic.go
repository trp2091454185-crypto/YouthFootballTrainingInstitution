// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package registration

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateRegistrationLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateRegistrationLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateRegistrationLogic {
	return &UpdateRegistrationLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateRegistrationLogic) UpdateRegistration(req *models.Registration) error {
	return l.svcCtx.DB.Updates(req).Error
}
