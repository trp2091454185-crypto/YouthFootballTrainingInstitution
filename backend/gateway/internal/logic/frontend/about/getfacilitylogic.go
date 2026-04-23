// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package about

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type FacilityModel struct {
	Name       string `json:"name"`
	Desc       string `json:"desc"`
	CoverImage string `json:"coverImage"`
}

type FacilityResp struct {
	List []FacilityModel `json:"list"`
}

type GetFacilityLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetFacilityLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetFacilityLogic {
	return &GetFacilityLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetFacilityLogic) GetFacility() (*FacilityResp, error) {
	db := l.svcCtx.DB.Model(&models.InstitutionFacility{}).Where("status = ? ", 2)

	var ListModel []models.InstitutionFacility
	if err := db.Find(&ListModel).Error; err != nil {
		l.Logger.Errorf("查询信息列表失败，，异常：%v", err)
		return nil, err
	}
	var list []FacilityModel

	for _, item := range ListModel {
		// 每遍历一条，创建一个新的 CoreModel 对象
		model := FacilityModel{
			Name:       item.Name,
			Desc:       *item.Description,
			CoverImage: *item.CoverImages,
		}
		list = append(list, model)
	}
	return &FacilityResp{List: list}, nil
}
