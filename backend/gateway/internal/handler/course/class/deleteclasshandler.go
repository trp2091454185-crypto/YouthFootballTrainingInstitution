package class

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/class"
	"server/gateway/internal/svc"
)

func DeleteClassHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Ids string `path:"ids"`
		}
		if err := httpx.ParsePath(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := class.NewDeleteClassLogic(r.Context(), svcCtx)
		err := l.DeleteClass(req.Ids)
		result.HttpResult(r, w, "删除成功", err)
	}
}
