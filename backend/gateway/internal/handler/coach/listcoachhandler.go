// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package coach

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/coach"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListCoachHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req coach.ListCoachReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := coach.NewListCoachLogic(r.Context(), svcCtx)
		resp, err := l.ListCoach(&req)
		result.HttpResult(r, w, resp, err)
	}
}
