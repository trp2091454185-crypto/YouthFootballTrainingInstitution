package class

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"server/common/result"
	"server/gateway/internal/logic/course/class"
	"server/gateway/internal/svc"
	"server/models"
)

func CreateClassHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.CourseClass
		if err := httpx.Parse(r, &req); err != nil {
			result.ParamErrorResult(r, w, err)
			return
		}

		l := class.NewCreateClassLogic(r.Context(), svcCtx)
		err := l.CreateClass(&req)
		result.HttpResult(r, w, "创建成功", err)
	}
}
