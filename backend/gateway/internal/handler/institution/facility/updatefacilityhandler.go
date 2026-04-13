// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package facility

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/institution/facility"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func UpdateFacilityHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.InstitutionFacility
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := facility.NewUpdateFacilityLogic(r.Context(), svcCtx)
		err := l.UpdateFacility(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
