// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package registration

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateRegistrationLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateRegistrationLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateRegistrationLogic {
	return &CreateRegistrationLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateRegistrationLogic) CreateRegistration(req *models.Registration) error {
	return l.svcCtx.DB.Create(req).Error
}
