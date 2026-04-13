// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package honor

import (
	"context"
	"encoding/json"
	"server/common/xerr"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
)

type FindHonorLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindHonorLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindHonorLogic {
	return &FindHonorLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindHonorLogic) FindHonor(req *models.InstitutionHonor) (*models.InstitutionHonor, error) {
	model := new(models.InstitutionHonor)
	if err := l.svcCtx.DB.Where(req).First(model).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, xerr.DB_RECORD_NOT_FOUND
	} else if err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}

	return model, nil
}
