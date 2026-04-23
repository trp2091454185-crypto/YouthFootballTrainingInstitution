// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package info

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/institution/info"
	"server/gateway/internal/svc"
)

func ListInfoHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := info.NewListInfoLogic(r.Context(), svcCtx)
		resp, err := l.ListInfo()
		result.HttpResult(r, w, resp, err)
	}
}
