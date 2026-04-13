package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// SysOperationLog 操作日志表
type SysOperationLog struct {
	Id            int64     `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`       // 主键ID
	UserId        int64     `json:"userId,optional" form:"userId,optional" gorm:"column:user_id;not null"`            // 操作用户ID
	Username      string    `json:"username,optional" form:"username,optional" gorm:"column:username;not null"`       // 操作用户名
	Module        string    `json:"module,optional" form:"module,optional" gorm:"column:module;not null"`             // 操作模块
	Action        string    `json:"action,optional" form:"action,optional" gorm:"column:action;not null"`             // 操作动作
	RequestMethod *string   `json:"requestMethod,optional" form:"requestMethod,optional" gorm:"column:request_method"` // 请求方法
	RequestUrl    *string   `json:"requestUrl,optional" form:"requestUrl,optional" gorm:"column:request_url"`         // 请求URL
	RequestParams *string   `json:"requestParams,optional" form:"requestParams,optional" gorm:"column:request_params"` // 请求参数
	ResponseData  *string   `json:"responseData,optional" form:"responseData,optional" gorm:"column:response_data"`   // 响应数据
	Ip            *string   `json:"ip,optional" form:"ip,optional" gorm:"column:ip"`                                  // 操作IP
	UserAgent     *string   `json:"userAgent,optional" form:"userAgent,optional" gorm:"column:user_agent"`            // 浏览器UA
	ExecuteTime   *int32    `json:"executeTime,optional" form:"executeTime,optional" gorm:"column:execute_time"`      // 执行时长(ms)
	Status        int32     `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`   // 状态:0失败 1成功
	ErrorMsg      *string   `json:"errorMsg,optional" form:"errorMsg,optional" gorm:"column:error_msg"`               // 错误信息
	CreatedAt     time.Time `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`   // 创建时间
}

func (*SysOperationLog) TableName() string {
	return "sys_operation_log"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *SysOperationLog) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
