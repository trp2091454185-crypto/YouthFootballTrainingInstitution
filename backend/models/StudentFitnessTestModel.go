package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// StudentFitnessTest 学员体测数据表
type StudentFitnessTest struct {
	Id                int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	StudentId         int64     `json:"studentId,optional" form:"studentId,optional" gorm:"column:student_id;not null"`   // 学员ID
	TestDate          time.Time `json:"testDate,optional" form:"testDate,optional" gorm:"column:test_date;not null"`      // 测试日期
	Height            *float64  `json:"height,optional" form:"height,optional" gorm:"column:height"`                      // 身高(cm)
	Weight            *float64  `json:"weight,optional" form:"weight,optional" gorm:"column:weight"`                      // 体重(kg)
	Bmi               *float64  `json:"bmi,optional" form:"bmi,optional" gorm:"column:bmi"`                               // BMI指数(由应用层计算)
	VitalCapacity     *int32    `json:"vitalCapacity,optional" form:"vitalCapacity,optional" gorm:"column:vital_capacity"` // 肺活量(ml)
	SprintFiveHundred *float64  `json:"sprintFiveHundred,optional" form:"sprintFiveHundred,optional" gorm:"column:sprint_five_hundred"` // 50米跑(秒)
	SitAndReach       *float64  `json:"sitAndReach,optional" form:"sitAndReach,optional" gorm:"column:sit_and_reach"`     // 坐位体前屈(cm)
	StandingLongJump  *float64  `json:"standingLongJump,optional" form:"standingLongJump,optional" gorm:"column:standing_long_jump"` // 立定跳远(cm)
	SitUps            *int32    `json:"sitUps,optional" form:"sitUps,optional" gorm:"column:sit_ups"`                     // 仰卧起坐(次/分钟)
	EnduranceRun      *string   `json:"enduranceRun,optional" form:"enduranceRun,optional" gorm:"column:endurance_run"`   // 耐力跑成绩
	Dribbling         *float64  `json:"dribbling,optional" form:"dribbling,optional" gorm:"column:dribbling"`             // 带球绕桩(秒)
	PassingAccuracy   *float64  `json:"passingAccuracy,optional" form:"passingAccuracy,optional" gorm:"column:passing_accuracy"` // 传球准确率(%)
	ShootingAccuracy  *float64  `json:"shootingAccuracy,optional" form:"shootingAccuracy,optional" gorm:"column:shooting_accuracy"` // 射门准确率(%)
	CoachId           *int64    `json:"coachId,optional" form:"coachId,optional" gorm:"column:coach_id"`                  // 测试教练ID
	Remarks           *string   `json:"remarks,optional" form:"remarks,optional" gorm:"column:remarks"`                   // 备注
	CreatedAt         time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
}

func (*StudentFitnessTest) TableName() string {
	return "student_fitness_test"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *StudentFitnessTest) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
