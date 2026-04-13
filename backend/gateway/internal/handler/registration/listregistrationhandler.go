// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package registration

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/registration"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListRegistrationHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req registration.ListRegistrationReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := registration.NewListRegistrationLogic(r.Context(), svcCtx)
		resp, err := l.ListRegistration(&req)
		result.HttpResult(r, w, resp, err)
	}
}
