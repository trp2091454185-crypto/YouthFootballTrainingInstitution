// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package entry

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/quick/entry"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListEntryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req entry.ListEntryReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := entry.NewListEntryLogic(r.Context(), svcCtx)
		resp, err := l.ListEntry(&req)
		result.HttpResult(r, w, resp, err)
	}
}
