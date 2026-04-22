package logic

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"net/http"
	"os"
	"path/filepath"
	"server/rpc/upload/internal/svc"
	"server/rpc/upload/pb"

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
	// 2. 大小限制
	if int64(len(req.Content)) > MaxFileSize {
		return nil, status.Error(codes.InvalidArgument, "文件最大10MB")
	}
	// 3. 真实文件类型检测（自动识别图片格式）
	contentType := http.DetectContentType(req.Content)
	if !allowedImageTypes[contentType] {
		return nil, status.Error(codes.InvalidArgument, "仅支持 jpg、png、webp 格式")
	}
	// 4. 自动获取后缀（不需要传文件名！自动识别）
	var ext string
	switch contentType {
	case "image/jpeg":
		ext = ".jpg"
	case "image/png":
		ext = ".png"
	case "image/webp":
		ext = ".webp"
	default:
		return nil, status.Error(codes.InvalidArgument, "不支持的图片格式")
	}
	// 5. 图片完整性校验
	_, _, err := image.DecodeConfig(bytes.NewReader(req.Content))
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "图片已损坏")
	}

	// 6. 生成【真正安全随机】的文件名（16位随机字符串）
	randBytes := make([]byte, 8)
	_, _ = rand.Read(randBytes)
	fileName := hex.EncodeToString(randBytes) + ext

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
