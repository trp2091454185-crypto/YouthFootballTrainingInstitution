// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package milestone

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateMilestoneLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateMilestoneLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateMilestoneLogic {
	return &UpdateMilestoneLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateMilestoneLogic) UpdateMilestone(req *models.InstitutionMilestone) error {
	return l.svcCtx.DB.Updates(req).Error
}
