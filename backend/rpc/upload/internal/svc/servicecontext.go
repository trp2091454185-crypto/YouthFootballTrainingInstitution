package svc

import "server/rpc/upload/internal/config"

type ServiceContext struct {
	Config  config.Config
	Upload  config.UploadConf
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config: c,
		Upload: c.Upload,
	}
}
