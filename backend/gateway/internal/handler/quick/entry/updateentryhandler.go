// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package entry

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/quick/entry"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func UpdateEntryHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.QuickEntry
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := entry.NewUpdateEntryLogic(r.Context(), svcCtx)
		err := l.UpdateEntry(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
