// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package advantage

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/core/advantage"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateAdvantageHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CoreAdvantage
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := advantage.NewCreateAdvantageLogic(r.Context(), svcCtx)
		err := l.CreateAdvantage(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
