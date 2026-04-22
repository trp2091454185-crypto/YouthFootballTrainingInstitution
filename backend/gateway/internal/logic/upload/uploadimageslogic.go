// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package upload

import (
	"context"
	"server/rpc/upload/pb"

	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadsRequest struct {
	Module  string `json:"module" form:"module"`
	Content []byte `json:"content" form:"content"`
}

type UploadsResp struct {
	Mes string `json:"mes"`
	Url string `json:"url"`
}

type UploadImagesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUploadImagesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadImagesLogic {
	return &UploadImagesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadImagesLogic) UploadImages(req *UploadsRequest) (resp *UploadsResp, err error) {
	if req.Module == "" {
		req.Module = "file"
	}
	if len(req.Content) == 0 {
		l.Logger.Errorf("未检测到上传图片信息")
		return nil, nil
	}
	res, err1 := l.svcCtx.UploadClient.UploadFile(l.ctx, &pb.UploadReq{
		Module:  req.Module,
		Content: req.Content,
	})
	if err1 != nil {
		return nil, err1
	}

	return &UploadsResp{
		Mes: "上传成功",
		Url: res.Url,
	}, nil

}
