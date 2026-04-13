package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// CourseCategory 课程分类表
type CourseCategory struct {
	Id          int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                 // 主键ID
	Name        string    `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                            // 分类名称
	Code        *string   `json:"code,optional" form:"code,optional" gorm:"column:code"`                                     // 分类编码
	Description *string   `json:"description,optional" form:"description,optional" gorm:"column:description"`                // 分类描述
	ParentId    int64     `json:"parentId,optional,string" form:"parentId,optional,string" gorm:"column:parent_id;not null"` // 父级ID,0为顶级
	SortOrder   int32     `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order"`                     // 排序号
	Status      int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`            // 状态:0禁用 1启用
	CreatedAt   time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`            // 创建时间
	UpdatedAt   time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`            // 更新时间

	Children []CourseCategory `json:"children,optional" gorm:"foreignKey:ParentId;references:Id"`
}

func (*CourseCategory) TableName() string {
	return "course_category"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *CourseCategory) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
