// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package info

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/institution/info"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListInfoHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req info.ListInfoReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := info.NewListInfoLogic(r.Context(), svcCtx)
		resp, err := l.ListInfo(&req)
		result.HttpResult(r, w, resp, err)
	}
}
