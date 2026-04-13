package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// SysUser 管理员账户表
type SysUser struct {
	Id            int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	Username      string     `json:"username,optional" form:"username,optional" gorm:"column:username;not null"`       // 用户名
	Password      string     `json:"password,optional" form:"password,optional" gorm:"column:password;not null"`       // 加密密码
	Phone         *string    `json:"phone,optional" form:"phone,optional" gorm:"column:phone"`                         // 手机号
	Email         *string    `json:"email,optional" form:"email,optional" gorm:"column:email"`                         // 邮箱
	Role          int32      `json:"role,optional" form:"role,optional" gorm:"column:role;not null;default:1"`         // 角色:1管理员 2超级管理员
	Status        int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0禁用 1启用
	LastLoginTime *time.Time `json:"lastLoginTime,optional" form:"lastLoginTime,optional" gorm:"column:last_login_time"` // 最后登录时间
	LastLoginIp   *string    `json:"lastLoginIp,optional" form:"lastLoginIp,optional" gorm:"column:last_login_ip"`     // 最后登录IP
	CreatedAt     time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt     time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*SysUser) TableName() string {
	return "sys_user"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *SysUser) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
