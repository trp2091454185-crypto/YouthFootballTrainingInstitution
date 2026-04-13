// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateAdvantageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateAdvantageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateAdvantageLogic {
	return &CreateAdvantageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateAdvantageLogic) CreateAdvantage(req *models.CoreAdvantage) error {
	return l.svcCtx.DB.Create(req).Error
}
