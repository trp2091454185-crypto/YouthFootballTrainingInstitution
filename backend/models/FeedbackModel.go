package models

import (
	"server/common/tools/snowx"
	"time"

	"gorm.io/gorm"
)

// Feedback 反馈信息表
type Feedback struct {
	Id           int64      `json:"id,optional,string" form:"id,optional" gorm:"column:id" path:"id,optional"`                   // 主键ID
	FeedbackType int32      `json:"feedbackType,optional" form:"feedbackType,optional" gorm:"column:feedback_type;not null;default:1"` // 反馈类型:1咨询 2建议 3投诉 4其他
	ContactName  *string    `json:"contactName,optional" form:"contactName,optional" gorm:"column:contact_name"`                   // 联系人姓名
	ContactPhone *string    `json:"contactPhone,optional" form:"contactPhone,optional" gorm:"column:contact_phone"`                 // 联系人电话
	Content      string     `json:"content,optional" form:"content,optional" gorm:"column:content;not null"`                       // 反馈内容
	Images       *string    `json:"images,optional" form:"images,optional" gorm:"column:images"`                                   // 相关图片
	Status       int32      `json:"status,optional" form:"status,optional" gorm:"column:status;not null;default:1"`                // 状态:1未读 2已读 3已回复 4已解决
	ReplyContent *string    `json:"replyContent,optional" form:"replyContent,optional" gorm:"column:reply_content"`               // 回复内容
	RepliedBy    *int64     `json:"repliedBy,optional" form:"repliedBy,optional" gorm:"column:replied_by"`                         // 回复人ID
	RepliedAt    *time.Time `json:"repliedAt,optional" form:"repliedAt,optional" gorm:"column:replied_at"`                         // 回复时间
	CreatedAt    time.Time  `json:"createdAt,optional" form:"createdAt,optional" gorm:"column:created_at;not null"`                // 创建时间
	UpdatedAt    time.Time  `json:"updatedAt,optional" form:"updatedAt,optional" gorm:"column:updated_at;not null"`                // 更新时间
}

func (*Feedback) TableName() string {
	return "feedback"
}

// BeforeCreate 雪花ID创建钩子函数
func (t *Feedback) BeforeCreate(*gorm.DB) error {
	if t.Id == 0 {
		t.Id = snowx.Flake.GenerateFlakeId()
	}
	return nil
}
