// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package enrollment

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateEnrollmentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateEnrollmentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateEnrollmentLogic {
	return &CreateEnrollmentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateEnrollmentLogic) CreateEnrollment(req *models.StudentEnrollment) error {
	return l.svcCtx.DB.Create(req).Error
}
