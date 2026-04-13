// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package feedback

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateFeedbackLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateFeedbackLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateFeedbackLogic {
	return &UpdateFeedbackLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateFeedbackLogic) UpdateFeedback(req *models.Feedback) error {
	return l.svcCtx.DB.Updates(req).Error
}
