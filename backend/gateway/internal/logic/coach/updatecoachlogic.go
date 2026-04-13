// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package coach

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateCoachLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateCoachLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateCoachLogic {
	return &UpdateCoachLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateCoachLogic) UpdateCoach(req *models.Coach) error {
	return l.svcCtx.DB.Updates(req).Error
}
