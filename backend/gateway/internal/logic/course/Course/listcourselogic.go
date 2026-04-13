package Course

import (
	"context"

	"server/common/result"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type ListCourseReq struct {
	models.Course
	result.PageParams
}

type ListCourseResp struct {
	result.PageResult
	List []models.Course `json:"list"`
}

type ListCourseLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListCourseLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListCourseLogic {
	return &ListCourseLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListCourseLogic) ListCourse(req *ListCourseReq) (*ListCourseResp, error) {
	resp := &ListCourseResp{}
	db := l.svcCtx.DB.Model(&models.Course{})

	if req.Keyword != "" {
		db = db.Where("name LIKE ?", "%"+req.Keyword+"%")
	}

	// 查询总数
	db.Count(&resp.Total)

	// 分页查询
	var list []models.Course
	offset := (req.Current - 1) * req.PageSize
	err := db.Limit(req.PageSize).Offset(offset).Find(&list).Error
	if err != nil {
		return nil, err
	}

	resp.List = list
	resp.Current = req.Current
	resp.PageSize = req.PageSize
	resp.Offset = offset
	if resp.PageSize > 0 {
		resp.Pages = resp.Total / int64(resp.PageSize)
		if resp.Total%int64(resp.PageSize) > 0 {
			resp.Pages++
		}
	}

	return resp, nil
}
