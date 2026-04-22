// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package upload

import (
	"io"
	"net/http"
	"server/common/result"
	"server/gateway/internal/logic/upload"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/rest/httpx"
)

// 仅用于 httpx.Parse 解析 module 参数，避免 []byte 字段导致 type mismatch
type parseRequest struct {
	Module string `form:"module"`
}

func UploadImagesHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req parseRequest
		if err := httpx.Parse(r, &req); err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		file, _, err := r.FormFile("content")
		if err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		defer file.Close()
		content, err := io.ReadAll(file)
		if err != nil {
			result.HttpResult(r, w, nil, err)
			return
		}
		l := upload.NewUploadImagesLogic(r.Context(), svcCtx)
		resp, err := l.UploadImages(&upload.UploadsRequest{
			Module:  req.Module,
			Content: content,
		})
		result.HttpResult(r, w, resp, err)
	}
}
