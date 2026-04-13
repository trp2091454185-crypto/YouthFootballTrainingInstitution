// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package Student

import (
	"context"
	"encoding/json"
	"math"
	"server/common/result"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type (
	ListStudentReq struct {
		models.Student
		result.PageParams
	}

	ListLibResp struct {
		result.PageResult
		List []models.Student `json:"list"`
	}
)
type ListStudentLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewListStudentLogic(ctx context.Context, svcCtx *svc.ServiceContext) *ListStudentLogic {
	return &ListStudentLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *ListStudentLogic) ListStudent(req *ListStudentReq) (*ListLibResp, error) {
	db := l.svcCtx.DB.Model(&models.Student{})
	//搜索
	if req.Keyword != "" {
		db = db.Where("name LIKE ? OR student_no LIKE ?", "%"+req.Keyword+"%", "%"+req.Keyword+"%")
	}
	// 分页
	pager := req.PageParams
	res := ListLibResp{
		PageResult: result.PageResult{
			PageSize: pager.PageSize,
			Current:  pager.Current,
			Offset:   pager.PageSize * (pager.Current - 1),
		},
	}
	// 总数
	if err := db.Count(&res.Total).Error; err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息列表失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}
	// 查询列表
	var list []models.Student
	if err := db.Limit(res.PageSize).Offset(res.Offset).Find(&list).Error; err != nil {
		reqStr, _ := json.Marshal(req)
		l.Logger.Errorf("查询信息列表失败，参数：%s，异常：%v", reqStr, err)
		return nil, err
	}
	res.List = list
	res.Pages = int64(math.Ceil(float64(res.Total) / float64(res.PageSize)))
	return &res, nil
}
