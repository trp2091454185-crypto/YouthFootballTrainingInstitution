// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package schedule

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateScheduleLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateScheduleLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateScheduleLogic {
	return &CreateScheduleLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateScheduleLogic) CreateSchedule(req *models.ClassSchedule) error {
	return l.svcCtx.DB.Create(req).Error
}
