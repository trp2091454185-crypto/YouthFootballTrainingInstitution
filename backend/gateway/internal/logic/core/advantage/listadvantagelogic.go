// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"context"
	"encoding/json"
	"math"
	"server/common/result"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type (
	ListAdvantageReq struct {
		models.CoreAdvantage
		result.PageParams
	}

	ListLibResp struct {
		result.PageResult
		List []models.CoreAdvantage `json:"list"`
	}
)
type ListAdvantageLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListAdvantageLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListAdvantageLogic {
	return &ListAdvantageLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListAdvantageLogic) ListAdvantage(req *ListAdvantageReq) (*ListLibResp, error) {
	db := l.svcCtx.DB.Model(&models.CoreAdvantage{})
	//搜索
	if req.Keyword != "" {
		db = db.Where("title LIKE ?", "%"+req.Keyword+"%")
	}
	// 分页
	pager := req.PageParams
	res := ListLibResp{
		PageResult: result.PageResult{
			PageSize: pager.PageSize,
			Current:  pager.Current,
			Offset:   pager.PageSize * (pager.Current - 1),
		},
	}
	// 总数
	if err := db.Count(&res.Total).Error; err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息列表失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}
	// 查询列表
	var list []models.CoreAdvantage
	if err := db.Limit(res.PageSize).Offset(res.Offset).Find(&list).Error; err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息列表失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}
	res.List = list
	res.Pages = int64(math.Ceil(float64(res.Total) / float64(res.PageSize)))
	return &res, nil
}
