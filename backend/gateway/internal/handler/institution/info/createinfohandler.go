// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package info

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/institution/info"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateInfoHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.InstitutionInfo
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := info.NewCreateInfoLogic(r.Context(), svcCtx)
		err := l.CreateInfo(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
