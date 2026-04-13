// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package growthRecord

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/student/growthRecord"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListGrowthRecordHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req growthRecord.ListGrowthRecordReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := growthRecord.NewListGrowthRecordLogic(r.Context(), svcCtx)
		resp, err := l.ListGrowthRecord(&req)
		result.HttpResult(r, w, resp, err)
	}
}
