// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package home

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type ModelBanner struct {
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	ImageUrl string `json:"imageUrl"`
	LinkType int32  `json:"linkType"`
	LinkUrl  string `json:"linkUrl"`
	Target   string `json:"target"`
}
type ListBannerResp struct {
	List []ModelBanner `json:"list"`
}

type GetBannerLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetBannerLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetBannerLogic {
	return &GetBannerLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetBannerLogic) GetBanner() (*ListBannerResp, error) {
	db := l.svcCtx.DB.Model(&models.Banner{})
	var ListModel []models.Banner
	if err := db.Where("status = ? ", 2).Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []ModelBanner

	for _, item := range ListModel {
		// 每遍历一条，创建一个新的 CoreModel 对象
		core := ModelBanner{
			Title:    *item.Title,
			ImageUrl: item.Image,
			LinkType: item.LinkType,
			Target:   *item.Target,
		}
		if item.Subtitle != nil {
			core.Subtitle = *item.Subtitle
		}
		if item.LinkURL != nil {
			core.LinkUrl = *item.LinkURL
		}

		list = append(list, core)
	}
	return &ListBannerResp{List: list}, nil
}
