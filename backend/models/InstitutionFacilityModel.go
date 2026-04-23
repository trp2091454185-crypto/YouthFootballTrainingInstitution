package models

import (
	"server/common/tools/snowx"
	"server/common/types"
	"time"

	"gorm.io/gorm"
)

// InstitutionFacility 场地设施表
type InstitutionFacility struct {
	Id          int64             `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`      // 主键ID
	Name        string            `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                 // 设施名称
	Description *string           `json:"description,optional" form:"description,optional" gorm:"column:description"`     // 设施描述
	Images      types.StringSlice `json:"images,optional" form:"images,optional" gorm:"column:images;type:json"`          // 设施图片数组
	Features    types.StringSlice `json:"features,optional" form:"features,optional" gorm:"column:features;type:json"`    // 设施特点标签数组
	SortOrder   int32             `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"` // 排序号
	Status      int32             `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"` // 状态:0隐藏 1显示
	CreatedAt   time.Time         `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"` // 创建时间
	UpdatedAt   time.Time         `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"` // 更新时间
	CoverImages *string           `json:"coverImage,optional" form:"coverImage,optional" gorm:"column:cover_image"`
}

func (*InstitutionFacility) TableName() string {
	return "institution_facility"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *InstitutionFacility) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
