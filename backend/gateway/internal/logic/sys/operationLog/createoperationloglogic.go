// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package operationLog

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateOperationLogLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateOperationLogLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateOperationLogLogic {
	return &CreateOperationLogLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateOperationLogLogic) CreateOperationLog(req *models.SysOperationLog) error {
	return l.svcCtx.DB.Create(req).Error
}
