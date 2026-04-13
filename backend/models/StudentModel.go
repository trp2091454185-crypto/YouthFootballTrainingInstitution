package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// Student 学员信息表
type Student struct {
	Id               int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                           // 主键ID
	StudentNo        string    `json:"studentNo,optional" form:"studentNo,optional" gorm:"column:student_no;not null"`                      // 学员编号
	Name             string    `json:"name,optional" form:"name,optional" gorm:"column:name;not null"`                                      // 学员姓名
	Avatar           *string   `json:"avatar,optional" form:"avatar,optional" gorm:"column:avatar;default:''"`                              // 头像
	Gender           int32     `json:"gender,optional" form:"gender,optional" gorm:"column:gender;not null;default:1"`                      // 性别:1男 2女
	BirthDate        time.Time `json:"birthDate,optional" form:"birthDate,optional" gorm:"column:birth_date;not null"`                      // 出生日期
	Age              *int32    `json:"age,optional" form:"age,optional" gorm:"column:age"`                                                  // 年龄(由应用层计算)
	IdCard           *string   `json:"idCard,optional" form:"idCard,optional" gorm:"column:id_card"`                                        // 身份证号
	School           *string   `json:"school,optional" form:"school,optional" gorm:"column:school"`                                         // 就读学校
	Grade            *string   `json:"grade,optional" form:"grade,optional" gorm:"column:grade"`                                            // 年级
	EmergencyContact string    `json:"emergencyContact,optional" form:"emergencyContact,optional" gorm:"column:emergency_contact;not null"` // 紧急联系人
	EmergencyPhone   string    `json:"emergencyPhone,optional" form:"emergencyPhone,optional" gorm:"column:emergency_phone;not null"`       // 紧急联系电话
	Phone            string    `json:"phone,optional" form:"phone,optional" gorm:"column:phone;not null"`                                   // 联系电话
	Relation         *string   `json:"relation,optional" form:"relation,optional" gorm:"column:relation"`                                   // 与学员关系
	Address          *string   `json:"address,optional" form:"address,optional" gorm:"column:address"`                                      // 家庭住址
	Position         *string   `json:"position,optional" form:"position,optional" gorm:"column:position"`                                   // 培养方向
	MedicalNotes     *string   `json:"medicalNotes,optional" form:"medicalNotes,optional" gorm:"column:medical_notes"`                      // 医疗注意事项
	FootSize         *float64  `json:"footSize,optional" form:"footSize,optional" gorm:"column:foot_size"`                                  // 鞋码
	Height           *float64  `json:"height,optional" form:"height,optional" gorm:"column:height"`                                         // 身高(cm)
	Weight           *float64  `json:"weight,optional" form:"weight,optional" gorm:"column:weight"`                                         // 体重(kg)
	JoinDate         time.Time `json:"joinDate,optional" form:"joinDate,optional" gorm:"column:join_date;not null"`                         // 入训日期
	Status           int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null"`                                // 状态:1在读 2结业 3休学 4退学
	Remarks          *string   `json:"remarks,optional" form:"remarks,optional" gorm:"column:remarks"`                                      // 备注
	CreatedAt        time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`                      // 创建时间
	UpdatedAt        time.Time `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`                      // 更新时间
}

func (*Student) TableName() string {
	return "student"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Student) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
