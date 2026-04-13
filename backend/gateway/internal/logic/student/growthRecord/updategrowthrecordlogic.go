// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package growthRecord

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateGrowthRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateGrowthRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateGrowthRecordLogic {
	return &UpdateGrowthRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateGrowthRecordLogic) UpdateGrowthRecord(req *models.StudentGrowthRecord) error {
	return l.svcCtx.DB.Updates(req).Error
}
