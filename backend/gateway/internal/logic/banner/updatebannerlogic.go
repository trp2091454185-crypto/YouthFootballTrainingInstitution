// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package banner

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateBannerLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateBannerLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateBannerLogic {
	return &UpdateBannerLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateBannerLogic) UpdateBanner(req *models.Banner) error {
	return l.svcCtx.DB.Updates(req).Error
}
