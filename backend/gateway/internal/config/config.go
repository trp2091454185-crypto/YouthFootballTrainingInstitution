// Code scaffolded by goctl. Safe to edit.
// goctl 1.9.2

package config

import (
	"github.com/zeromicro/go-zero/rest"
	"github.com/zeromicro/go-zero/zrpc"
)

// 定义MySQL配置结构体，与yaml中的Mysql节点对应
type MysqlConf struct {
	Dsn          string `json:"dsn"`
	MaxOpenConns int    `json:"maxOpenConns"`
	MaxIdleConns int    `json:"maxIdleConns"`
	MaxLifetime  int    `json:"maxLifetime"`
	MaxIdleTime  int    `json:"maxIdleTime"`
}

// 主配置结构体，嵌入Go-Zero的rest.RestConf（HTTP服务配置）+ 自定义MysqlConf
type Config struct {
	rest.RestConf                    // 继承Server相关配置
	Mysql         MysqlConf          `json:"mysql"`     // 映射yaml中的Mysql节点
	UploadRpc     zrpc.RpcClientConf `json:"UploadRpc"` // 上传服务
	StaticFile    StaticFileConf     `json:"StaticFile"`// 静态文件服务
}

type StaticFileConf struct {
	SavePath  string `json:"savePath"`
	UrlPrefix string `json:"urlPrefix"`
}
