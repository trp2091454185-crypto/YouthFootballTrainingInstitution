// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package Student

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/student/Student"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListStudentHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req Student.ListStudentReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := Student.NewListStudentLogic(r.Context(), svcCtx)
		resp, err := l.ListStudent(&req)
		result.HttpResult(r, w, resp, err)
	}
}
