package Course

import (
	"context"

	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateCourseLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateCourseLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateCourseLogic {
	return &UpdateCourseLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateCourseLogic) UpdateCourse(req *models.Course) error {
	return l.svcCtx.DB.Updates(req).Error
}
