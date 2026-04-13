// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package banner

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateBannerLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateBannerLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateBannerLogic {
	return &CreateBannerLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateBannerLogic) CreateBanner(req *models.Banner) error {
	return l.svcCtx.DB.Create(req).Error
}
