package logic

import (
	"bytes"
	"context"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"net/http"
	"os"
	"path/filepath"
	"server/rpc/upload/internal/svc"
	"server/rpc/upload/pb"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UploadFileLogic struct {
	ctx    context.Context
	svcCtx *svc.ServiceContext
	logx.Logger
}

func NewUploadFileLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadFileLogic {
	return &UploadFileLogic{
		ctx:    ctx,
		svcCtx: svcCtx,
		Logger: logx.WithContext(ctx),
	}
}

const (
	MaxFileSize = 10 * 1024 * 1024 // 10MB
	AllowedExt  = ".jpg,.jpeg,.png,.webp"
)

var allowedImageTypes = map[string]bool{
	"image/jpeg": true,
	"image/png":  true,
}

func (l *UploadFileLogic) UploadFile(req *pb.UploadReq) (*pb.UploadResp, error) {
	// 1. 非空校验
	if len(req.Content) == 0 {
		return nil, status.Error(codes.InvalidArgument, "文件不能为空")
	}
	if req.Name == "" {
		return nil, status.Error(codes.InvalidArgument, "文件名不能为空")
	}

	// 2. 大小限制
	if int64(len(req.Content)) > MaxFileSize {
		return nil, status.Error(codes.InvalidArgument, "文件最大10MB")
	}

	// 3. 后缀名校验
	ext := strings.ToLower(filepath.Ext(req.Name))
	if !strings.Contains(AllowedExt, ext) {
		return nil, status.Error(codes.InvalidArgument, "仅支持jpg/png/webp")
	}

	// 4. 真实文件类型校验
	contentType := http.DetectContentType(req.Content)
	if !allowedImageTypes[contentType] {
		return nil, status.Error(codes.InvalidArgument, "非法图片格式")
	}

	// 5. 图片完整性校验
	_, _, err := image.DecodeConfig(bytes.NewReader(req.Content))
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "图片已损坏")
	}

	// 6. 生成唯一文件名（内置时间戳，无任何第三方包）
	fileName := fmt.Sprintf("%d%s", time.Now().UnixMilli(), ext)

	// 7. 保存
	module := req.Module
	dir := filepath.Join(l.svcCtx.Upload.SavePath, module)
	_ = os.MkdirAll(dir, 0755)
	path := filepath.Join(dir, fileName)

	err = os.WriteFile(path, req.Content, 0644)
	if err != nil {
		return nil, status.Error(codes.Internal, "保存失败")
	}

	url := fmt.Sprintf("%s/uploads/%s/%s", l.svcCtx.Upload.BaseUrl, module, fileName)

	return &pb.UploadResp{
		Url:  url,
		Path: path,
	}, nil
}
