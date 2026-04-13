// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/core/advantage"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindAdvantageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CoreAdvantage
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := advantage.NewFindAdvantageLogic(r.Context(), svcCtx)
		resp, err := l.FindAdvantage(&req)
		result.HttpResult(r, w, resp, err)
	}
}
