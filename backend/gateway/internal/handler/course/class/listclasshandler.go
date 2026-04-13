package class

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/class"
	"server/gateway/internal/svc"
)

func ListClassHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req class.ListClassReq
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := class.NewListClassLogic(r.Context(), svcCtx)
		resp, err := l.ListClass(&req)
		result.HttpResult(r, w, resp, err)
	}
}
