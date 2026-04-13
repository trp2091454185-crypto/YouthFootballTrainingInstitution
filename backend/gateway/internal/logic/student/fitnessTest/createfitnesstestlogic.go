// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package fitnessTest

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateFitnessTestLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateFitnessTestLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateFitnessTestLogic {
	return &CreateFitnessTestLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateFitnessTestLogic) CreateFitnessTest(req *models.StudentFitnessTest) error {
	return l.svcCtx.DB.Create(req).Error
}
