// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package attendance

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateAttendanceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateAttendanceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateAttendanceLogic {
	return &UpdateAttendanceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateAttendanceLogic) UpdateAttendance(req *models.StudentAttendance) error {
	return l.svcCtx.DB.Updates(req).Error
}
