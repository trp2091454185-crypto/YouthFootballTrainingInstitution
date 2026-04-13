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

func UpdateCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CourseCategory
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := category.NewUpdateCategoryLogic(r.Context(), svcCtx)
		err := l.UpdateCategory(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
