// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"context"

	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateCategoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateCategoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateCategoryLogic {
	return &UpdateCategoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateCategoryLogic) UpdateCategory(req *models.CourseCategory) error {
	return l.svcCtx.DB.Updates(req).Error
}
