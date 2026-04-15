package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// Banner 轮播图表
type Banner struct {
	Id        int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`             // 主键ID
	Title     *string    `json:"title,optional" form:"title,optional" gorm:"column:title"`                              // 标题
	Subtitle  *string    `json:"subtitle,optional" form:"subtitle,optional" gorm:"column:subtitle"`                     // 副标题
	Image     string     `json:"image,optional" form:"image,optional" gorm:"column:image;not null"`                     // 图片URL
	LinkType  int32      `json:"linkType,optional" form:"linkType,optional" gorm:"column:link_type;not null;default:1"` // 链接类型:1无链接 2内部页面 3外部链接
	LinkURL   *string    `json:"linkUrl,optional" form:"linkUrl,optional" gorm:"column:link_url"`                       // 链接地址
	LinkPage  *string    `json:"linkPage,optional" form:"linkPage,optional" gorm:"column:link_page"`                    // 内部页面标识
	Target    *string    `json:"target,optional" form:"target,optional" gorm:"column:target;default:_self"`             // 打开方式:_self/_blank
	SortOrder int32      `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;default:0"`       // 排序号
	Status    int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`        // 状态:0隐藏 1显示
	StartTime *time.Time `json:"startTime,optional" form:"startTime,optional" gorm:"column:start_time"`                 // 开始时间
	EndTime   *time.Time `json:"endTime,optional" form:"endTime,optional" gorm:"column:end_time"`                       // 结束时间
	CreatedAt time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"time;column:created_at"`            // 创建时间
	UpdatedAt time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"time;column:updated_at"`            // 修改时间
}

func (*Banner) TableName() string {
	return "banner"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Banner) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
