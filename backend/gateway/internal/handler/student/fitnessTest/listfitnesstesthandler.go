// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package fitnessTest

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/student/fitnessTest"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListFitnessTestHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req fitnessTest.ListFitnessTestReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := fitnessTest.NewListFitnessTestLogic(r.Context(), svcCtx)
		resp, err := l.ListFitnessTest(&req)
		result.HttpResult(r, w, resp, err)
	}
}
