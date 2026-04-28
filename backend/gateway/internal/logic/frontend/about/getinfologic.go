// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package about

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type InfoModel struct {
	Name            string `json:"name"`
	Slogan          string `json:"slogan"`
	Desc            string `json:"desc"`
	Logo            string `json:"logo"`
	WechatQrcodeUrl string `json:"wechatQrcodeUrl"`
}

type GetInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewGetInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetInfoLogic {
	return &GetInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetInfoLogic) GetInfo() (*InfoModel, error) {
	db := l.svcCtx.DB.Model(&models.InstitutionInfo{})

	var Info models.InstitutionInfo
	if err := db.First(&Info).Error; err != nil {
		l.Logger.Errorf("查询信息失败，异常：%v", err)
		return nil, err
	}
	data := InfoModel{
		Name:   Info.Name,
		Slogan: *Info.Slogan,
		Desc:   *Info.Description,
		Logo:   *Info.Logo,
	}
	if Info.WechatQr != nil {
		data.WechatQrcodeUrl = *Info.WechatQr
	}

	return &data, nil
}
