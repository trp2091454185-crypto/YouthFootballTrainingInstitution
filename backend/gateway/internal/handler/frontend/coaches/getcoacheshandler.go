// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package coaches

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/frontend/coaches"
	"server/gateway/internal/svc"
)

func GetCoachesHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := coaches.NewGetCoachesLogic(r.Context(), svcCtx)
		resp, err := l.GetCoaches()
		result.HttpResult(r, w, resp, err)
	}
}
