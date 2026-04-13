// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package config

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
	ListConfigReq struct {
		models.SysConfig
		result.PageParams
	}

	ListLibResp struct {
		result.PageResult
		List []models.SysConfig `json:"list"`
	}
)
type ListConfigLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListConfigLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListConfigLogic {
	return &ListConfigLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListConfigLogic) ListConfig(req *ListConfigReq) (*ListLibResp, error) {
	db := l.svcCtx.DB.Model(&models.SysConfig{})
	//搜索
	if req.Keyword != "" {
		db = db.Where("config_key LIKE ?", "%"+req.Keyword+"%")
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
	var list []models.SysConfig
	if err := db.Limit(res.PageSize).Offset(res.Offset).Find(&list).Error; err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息列表失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}
	res.List = list
	res.Pages = int64(math.Ceil(float64(res.Total) / float64(res.PageSize)))
	return &res, nil
}
