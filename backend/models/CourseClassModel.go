package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// CourseClass 班级表
type CourseClass struct {
	Id               int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                     // 主键ID
	CourseId         int64      `json:"courseId,optional" form:"courseId,optional" gorm:"column:course_id;not null"`                   // 课程ID
	Name             string     `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                                 // 班级名称
	Code             *string    `json:"code,optional" form:"code,optional" gorm:"column:code"`                                          // 班级编码
	CoachId          *int64     `json:"coachId,optional" form:"coachId,optional" gorm:"column:coach_id"`                                // 主教练ID
	AssistantCoachId *int64     `json:"assistantCoachId,optional" form:"assistantCoachId,optional" gorm:"column:assistant_coach_id"`    // 助教ID
	Venue            *string    `json:"venue,optional" form:"venue,optional" gorm:"column:venue"`                                       // 上课场地
	ScheduleDesc     *string    `json:"scheduleDesc,optional" form:"scheduleDesc,optional" gorm:"column:schedule_desc"`               // 上课时间描述
	StartDate        *time.Time `json:"startDate,optional" form:"startDate,optional" gorm:"column:start_date"`                          // 开课日期
	EndDate          *time.Time `json:"endDate,optional" form:"endDate,optional" gorm:"column:end_date"`                                // 结课日期
	MaxStudents      int32      `json:"maxStudents,optional" form:"maxStudents,optional" gorm:"column:max_students;not null;default:20"` // 最大学员数
	CurrentStudents  int32      `json:"currentStudents,optional" form:"currentStudents,optional" gorm:"column:current_students;not null"` // 当前学员数
	Status           int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`                 // 状态:0已结课 1招生中 2开课中
	CreatedAt        time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`                 // 创建时间
	UpdatedAt        time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`                 // 更新时间
}

func (*CourseClass) TableName() string {
	return "course_class"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *CourseClass) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
