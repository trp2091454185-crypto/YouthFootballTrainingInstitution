// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package growthRecord

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

type FindGrowthRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFindGrowthRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *FindGrowthRecordLogic {
	return &FindGrowthRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FindGrowthRecordLogic) FindGrowthRecord(req *models.StudentGrowthRecord) (*models.StudentGrowthRecord, error) {
	model := new(models.StudentGrowthRecord)
	if err := l.svcCtx.DB.Where(req).First(model).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, xerr.DB_RECORD_NOT_FOUND
	} else if err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}

	return model, nil
}
