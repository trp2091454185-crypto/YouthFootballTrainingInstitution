// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package home

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/frontend/home"
	"server/gateway/internal/svc"
)

func GetBannerHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := home.NewGetBannerLogic(r.Context(), svcCtx)
		resp, err := l.GetBanner()
		result.HttpResult(r, w, resp, err)
	}
}
