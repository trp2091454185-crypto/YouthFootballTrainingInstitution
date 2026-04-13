// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package attendance

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateAttendanceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateAttendanceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateAttendanceLogic {
	return &CreateAttendanceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateAttendanceLogic) CreateAttendance(req *models.StudentAttendance) error {
	return l.svcCtx.DB.Create(req).Error
}
