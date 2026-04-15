// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package coaches

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type ModelCoaches struct {
	Name             string   `json:"name"`
	Avatar           string   `json:"avatar"`
	Gender           int32    `json:"gender"`
	WorkYears        int32    `json:"workYears"`
	Bio              string   `json:"bio"`
	Specialties      []string `json:"specialties"`
	AgeGroups        []string `json:"ageGroups"`
	TeachingFeatures string   `json:"teachingFeatures"`
}

type ListCoachesResp struct {
	List []ModelCoaches `json:"list"`
}

type GetCoachesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetCoachesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetCoachesLogic {
	return &GetCoachesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetCoachesLogic) GetCoaches() (*ListCoachesResp, error) {
	db := l.svcCtx.DB.Model(&models.Coach{})
	var ListModel []models.Coach
	if err := db.Where("status = ? ", 2).Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []ModelCoaches

	for _, item := range ListModel {
		core := ModelCoaches{
			Name:      item.Name,
			Avatar:    *item.Avatar,
			Gender:    item.Gender,
			WorkYears: *item.WorkYears,
		}
		if item.Bio != nil {
			core.Bio = *item.Bio
		}
		if item.TeachingFeatures != nil {
			core.TeachingFeatures = *item.TeachingFeatures
		}
		if item.Specialties != nil {
			core.Specialties = item.Specialties
		}
		if item.AgeGroups != nil {
			core.AgeGroups = item.AgeGroups
		}

		list = append(list, core)
	}
	return &ListCoachesResp{List: list}, nil
}
