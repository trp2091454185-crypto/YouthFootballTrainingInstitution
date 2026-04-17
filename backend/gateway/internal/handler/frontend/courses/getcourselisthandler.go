// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package courses

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/frontend/courses"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func GetCourseListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req courses.CourseListReq
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}
		l := courses.NewGetCourseListLogic(r.Context(), svcCtx)
		resp, err := l.GetCourseList(&req)
		result.HttpResult(r, w, resp, err)
	}
}
