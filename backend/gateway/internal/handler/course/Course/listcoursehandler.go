package Course

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/Course"
	"server/gateway/internal/svc"
)

func ListCourseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req Course.ListCourseReq
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := Course.NewListCourseLogic(r.Context(), svcCtx)
		resp, err := l.ListCourse(&req)
		result.HttpResult(r, w, resp, err)
	}
}
