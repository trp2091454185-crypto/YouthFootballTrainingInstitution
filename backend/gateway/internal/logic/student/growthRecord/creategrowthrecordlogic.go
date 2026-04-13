// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package growthRecord

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateGrowthRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateGrowthRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateGrowthRecordLogic {
	return &CreateGrowthRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateGrowthRecordLogic) CreateGrowthRecord(req *models.StudentGrowthRecord) error {
	return l.svcCtx.DB.Create(req).Error
}
