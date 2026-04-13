// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package milestone

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateMilestoneLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateMilestoneLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateMilestoneLogic {
	return &CreateMilestoneLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateMilestoneLogic) CreateMilestone(req *models.InstitutionMilestone) error {
	return l.svcCtx.DB.Create(req).Error
}
