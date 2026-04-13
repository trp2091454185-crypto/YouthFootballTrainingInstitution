// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"net/http"
	"server/common/result"
	"server/gateway/internal/logic/course/category"
	"server/gateway/internal/svc"
)

func ListCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := category.NewListCategoryLogic(r.Context(), svcCtx)
		resp, err := l.ListCategory()
		result.HttpResult(r, w, resp, err)
	}
}
