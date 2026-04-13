// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package honor

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateHonorLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateHonorLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateHonorLogic {
	return &UpdateHonorLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateHonorLogic) UpdateHonor(req *models.InstitutionHonor) error {
	return l.svcCtx.DB.Updates(req).Error
}
