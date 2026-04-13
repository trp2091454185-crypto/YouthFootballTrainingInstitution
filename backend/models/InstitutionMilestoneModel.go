package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// InstitutionMilestone 机构发展历程表
type InstitutionMilestone struct {
	Id            int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	Title         string    `json:"title,optional" form:"title,optional" gorm:"column:title;not null"`                // 里程碑标题
	Content       *string   `json:"content,optional" form:"content,optional" gorm:"column:content"`                   // 详细内容
	MilestoneDate time.Time `json:"milestoneDate,optional" form:"milestoneDate,optional" gorm:"column:milestone_date;not null"` // 里程碑日期
	Image         *string   `json:"image,optional" form:"image,optional" gorm:"column:image"`                         // 配图
	SortOrder     int32     `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"`   // 排序号
	Status        int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0隐藏 1显示
	CreatedAt     time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt     time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*InstitutionMilestone) TableName() string {
	return "institution_milestone"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *InstitutionMilestone) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
