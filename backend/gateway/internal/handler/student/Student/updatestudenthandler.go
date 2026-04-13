// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package Student

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/student/Student"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func UpdateStudentHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.Student
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := Student.NewUpdateStudentLogic(r.Context(), svcCtx)
		err := l.UpdateStudent(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
