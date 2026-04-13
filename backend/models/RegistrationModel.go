package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// Registration 报名表
type Registration struct {
	Id               int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	RegistrationNo   string     `json:"registrationNo,optional" form:"registrationNo,optional" gorm:"column:registration_no;not null"` // 报名编号
	StudentName      string     `json:"studentName,optional" form:"studentName,optional" gorm:"column:student_name;not null"` // 学员姓名
	Gender           int32      `json:"gender,optional" form:"gender,optional" gorm:"column:gender;not null;default:1"`   // 性别:1男 2女
	BirthDate        time.Time  `json:"birthDate,optional" form:"birthDate,optional" gorm:"column:birth_date;not null"`   // 出生日期
	ParentName       string     `json:"parentName,optional" form:"parentName,optional" gorm:"column:parent_name;not null"` // 家长姓名
	ParentPhone      string     `json:"parentPhone,optional" form:"parentPhone,optional" gorm:"column:parent_phone;not null"` // 家长电话
	Wechat           *string    `json:"wechat,optional" form:"wechat,optional" gorm:"column:wechat"`                      // 微信号
	IntendedCourseId *int64     `json:"intendedCourseId,optional" form:"intendedCourseId,optional" gorm:"column:intended_course_id"` // 意向课程ID
	IntendedAgeGroup *string    `json:"intendedAgeGroup,optional" form:"intendedAgeGroup,optional" gorm:"column:intended_age_group"` // 意向年龄段
	Experience       *string    `json:"experience,optional" form:"experience,optional" gorm:"column:experience"`          // 足球经历
	Expectations     *string    `json:"expectations,optional" form:"expectations,optional" gorm:"column:expectations"`    // 培训期望
	Source           *string    `json:"source,optional" form:"source,optional" gorm:"column:source"`                      // 了解渠道
	Status           int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:1未处理 2已联系 3已报名 4已拒绝
	Remarks          *string    `json:"remarks,optional" form:"remarks,optional" gorm:"column:remarks"`                   // 备注
	HandledBy        *int64     `json:"handledBy,optional" form:"handledBy,optional" gorm:"column:handled_by"`            // 处理人ID
	HandledAt        *time.Time `json:"handledAt,optional" form:"handledAt,optional" gorm:"column:handled_at"`            // 处理时间
	StudentId        *int64     `json:"studentId,optional" form:"studentId,optional" gorm:"column:student_id"`            // 转为正式学员后的ID
	CreatedAt        time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
	UpdatedAt        time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`   // 更新时间
}

func (*Registration) TableName() string {
	return "registration"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Registration) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
