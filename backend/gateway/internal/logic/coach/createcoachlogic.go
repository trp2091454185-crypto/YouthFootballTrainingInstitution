// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package coach

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateCoachLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateCoachLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateCoachLogic {
	return &CreateCoachLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateCoachLogic) CreateCoach(req *models.Coach) error {
	return l.svcCtx.DB.Create(req).Error
}
