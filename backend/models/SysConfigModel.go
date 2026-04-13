package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// SysConfig 系统配置表
type SysConfig struct {
	Id          int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	ConfigKey   string    `json:"configKey,optional" form:"configKey,optional" gorm:"column:config_key;not null"`   // 配置键
	ConfigValue *string   `json:"configValue,optional" form:"configValue,optional" gorm:"column:config_value"`      // 配置值
	ConfigDesc  *string   `json:"configDesc,optional" form:"configDesc,optional" gorm:"column:config_desc"`         // 配置描述
	CreatedAt   time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt   time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*SysConfig) TableName() string {
	return "sys_config"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *SysConfig) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
