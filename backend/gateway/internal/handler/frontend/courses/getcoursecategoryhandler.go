// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package courses

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/frontend/courses"
	"server/gateway/internal/svc"
)

func GetCourseCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := courses.NewGetCourseCategoryLogic(r.Context(), svcCtx)
		resp, err := l.GetCourseCategory()
		result.HttpResult(r, w, resp, err)
	}
}
