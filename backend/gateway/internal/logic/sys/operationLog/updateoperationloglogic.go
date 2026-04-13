// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package operationLog

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateOperationLogLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateOperationLogLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateOperationLogLogic {
	return &UpdateOperationLogLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateOperationLogLogic) UpdateOperationLog(req *models.SysOperationLog) error {
	return l.svcCtx.DB.Updates(req).Error
}
