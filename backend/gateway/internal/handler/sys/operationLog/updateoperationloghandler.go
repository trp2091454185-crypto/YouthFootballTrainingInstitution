// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package operationLog

import (
	"net/http"
	"server/common/result"
	"server/models"

	"server/gateway/internal/logic/sys/operationLog"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

func UpdateOperationLogHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.SysOperationLog
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := operationLog.NewUpdateOperationLogLogic(r.Context(), svcCtx)
		err := l.UpdateOperationLog(&req)
		result.HttpResult(r, w, "更新成功", err)
	}
}
