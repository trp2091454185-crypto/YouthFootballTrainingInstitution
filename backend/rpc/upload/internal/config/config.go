package config

import "github.com/zeromicro/go-zero/zrpc"

// 上传服务配置
type UploadConf struct {
	SavePath string `json:"savePath"` // 本地存储根目录
	BaseUrl  string `json:"baseUrl"`  // 访问的基础URL
}

type Config struct {
	zrpc.RpcServerConf
	Upload UploadConf `json:"upload"` // 映射yaml中的Upload节点
}
