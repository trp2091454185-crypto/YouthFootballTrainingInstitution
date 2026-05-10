// Code scaffolded by goctl. Safe to edit.
// goctl 1.9.2

package main

import (
	"flag"
	"fmt"
	"net/http"

	"server/common/middleware"
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

	// 注册全局 JWT 认证中间件（白名单路由放行）
	// 新增公开路由时只需在下方白名单追加路径，无需修改 routes.go
	whiteList := []string{
		// 认证接口（登录/登出/刷新）
		"/api/v1/auth/login",
		"/api/v1/auth/logout",
		"/api/v1/auth/refresh",
		// 前台展示接口（公开访问）
		"/api/v1/frontend/about/facility",
		"/api/v1/frontend/about/honor",
		"/api/v1/frontend/about/info",
		"/api/v1/frontend/coaches/ListCoaches",
		"/api/v1/frontend/courses/CourseCategory",
		"/api/v1/frontend/courses/CourseList",
		"/api/v1/frontend/home/banner",
		"/api/v1/frontend/home/coreStrengths",
	}
	server.Use(rest.ToMiddleware(middleware.AuthMiddlewareWhiteList(ctx.JwtAuth, whiteList)))

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
