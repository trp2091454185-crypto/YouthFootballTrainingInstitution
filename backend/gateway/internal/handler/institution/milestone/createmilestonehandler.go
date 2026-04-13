// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package milestone

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/institution/milestone"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateMilestoneHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.InstitutionMilestone
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := milestone.NewCreateMilestoneLogic(r.Context(), svcCtx)
		err := l.CreateMilestone(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
