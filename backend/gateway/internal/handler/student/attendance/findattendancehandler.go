// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package attendance

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/student/attendance"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindAttendanceHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.StudentAttendance
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := attendance.NewFindAttendanceLogic(r.Context(), svcCtx)
		resp, err := l.FindAttendance(&req)
		result.HttpResult(r, w, resp, err)
	}
}
