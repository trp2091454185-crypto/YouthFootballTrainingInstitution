// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package entry

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateEntryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateEntryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateEntryLogic {
	return &UpdateEntryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateEntryLogic) UpdateEntry(req *models.QuickEntry) error {
	return l.svcCtx.DB.Updates(req).Error
}
