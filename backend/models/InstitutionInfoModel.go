package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// InstitutionInfo 机构基本信息表
type InstitutionInfo struct {
	Id            int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	Name          string     `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                   // 机构名称
	Slogan        *string    `json:"slogan,optional" form:"slogan,optional" gorm:"column:slogan"`                      // 机构标语/理念
	Logo          *string    `json:"logo,optional" form:"logo,optional" gorm:"column:logo"`                            // 机构Logo
	Description   *string    `json:"description,optional" form:"description,optional" gorm:"column:description"`       // 机构简介
	FoundedDate   *time.Time `json:"foundedDate,optional" form:"foundedDate,optional" gorm:"column:founded_date"`      // 成立日期
	ContactPhone  *string    `json:"contactPhone,optional" form:"contactPhone,optional" gorm:"column:contact_phone"`   // 联系电话
	ContactEmail  *string    `json:"contactEmail,optional" form:"contactEmail,optional" gorm:"column:contact_email"`   // 联系邮箱
	Address       *string    `json:"address,optional" form:"address,optional" gorm:"column:address"`                   // 机构地址
	BusinessHours *string    `json:"businessHours,optional" form:"businessHours,optional" gorm:"column:business_hours"` // 营业时间
	WechatQr      *string    `json:"wechatQr,optional" form:"wechatQr,optional" gorm:"column:wechat_qr"`               // 微信公众号二维码
	CreatedAt     time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt     time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*InstitutionInfo) TableName() string {
	return "institution_info"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *InstitutionInfo) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
