// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package about

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/frontend/about"
	"server/gateway/internal/svc"
)

func GetFacilityHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := about.NewGetFacilityLogic(r.Context(), svcCtx)
		resp, err := l.GetFacility()
		result.HttpResult(r, w, resp, err)
	}
}
