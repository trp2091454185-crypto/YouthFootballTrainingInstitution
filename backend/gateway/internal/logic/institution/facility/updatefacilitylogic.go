// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package facility

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateFacilityLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateFacilityLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateFacilityLogic {
	return &UpdateFacilityLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateFacilityLogic) UpdateFacility(req *models.InstitutionFacility) error {
	return l.svcCtx.DB.Updates(req).Error
}
