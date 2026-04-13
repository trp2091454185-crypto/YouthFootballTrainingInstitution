package class

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/class"
	"server/gateway/internal/svc"
	"server/models"
)

func FindClassHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CourseClass
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := class.NewFindClassLogic(r.Context(), svcCtx)
		resp, err := l.FindClass(&req)
		result.HttpResult(r, w, resp, err)
	}
}
