// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package schedule

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateScheduleLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateScheduleLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateScheduleLogic {
	return &UpdateScheduleLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateScheduleLogic) UpdateSchedule(req *models.ClassSchedule) error {
	return l.svcCtx.DB.Updates(req).Error
}
