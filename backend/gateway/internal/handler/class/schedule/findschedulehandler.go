// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package schedule

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/class/schedule"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindScheduleHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.ClassSchedule
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := schedule.NewFindScheduleLogic(r.Context(), svcCtx)
		resp, err := l.FindSchedule(&req)
		result.HttpResult(r, w, resp, err)
	}
}
