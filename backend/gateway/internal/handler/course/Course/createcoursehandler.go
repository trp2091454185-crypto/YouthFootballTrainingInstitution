package Course

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/Course"
	"server/gateway/internal/svc"
	"server/models"
)

func CreateCourseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Course
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := Course.NewCreateCourseLogic(r.Context(), svcCtx)
		err := l.CreateCourse(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
