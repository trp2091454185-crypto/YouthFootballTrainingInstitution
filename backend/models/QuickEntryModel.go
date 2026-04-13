package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// QuickEntry 快速入口表
type QuickEntry struct {
	Id        int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	Name      string    `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                   // 入口名称
	Icon      *string   `json:"icon,optional" form:"icon,optional" gorm:"column:icon"`                            // 图标
	LinkType  int32     `json:"linkType,optional" form:"linkType,optional" gorm:"column:link_type;not null;default:1"` // 链接类型:1内部页面 2外部链接
	LinkUrl   *string   `json:"linkUrl,optional" form:"linkUrl,optional" gorm:"column:link_url"`                  // 链接地址
	LinkPage  *string   `json:"linkPage,optional" form:"linkPage,optional" gorm:"column:link_page"`               // 内部页面标识
	SortOrder int32     `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"`   // 排序号
	Status    int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0隐藏 1显示
	CreatedAt time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*QuickEntry) TableName() string {
	return "quick_entry"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *QuickEntry) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
