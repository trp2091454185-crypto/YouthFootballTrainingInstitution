package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// InstitutionHonor 荣誉奖项表
type InstitutionHonor struct {
	Id          int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	Title       string     `json:"title,optional" form:"title,optional" gorm:"column:title;not null"`                // 荣誉标题
	Description *string    `json:"description,optional" form:"description,optional" gorm:"column:description"`       // 荣誉描述
	AwardDate   *time.Time `json:"awardDate,optional" form:"awardDate,optional" gorm:"column:award_date"`            // 获奖日期
	AwardOrg    *string    `json:"awardOrg,optional" form:"awardOrg,optional" gorm:"column:award_org"`               // 颁发机构
	Image       *string    `json:"image,optional" form:"image,optional" gorm:"column:image"`                         // 荣誉图片
	SortOrder   int32      `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"`   // 排序号
	Status      int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0隐藏 1显示
	CreatedAt   time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt   time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*InstitutionHonor) TableName() string {
	return "institution_honor"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *InstitutionHonor) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
