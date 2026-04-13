package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// StudentEnrollment 学员报班记录表
type StudentEnrollment struct {
	Id             int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	StudentId      int64      `json:"studentId,optional" form:"studentId,optional" gorm:"column:student_id;not null"`   // 学员ID
	CourseId       int64      `json:"courseId,optional" form:"courseId,optional" gorm:"column:course_id;not null"`      // 课程ID
	ClassId        int64      `json:"classId,optional" form:"classId,optional" gorm:"column:class_id;not null"`         // 班级ID
	EnrollDate     time.Time  `json:"enrollDate,optional" form:"enrollDate,optional" gorm:"column:enroll_date;not null"` // 报名日期
	ExpireDate     *time.Time `json:"expireDate,optional" form:"expireDate,optional" gorm:"column:expire_date"`         // 到期日期
	TotalHours     int32      `json:"totalHours,optional" form:"totalHours,optional" gorm:"column:total_hours;not null"` // 总课时
	RemainingHours int32      `json:"remainingHours,optional" form:"remainingHours,optional" gorm:"column:remaining_hours;not null"` // 剩余课时
	Amount         float64    `json:"amount,optional" form:"amount,optional" gorm:"column:amount;not null;default:0.00"` // 缴费金额
	Status         int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:1有效 2已转班 3已退班 4已结业
	CreatedAt      time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt      time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*StudentEnrollment) TableName() string {
	return "student_enrollment"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *StudentEnrollment) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
