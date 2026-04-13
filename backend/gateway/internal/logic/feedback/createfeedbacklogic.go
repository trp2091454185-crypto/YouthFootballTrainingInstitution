// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package feedback

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateFeedbackLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateFeedbackLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateFeedbackLogic {
	return &CreateFeedbackLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateFeedbackLogic) CreateFeedback(req *models.Feedback) error {
	return l.svcCtx.DB.Create(req).Error
}
