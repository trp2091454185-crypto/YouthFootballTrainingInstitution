// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package schedule

import (
	"context"
	"server/models"
	"strings"

	"server/gateway/internal/svc"

	"github.com/duke-git/lancet/v2/convertor"
	"github.com/duke-git/lancet/v2/slice"
	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteScheduleLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteScheduleLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteScheduleLogic {
	return &DeleteScheduleLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteScheduleLogic) DeleteSchedule(id string) error {
	ids := strings.Split(id, ",")
	if len(ids) == 0 {
		return nil
	}
	fIds := slice.Map[string, int64](ids, func(_ int, num string) int64 {
		res, _ := convertor.ToInt(num)
		return res
	})

	return l.svcCtx.DB.Delete(&models.ClassSchedule{}, "id in ?", fIds).Error
}
