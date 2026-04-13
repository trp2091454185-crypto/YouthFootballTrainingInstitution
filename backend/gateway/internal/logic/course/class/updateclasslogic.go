package class

import (
	"context"

	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateClassLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateClassLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateClassLogic {
	return &UpdateClassLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateClassLogic) UpdateClass(req *models.CourseClass) error {
	return l.svcCtx.DB.Updates(req).Error
}
