// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/core/advantage"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListAdvantageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req advantage.ListAdvantageReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := advantage.NewListAdvantageLogic(r.Context(), svcCtx)
		resp, err := l.ListAdvantage(&req)
		result.HttpResult(r, w, resp, err)
	}
}
