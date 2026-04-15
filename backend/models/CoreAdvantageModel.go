package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// CoreAdvantage 核心优势表
type CoreAdvantage struct {
	Id          int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`      // 主键ID
	Title       string    `json:"title,optional" form:"title,optional" gorm:"column:title;not null"`              // 优势标题
	Description *string   `json:"description,optional" form:"description,optional" gorm:"column:description"`     // 详细描述
	Icon        *string   `json:"icon,optional" form:"icon,optional" gorm:"column:icon"`                          // 图标类名或URL
	Image       *string   `json:"image,optional" form:"image,optional" gorm:"column:image"`                       // 配图
	SortOrder   int32     `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"` // 排序号
	Status      int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"` // 状态:0隐藏 1显示
	CreatedAt   time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"` // 创建时间
	UpdatedAt   time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"` // 更新时间
}

func (*CoreAdvantage) TableName() string {
	return "core_advantage"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *CoreAdvantage) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
