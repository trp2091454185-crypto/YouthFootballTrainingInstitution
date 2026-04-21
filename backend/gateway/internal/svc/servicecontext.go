// Code scaffolded by goctl. Safe to edit.
// goctl 1.9.2

package svc

import (
	"fmt"
	"log"
	"os"
	"server/gateway/internal/config"
	"server/rpc/upload/uploadClient"
	"time"

	"github.com/zeromicro/go-zero/zrpc"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type ServiceContext struct {
	Config       config.Config
	DB           *gorm.DB            // GORM的MySQL客户端实例
	UploadClient uploadClient.Upload //上传服务 RPC 客户端
}

func NewServiceContext(c config.Config) *ServiceContext {
	// 1. 配置GORM日志（可选，开发环境开启详细日志，生产环境可关闭）
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // 日志输出到控制台
		logger.Config{
			SlowThreshold: time.Second, // 慢查询阈值（超过1秒记录）
			LogLevel:      logger.Info, // 日志级别：Info(开发)/Warn(测试)/Error(生产)
			Colorful:      true,        // 彩色日志
		},
	)

	// 2. 连接MySQL并初始化GORM客户端
	db, err := gorm.Open(mysql.Open(c.Mysql.Dsn), &gorm.Config{
		Logger: newLogger, // 注入日志配置
	})
	if err != nil {
		// 连接失败直接panic，Go-Zero会终止服务启动
		panic("连接数据库出错: " + err.Error())
	} else {
		fmt.Println("连接数据库成功")
	}

	// 3. 获取GORM底层的sql.DB，配置连接池（关键，避免数据库连接泄漏）
	sqlDB, err := db.DB()
	if err != nil {
		panic("gorm get sql.DB failed: " + err.Error())
	}
	// 设置连接池参数，与yaml配置一致
	sqlDB.SetMaxOpenConns(c.Mysql.MaxOpenConns)
	sqlDB.SetMaxIdleConns(c.Mysql.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(time.Duration(c.Mysql.MaxLifetime) * time.Second)
	sqlDB.SetConnMaxIdleTime(time.Duration(c.Mysql.MaxIdleTime) * time.Second)
	return &ServiceContext{
		Config:       c,
		DB:           db,
		UploadClient: uploadClient.NewUpload(zrpc.MustNewClient(c.UploadRpc)),
	}
}
