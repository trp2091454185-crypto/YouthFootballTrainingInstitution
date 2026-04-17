// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package courses

import (
	"context"
	"server/common/result"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CourseListReq struct {
	Ids []string `form:"ids,optional"`
	result.PageParams
}

type CourseModel struct {
	Name          string   `json:"name"`
	AgeGroup      string   `json:"ageGroup"`
	Desc          string   `json:"desc"`
	Price         float64  `json:"price"`
	PriceUnit     string   `json:"priceUnit"`
	Features      []string `json:"features"`
	CourseHours   int32    `json:"courseHours"`
	ClassDuration int32    `json:"classDuration"`
}

type CourseResp struct {
	List  []CourseModel `json:"list"`
	Total int64         `json:"total"`
}

type GetCourseListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCourseListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCourseListLogic {
	return &GetCourseListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCourseListLogic) GetCourseList(req *CourseListReq) (*CourseResp, error) {
	resp := &CourseResp{}
	db := l.svcCtx.DB.Model(&models.Course{}).Where("status = ? ", 2)
	if len(req.Ids) != 0 {
		db = db.Where("category_id in (?)", req.Ids)
	}
	// 查询总数
	db.Count(&resp.Total)

	// 分页查询
	var listModel []models.Course
	offset := (req.Current - 1) * req.PageSize
	err := db.Limit(req.PageSize).Offset(offset).Find(&listModel).Error
	if err != nil {
		return nil, err
	}

	var list []CourseModel

	for _, item := range listModel {
		// 每遍历一条，创建一个新的 CoreModel 对象
		model := CourseModel{
			Name:          item.Name,
			AgeGroup:      *item.AgeGroupTag,
			Desc:          *item.Description,
			Price:         item.Price,
			PriceUnit:     *item.PriceUnit,
			Features:      item.Features,
			CourseHours:   *item.CourseHours,
			ClassDuration: *item.ClassDuration,
		}

		list = append(list, model)
	}
	resp.List = list
	return resp, nil
}
