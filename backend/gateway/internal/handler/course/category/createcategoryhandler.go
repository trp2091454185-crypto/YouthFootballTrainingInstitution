// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"net/http"
	"server/common/result"

	"server/gateway/internal/logic/course/category"
	"server/gateway/internal/svc"
	"server/models"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CourseCategory
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := category.NewCreateCategoryLogic(r.Context(), svcCtx)
		err := l.CreateCategory(&req)

		result.HttpResult(r, w, "创建成功", err)
	}
}
