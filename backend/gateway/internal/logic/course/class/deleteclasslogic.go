package class

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

type DeleteClassLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteClassLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteClassLogic {
	return &DeleteClassLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteClassLogic) DeleteClass(id string) error {
	ids := strings.Split(id, ",")
	if len(ids) == 0 {
		return nil
	}
	fIds := slice.Map(ids, func(_ int, item string) int64 {
		res, _ := convertor.ToInt(item)
		return res
	})
	if len(fIds) == 0 {
		return xerr.REUQEST_PARAM_ERROR
	}
	return l.svcCtx.DB.Delete(&models.CourseClass{}, "id in ?", fIds).Error
}
