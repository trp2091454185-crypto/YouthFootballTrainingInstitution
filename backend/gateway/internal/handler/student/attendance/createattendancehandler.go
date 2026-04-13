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

func CreateAttendanceHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.StudentAttendance
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := attendance.NewCreateAttendanceLogic(r.Context(), svcCtx)
		err := l.CreateAttendance(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
