// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package growthRecord

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/student/growthRecord"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateGrowthRecordHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.StudentGrowthRecord
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := growthRecord.NewCreateGrowthRecordLogic(r.Context(), svcCtx)
		err := l.CreateGrowthRecord(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
