package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// StudentGrowthRecord 学员成长档案表
type StudentGrowthRecord struct {
	Id          int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	StudentId   int64     `json:"studentId,optional" form:"studentId,optional" gorm:"column:student_id;not null"`   // 学员ID
	RecordType  int32     `json:"recordType,optional" form:"recordType,optional" gorm:"column:record_type;not null;default:1"` // 记录类型:1训练表现 2比赛记录 3体测数据 4获奖记录 5其他
	Title       string    `json:"title,optional" form:"title,optional" gorm:"column:title;not null"`                // 记录标题
	Content     *string   `json:"content,optional" form:"content,optional" gorm:"column:content"`                   // 详细内容
	Images      *string   `json:"images,optional" form:"images,optional" gorm:"column:images"`                      // 相关图片
	Videos      *string   `json:"videos,optional" form:"videos,optional" gorm:"column:videos"`                      // 相关视频
	RecordDate  time.Time `json:"recordDate,optional" form:"recordDate,optional" gorm:"column:record_date;not null"` // 记录日期
	CoachId     *int64    `json:"coachId,optional" form:"coachId,optional" gorm:"column:coach_id"`                  // 记录教练ID
	Tags        *string   `json:"tags,optional" form:"tags,optional" gorm:"column:tags"`                            // 标签
	IsHighlight int32     `json:"isHighlight,optional" form:"isHighlight,optional" gorm:"column:is_highlight;not null"` // 是否精选:0否 1是
	Status      int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0隐藏 1显示
	CreatedAt   time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt   time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*StudentGrowthRecord) TableName() string {
	return "student_growth_record"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *StudentGrowthRecord) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
