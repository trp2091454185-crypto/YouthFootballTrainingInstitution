// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package enrollment

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/student/enrollment"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListEnrollmentHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req enrollment.ListEnrollmentReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := enrollment.NewListEnrollmentLogic(r.Context(), svcCtx)
		resp, err := l.ListEnrollment(&req)
		result.HttpResult(r, w, resp, err)
	}
}
