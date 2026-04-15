package models

import (
	"server/common/tools/snowx"
	"server/common/types"
	"time"

	"gorm.io/gorm"
)

// Coach 教练信息表
type Coach struct {
	Id               int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                   // 主键ID
	Name             string     `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                               // 教练姓名
	Avatar           *string    `json:"avatar,optional" form:"avatar,optional" gorm:"column:avatar"`                                  // 头像
	Gender           int32      `json:"gender,optional" form:"gender,optional" gorm:"column:gender;not null;default:1"`               // 性别:1男 2女
	Phone            *string    `json:"phone,optional" form:"phone,optional" gorm:"column:phone"`                                     // 联系电话
	Email            *string    `json:"email,optional" form:"email,optional" gorm:"column:email"`                                     // 邮箱
	BirthDate        *time.Time `json:"birthDate,optional" form:"birthDate,optional" gorm:"column:birth_date"`                        // 出生日期
	WorkYears        *int32     `json:"workYears,optional" form:"workYears,optional" gorm:"column:work_years"`                        // 执教年限
	Bio              *string    `json:"bio,optional" form:"bio,optional" gorm:"column:bio"`                                           // 个人简介
	CareerHistory    types.StringSlice `json:"careerHistory,optional" form:"careerHistory,optional" gorm:"column:career_history;type:json"`   // 执教履历
	Certificates     types.StringSlice `json:"certificates,optional" form:"certificates,optional" gorm:"column:certificates;type:json"`       // 资质证书
	Specialties      types.StringSlice `json:"specialties,optional" form:"specialties,optional" gorm:"column:specialties;type:json"`          // 专项擅长:启蒙/体能/战术/门将等
	AgeGroups        types.StringSlice `json:"ageGroups,optional" form:"ageGroups,optional" gorm:"column:age_groups;type:json"`               // 适合年龄段:U6/U8/U10/U12等
	TeachingFeatures *string    `json:"teachingFeatures,optional" form:"teachingFeatures,optional" gorm:"column:teaching_features"`   // 教学特色
	SortOrder        int32      `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"`               // 排序号
	Status           int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`               // 状态:0禁用 1启用
	CreatedAt        time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`               // 创建时间
	UpdatedAt        time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`               // 更新时间
}

func (*Coach) TableName() string {
	return "coach"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Coach) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
