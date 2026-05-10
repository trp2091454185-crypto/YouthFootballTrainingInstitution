// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1
package auth

import (
	"net/http"
	"server/gateway/internal/logic/login/auth"

	"server/common/result"
	"server/gateway/internal/svc"
)

func GetCurrentUserHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := auth.NewGetCurrentUserLogic(r.Context(), svcCtx)
		resp, err := l.GetCurrentUser()
		result.HttpResult(r, w, resp, err)
	}
}
