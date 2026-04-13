package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// StudentAttendance 学员考勤记录表
type StudentAttendance struct {
	Id             int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	StudentId      int64      `json:"studentId,optional" form:"studentId,optional" gorm:"column:student_id;not null"`   // 学员ID
	ClassId        int64      `json:"classId,optional" form:"classId,optional" gorm:"column:class_id;not null"`         // 班级ID
	ScheduleId     *int64     `json:"scheduleId,optional" form:"scheduleId,optional" gorm:"column:schedule_id"`         // 排课ID
	AttendanceDate time.Time  `json:"attendanceDate,optional" form:"attendanceDate,optional" gorm:"column:attendance_date;not null"` // 考勤日期
	Status         int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:1出勤 2请假 3缺勤 4迟到
	CheckInTime    *time.Time `json:"checkInTime,optional" form:"checkInTime,optional" gorm:"column:check_in_time"`     // 签到时间
	CheckOutTime   *time.Time `json:"checkOutTime,optional" form:"checkOutTime,optional" gorm:"column:check_out_time"`  // 签退时间
	Notes          *string    `json:"notes,optional" form:"notes,optional" gorm:"column:notes"`                         // 备注
	CreatedBy      int64      `json:"createdBy,optional" form:"createdBy,optional" gorm:"column:created_by;not null"`   // 记录人ID
	CreatedAt      time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt      time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*StudentAttendance) TableName() string {
	return "student_attendance"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *StudentAttendance) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
