// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package about

import (
	"context"
	"server/models"
	"time"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type HonorModel struct {
	Title     string    `json:"title"`
	Org       string    `json:"org"`
	Desc      string    `json:"desc"`
	Image     string    `json:"image"`
	HonorData time.Time `json:"honorData"`
}

type HonorResp struct {
	List []HonorModel `json:"list"`
}

type GetHonorLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetHonorLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetHonorLogic {
	return &GetHonorLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetHonorLogic) GetHonor() (*HonorResp, error) {
	db := l.svcCtx.DB.Model(&models.InstitutionHonor{})
	var ListModel []models.InstitutionHonor
	if err := db.Where("status = ? ", 2).Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []HonorModel

	for _, item := range ListModel {
		// 每遍历一条，创建一个新的 CoreModel 对象
		model := HonorModel{
			Title:     item.Title,
			Org:       *item.AwardOrg,
			HonorData: *item.AwardDate,
		}
		if item.Image != nil {
			model.Image = *item.Image
		}
		if item.Description != nil {
			model.Desc = *item.Description
		}
		list = append(list, model)
	}
	return &HonorResp{List: list}, nil
}
