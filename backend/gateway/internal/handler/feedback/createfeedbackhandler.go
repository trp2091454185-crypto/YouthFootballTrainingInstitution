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

func CreateFeedbackHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Feedback
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := feedback.NewCreateFeedbackLogic(r.Context(), svcCtx)
		err := l.CreateFeedback(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
