// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"context"

	"gorm.io/gorm"
	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type FindCategoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindCategoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindCategoryLogic {
	return &FindCategoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindCategoryLogic) FindCategory(req *models.CourseCategory) (*models.CourseCategory, error) {
	var model models.CourseCategory
	err := l.svcCtx.DB.Where(req).First(&model).Error
	if err != nil && err == gorm.ErrRecordNotFound {
		return nil, xerr.DB_RECORD_NOT_FOUND
	}
	return &model, err
}
