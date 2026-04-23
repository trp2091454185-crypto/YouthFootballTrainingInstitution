// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package info

import (
	"context"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
)

type (
	ListLibResp struct {
		Data models.InstitutionInfo `json:"data"`
	}
)
type ListInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListInfoLogic {
	return &ListInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListInfoLogic) ListInfo() (*ListLibResp, error) {
	db := l.svcCtx.DB.Model(&models.InstitutionInfo{})
	// 查询
	var data models.InstitutionInfo
	if err := db.First(&data).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		} else {
			l.Logger.Errorf("查询机构信息失败，异常：%v", err)
			return nil, err
		}
	}
	return &ListLibResp{
		Data: data,
	}, nil
}
