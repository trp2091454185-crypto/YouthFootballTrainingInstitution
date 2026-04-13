// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package enrollment

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateEnrollmentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateEnrollmentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateEnrollmentLogic {
	return &UpdateEnrollmentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateEnrollmentLogic) UpdateEnrollment(req *models.StudentEnrollment) error {
	return l.svcCtx.DB.Updates(req).Error
}
