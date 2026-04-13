// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package config

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/sys/config"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindConfigHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.SysConfig
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := config.NewFindConfigLogic(r.Context(), svcCtx)
		resp, err := l.FindConfig(&req)
		result.HttpResult(r, w, resp, err)
	}
}
