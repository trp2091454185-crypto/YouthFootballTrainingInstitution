// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"context"

	"server/common/result"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type ListCategoryReq struct {
	models.CourseCategory
}

type ListLibResp struct {
	result.PageResult
	List []models.CourseCategory `json:"list"`
}

type ListCategoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListCategoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListCategoryLogic {
	return &ListCategoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListCategoryLogic) ListCategory() (*ListLibResp, error) {
	var resp ListLibResp
	var list []models.CourseCategory
	db := l.svcCtx.DB.Model(&models.CourseCategory{}).Preload("Children")
	err := db.Where("parent_id = ? ", 0).Find(&list).Error
	if err != nil {
		l.Logger.Errorf("查询信息列表失败，异常：%v", err)
		return nil, err
	}
	count := int64(0)
	if err1 := db.Count(&count).Error; err1 != nil {
		return nil, err1
	}
	resp.Total = count
	resp.List = list
	return &resp, nil
}
