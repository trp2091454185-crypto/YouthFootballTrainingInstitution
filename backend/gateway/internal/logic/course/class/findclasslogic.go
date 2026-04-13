package class

import (
	"context"

	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
)

type FindClassLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindClassLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindClassLogic {
	return &FindClassLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindClassLogic) FindClass(req *models.CourseClass) (*models.CourseClass, error) {
	var resp models.CourseClass
	err := l.svcCtx.DB.Where(req).First(&resp).Error
	if err != nil && err == gorm.ErrRecordNotFound {
		return nil, xerr.DB_RECORD_NOT_FOUND
	}
	return &resp, err
}
