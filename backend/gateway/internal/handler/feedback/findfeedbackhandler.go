// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package feedback

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/feedback"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func FindFeedbackHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Feedback
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := feedback.NewFindFeedbackLogic(r.Context(), svcCtx)
		resp, err := l.FindFeedback(&req)
		result.HttpResult(r, w, resp, err)
	}
}
