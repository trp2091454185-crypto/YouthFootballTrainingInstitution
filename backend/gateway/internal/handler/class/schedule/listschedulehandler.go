// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package schedule

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/class/schedule"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListScheduleHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req schedule.ListScheduleReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := schedule.NewListScheduleLogic(r.Context(), svcCtx)
		resp, err := l.ListSchedule(&req)
		result.HttpResult(r, w, resp, err)
	}
}
