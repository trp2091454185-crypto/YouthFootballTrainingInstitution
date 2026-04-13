package Course

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/Course"
	"server/gateway/internal/svc"
)

func DeleteCourseHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Ids string `path:"ids"`
		}
		if err := httpx.ParsePath(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := Course.NewDeleteCourseLogic(r.Context(), svcCtx)
		err := l.DeleteCourse(req.Ids)
		result.HttpResult(r, w, "删除成功", err)
	}
}
