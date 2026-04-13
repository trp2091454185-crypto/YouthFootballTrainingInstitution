// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"context"
	"strings"

	"github.com/duke-git/lancet/v2/convertor"
	"github.com/duke-git/lancet/v2/slice"

	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteCategoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteCategoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteCategoryLogic {
	return &DeleteCategoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteCategoryLogic) DeleteCategory(id string) error {
	ids := strings.Split(id, ",")
	if len(ids) == 0 {
		return nil
	}
	fIds := slice.Map[string, int64](ids, func(_ int, num string) int64 {
		res, _ := convertor.ToInt(num)
		return res
	})
	return l.svcCtx.DB.Delete(&models.CourseCategory{}, "id in ?", fIds).Error
}
