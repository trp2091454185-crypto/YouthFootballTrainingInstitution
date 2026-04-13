// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package fitnessTest

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateFitnessTestLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateFitnessTestLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateFitnessTestLogic {
	return &UpdateFitnessTestLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateFitnessTestLogic) UpdateFitnessTest(req *models.StudentFitnessTest) error {
	return l.svcCtx.DB.Updates(req).Error
}
