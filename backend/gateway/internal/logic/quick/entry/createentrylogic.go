// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package entry

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateEntryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateEntryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateEntryLogic {
	return &CreateEntryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateEntryLogic) CreateEntry(req *models.QuickEntry) error {
	return l.svcCtx.DB.Create(req).Error
}
