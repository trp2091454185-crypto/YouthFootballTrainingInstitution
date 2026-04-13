// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package category

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/category"
	"server/gateway/internal/svc"
)

type DeleteIdsReq struct {
	Ids string `json:"ids"`
}

func DeleteCategoryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req DeleteIdsReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := category.NewDeleteCategoryLogic(r.Context(), svcCtx)
		err := l.DeleteCategory(req.Ids)
		result.HttpResult(r, w, "删除成功", err)
	}
}
