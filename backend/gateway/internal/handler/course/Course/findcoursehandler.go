package Course

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/Course"
	"server/gateway/internal/svc"
	"server/models"
)

func FindCourseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Course
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := Course.NewFindCourseLogic(r.Context(), svcCtx)
		resp, err := l.FindCourse(&req)
		result.HttpResult(r, w, resp, err)
	}
}
