// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package Student

import (
	"context"
	"server/models"
	"time"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateStudentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateStudentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateStudentLogic {
	return &UpdateStudentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateStudentLogic) UpdateStudent(req *models.Student) error {
	if req.Age == nil {
		// 2. 当前时间
		now := time.Now()
		// 3. 标准计算年龄（Go 通用写法）
		age := now.Year() - req.BirthDate.Year()
		// 如果今年还没到生日，年龄减 1
		if now.YearDay() < req.BirthDate.YearDay() {
			age--
		}
		age32 := int32(age)
		req.Age = &age32
	}

	return l.svcCtx.DB.Updates(req).Error
}
