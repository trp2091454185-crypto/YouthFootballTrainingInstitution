// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/category"
	"server/gateway/internal/svc"
	"server/models"
)

func FindCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CourseCategory
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := category.NewFindCategoryLogic(r.Context(), svcCtx)
		resp, err := l.FindCategory(&req)
		result.HttpResult(r, w, resp, err)
	}
}
