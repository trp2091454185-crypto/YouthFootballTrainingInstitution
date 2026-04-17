// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package courses

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CourseCategoryModel struct {
	ChildIds []string `json:"childIds"`
	Name     string   `json:"title"`
}

type CourseCategoryResp struct {
	List []CourseCategoryModel `json:"list"`
}

type GetCourseCategoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCourseCategoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCourseCategoryLogic {
	return &GetCourseCategoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCourseCategoryLogic) GetCourseCategory() (*CourseCategoryResp, error) {
	db := l.svcCtx.DB.Model(&models.CourseCategory{})
	var ListModel []models.CourseCategory
	if err := db.Where("parent_id = ? ", 0).Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []CourseCategoryModel

	for _, item := range ListModel {

		// 查询子节点ID
		var childIds []string
		_ = l.svcCtx.DB.Model(&models.CourseCategory{}).
			Where("parent_id = ?", item.Id).
			Pluck("id", &childIds).Error

		// 每遍历一条，创建一个新的 CoreModel 对象
		model := CourseCategoryModel{
			Name:     item.Name,
			ChildIds: childIds,
		}

		list = append(list, model)
	}
	return &CourseCategoryResp{List: list}, nil
}
