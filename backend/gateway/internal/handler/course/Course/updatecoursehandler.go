package Course

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/Course"
	"server/gateway/internal/svc"
	"server/models"
)

func UpdateCourseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Course
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := Course.NewUpdateCourseLogic(r.Context(), svcCtx)
		err := l.UpdateCourse(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
