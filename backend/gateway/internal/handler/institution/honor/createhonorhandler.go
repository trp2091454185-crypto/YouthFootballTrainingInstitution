// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package honor

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/institution/honor"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateHonorHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.InstitutionHonor
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := honor.NewCreateHonorLogic(r.Context(), svcCtx)
		err := l.CreateHonor(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
