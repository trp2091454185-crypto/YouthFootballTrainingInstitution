// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package banner

import (
	"net/http"
	"server/common/result"
	"server/gateway/internal/logic/banner"
	"server/models"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateBannerHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Banner
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := banner.NewCreateBannerLogic(r.Context(), svcCtx)
		err := l.CreateBanner(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
