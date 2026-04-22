// Code scaffolded by goctl. Safe to edit.
// goctl 1.9.2

package main

import (
	"flag"
	"fmt"
	"net/http"

	"server/common/tools/snowx"
	"server/gateway/internal/config"
	"server/gateway/internal/handler"
	"server/gateway/internal/svc"

	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
)

var configFile = flag.String("f", "etc/gateway.yaml", "the config file")

func main() {
	flag.Parse()

	// 初始化雪花算法节点（节点ID可根据部署环境配置）
	snowx.InitNode(1)

	var c config.Config
	conf.MustLoad(*configFile, &c)

	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	ctx := svc.NewServiceContext(c)
	handler.RegisterHandlers(server, ctx)

	// 注册静态文件服务：/uploads/* -> ./static/images/*
	if c.StaticFile.SavePath != "" && c.StaticFile.UrlPrefix != "" {
		server.AddRoute(rest.Route{
			Method:  http.MethodGet,
			Path:    c.StaticFile.UrlPrefix + "/:module/:file",
			Handler: http.StripPrefix(c.StaticFile.UrlPrefix, http.FileServer(http.Dir(c.StaticFile.SavePath))).ServeHTTP,
		})
	}

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
