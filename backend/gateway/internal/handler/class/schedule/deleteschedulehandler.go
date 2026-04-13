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

func DeleteScheduleHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Ids string `path:"ids"`
		}
		if err := httpx.ParsePath(r, &req); err != nil {
			httpx.Error(w, err)
			return
		}
		l := schedule.NewDeleteScheduleLogic(r.Context(), svcCtx)
		err := l.DeleteSchedule(req.Ids)

		result.HttpResult(r, w, "删除成功", err)
	}
}
