package Course

import (
	"context"

	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
)

type FindCourseLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindCourseLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindCourseLogic {
	return &FindCourseLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindCourseLogic) FindCourse(req *models.Course) (*models.Course, error) {
	var resp models.Course
	err := l.svcCtx.DB.Where(req).First(&resp).Error
	if err != nil && err == gorm.ErrRecordNotFound {
		return nil, xerr.DB_RECORD_NOT_FOUND
	}
	return &resp, err
}
