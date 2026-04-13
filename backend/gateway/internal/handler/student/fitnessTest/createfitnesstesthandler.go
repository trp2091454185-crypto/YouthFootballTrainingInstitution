// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package fitnessTest

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/student/fitnessTest"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func CreateFitnessTestHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.StudentFitnessTest
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := fitnessTest.NewCreateFitnessTestLogic(r.Context(), svcCtx)
		err := l.CreateFitnessTest(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
