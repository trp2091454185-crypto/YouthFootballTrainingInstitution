// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package banner

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/banner"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindBannerHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Banner
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := banner.NewFindBannerLogic(r.Context(), svcCtx)
		resp, err := l.FindBanner(&req)
		result.HttpResult(r, w, resp, err)
	}
}
