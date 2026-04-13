package Course

import (
	"context"
	"strings"

	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/duke-git/lancet/v2/convertor"
	"github.com/duke-git/lancet/v2/slice"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteCourseLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteCourseLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteCourseLogic {
	return &DeleteCourseLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteCourseLogic) DeleteCourse(id string) error {
	ids := strings.Split(id, ",")
	fIds := slice.Map(ids, func(index int, item string) int {
		val, _ := convertor.ToInt(item)
		return int(val)
	})
	if len(fIds) == 0 {
		return xerr.REUQEST_PARAM_ERROR
	}
	return l.svcCtx.DB.Delete(&models.Course{}, "id in ?", fIds).Error
}
