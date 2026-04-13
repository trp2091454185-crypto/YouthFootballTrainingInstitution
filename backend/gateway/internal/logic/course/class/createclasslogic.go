package class

import (
	"context"

	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateClassLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateClassLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateClassLogic {
	return &CreateClassLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateClassLogic) CreateClass(req *models.CourseClass) error {
	return l.svcCtx.DB.Create(req).Error
}
