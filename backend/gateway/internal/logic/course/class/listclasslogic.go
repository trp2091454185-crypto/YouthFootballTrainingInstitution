package class

import (
	"context"

	"server/common/result"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type ListClassReq struct {
	models.CourseClass
	result.PageParams
}

type ListClassResp struct {
	result.PageResult
	List []models.CourseClass `json:"list"`
}

type ListClassLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListClassLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListClassLogic {
	return &ListClassLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListClassLogic) ListClass(req *ListClassReq) (*ListClassResp, error) {
	resp := &ListClassResp{}
	db := l.svcCtx.DB.Model(&models.CourseClass{})

	if req.Keyword != "" {
		db = db.Where("name LIKE ?", "%"+req.Keyword+"%")
	}

	// 查询总数
	db.Count(&resp.Total)

	// 分页查询
	var list []models.CourseClass
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
