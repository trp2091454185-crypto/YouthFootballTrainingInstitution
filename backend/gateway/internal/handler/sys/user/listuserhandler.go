// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package user

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/sys/user"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListUserHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req user.ListUserReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := user.NewListUserLogic(r.Context(), svcCtx)
		resp, err := l.ListUser(&req)
		result.HttpResult(r, w, resp, err)
	}
}
