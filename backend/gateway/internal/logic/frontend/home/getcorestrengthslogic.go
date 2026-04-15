// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package home

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CoreModel struct {
	Icon  string `json:"icon"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}

type ListCoreStrengthsResp struct {
	List []CoreModel `json:"list"`
}

type GetCoreStrengthsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCoreStrengthsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCoreStrengthsLogic {
	return &GetCoreStrengthsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCoreStrengthsLogic) GetCoreStrengths() (*ListCoreStrengthsResp, error) {
	db := l.svcCtx.DB.Model(&models.CoreAdvantage{})
	var ListModel []models.CoreAdvantage
	if err := db.Where("status = ? ", 2).Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []CoreModel

	for _, item := range ListModel {
		// 每遍历一条，创建一个新的 CoreModel 对象
		core := CoreModel{
			Icon:  *item.Icon,
			Title: item.Title,
		}
		if item.Description != nil {
			core.Desc = *item.Description
		}
		list = append(list, core)
	}
	return &ListCoreStrengthsResp{List: list}, nil
}
