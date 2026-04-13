// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package honor

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateHonorLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateHonorLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateHonorLogic {
	return &CreateHonorLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateHonorLogic) CreateHonor(req *models.InstitutionHonor) error {
	return l.svcCtx.DB.Create(req).Error
}
