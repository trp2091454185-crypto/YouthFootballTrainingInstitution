// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateAdvantageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateAdvantageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateAdvantageLogic {
	return &UpdateAdvantageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateAdvantageLogic) UpdateAdvantage(req *models.CoreAdvantage) error {
	return l.svcCtx.DB.Updates(req).Error
}
