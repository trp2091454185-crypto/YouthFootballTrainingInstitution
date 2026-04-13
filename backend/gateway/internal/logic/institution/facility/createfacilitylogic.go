// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package facility

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateFacilityLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateFacilityLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateFacilityLogic {
	return &CreateFacilityLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateFacilityLogic) CreateFacility(req *models.InstitutionFacility) error {
	return l.svcCtx.DB.Create(req).Error
}
