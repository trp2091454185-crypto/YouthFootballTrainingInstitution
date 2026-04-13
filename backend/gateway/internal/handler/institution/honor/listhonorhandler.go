// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package honor

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/institution/honor"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func ListHonorHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req honor.ListHonorReq
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := honor.NewListHonorLogic(r.Context(), svcCtx)
		resp, err := l.ListHonor(&req)
		result.HttpResult(r, w, resp, err)
	}
}
