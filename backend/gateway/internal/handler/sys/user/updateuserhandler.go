// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package user

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/sys/user"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func UpdateUserHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.SysUser
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := user.NewUpdateUserLogic(r.Context(), svcCtx)
		err := l.UpdateUser(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
