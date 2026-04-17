package models

import (
	"server/common/tools/snowx"
	"server/common/types"
	"time"

	"gorm.io/gorm"
)

// Course 课程信息表
type Course struct {
	Id             int64              `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                       // 主键ID
	CategoryId     int64              `json:"categoryId,optional,string" form:"categoryId,optional,string" gorm:"column:category_id;not null"` // 分类ID
	Name           string             `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                                  // 课程名称
	Code           *string            `json:"code,optional" form:"code,optional" gorm:"column:code"`                                           // 课程编码
	CoverImage     *string            `json:"coverImage,optional" form:"coverImage,optional" gorm:"column:cover_image"`                        // 课程封面图
	Images         *string            `json:"images,optional" form:"images,optional" gorm:"column:images"`                                     // 课程图片集
	SuitableAgeMin *int32             `json:"suitableAgeMin,optional" form:"suitableAgeMin,optional" gorm:"column:suitable_age_min"`           // 适合最小年龄
	SuitableAgeMax *int32             `json:"suitableAgeMax,optional" form:"suitableAgeMax,optional" gorm:"column:suitable_age_max"`           // 适合最大年龄
	AgeGroupTag    *string            `json:"ageGroupTag,optional" form:"ageGroupTag,optional" gorm:"column:age_group_tag"`                    // 年龄段标签:U6/U8/U10/U12/U14/U16
	CourseHours    *int32             `json:"courseHours,optional" form:"courseHours,optional" gorm:"column:course_hours"`                     // 总课时数
	ClassDuration  *int32             `json:"classDuration,optional" form:"classDuration,optional" gorm:"column:class_duration"`               // 单次课时(分钟)
	ClassSizeMin   *int32             `json:"classSizeMin,optional" form:"classSizeMin,optional" gorm:"column:class_size_min"`                 // 最少开班人数
	ClassSizeMax   *int32             `json:"classSizeMax,optional" form:"classSizeMax,optional" gorm:"column:class_size_max"`                 // 最多容纳人数
	Price          float64            `json:"price,optional" form:"price,optional" gorm:"column:price;not null;default:0.00"`                  // 课程价格
	PriceUnit      *string            `json:"priceUnit,optional" form:"priceUnit,optional" gorm:"column:price_unit;default:course"`            // 计价单位:course期/hour课时
	Description    *string            `json:"description,optional" form:"description,optional" gorm:"column:description"`                      // 课程简介
	Outline        types.OutlineSlice `json:"outline,optional" form:"outline,optional" gorm:"column:outline;type:json'"`                       // 课程大纲
	Objectives     types.StringSlice  `json:"objectives,optional" form:"objectives,optional" gorm:"column:objectives;type:json"`               // 教学目标
	Features       types.StringSlice  `json:"features,optional" form:"features,optional" gorm:"column:features;type:json"`                     // 课程特色
	Requirements   *string            `json:"requirements,optional" form:"requirements,optional" gorm:"column:requirements"`                   // 报名要求
	Equipment      *string            `json:"equipment,optional" form:"equipment,optional" gorm:"column:equipment"`                            // 所需装备
	SortOrder      int32              `json:"sortOrder,optional" form:"sortOrder,optional" gorm:"column:sort_order;not null"`                  // 排序号
	Status         int32              `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`                  // 状态:0下架 1上架
	CreatedAt      time.Time          `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`                  // 创建时间
	UpdatedAt      time.Time          `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`                  // 更新时间
}

func (*Course) TableName() string {
	return "course"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Course) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
