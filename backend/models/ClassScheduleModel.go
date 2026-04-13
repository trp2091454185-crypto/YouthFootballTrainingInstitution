package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// ClassSchedule 班级排课表
type ClassSchedule struct {
	Id        int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	ClassId   int64     `json:"classId,optional" form:"classId,optional" gorm:"column:class_id;not null"`          // 班级ID
	Weekday   int32     `json:"weekday,optional" form:"weekday,optional" gorm:"column:weekday;not null"`           // 星期几:1-7
	StartTime time.Time `json:"startTime,optional" form:"startTime,optional" gorm:"column:start_time;not null"`    // 开始时间
	EndTime   time.Time `json:"endTime,optional" form:"endTime,optional" gorm:"column:end_time;not null"`          // 结束时间
	Status    int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`    // 状态:0停用 1启用
	CreatedAt time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`    // 创建时间
}

func (*ClassSchedule) TableName() string {
	return "class_schedule"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *ClassSchedule) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
