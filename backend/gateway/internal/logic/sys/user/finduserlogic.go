// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package user

import (
	"context"
	"encoding/json"
	"server/common/xerr"
	"server/models"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"

	"server/gateway/internal/svc"
)

type FindUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindUserLogic {
	return &FindUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindUserLogic) FindUser(req *models.SysUser) (*models.SysUser, error) {
	model := new(models.SysUser)
	if err := l.svcCtx.DB.Where(req).First(model).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, xerr.DB_RECORD_NOT_FOUND
	} else if err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}

	return model, nil
}
