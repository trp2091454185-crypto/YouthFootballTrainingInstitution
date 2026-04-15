package types

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
)

// StringSlice JSON 数组类型，用于存储字符串数组到数据库 JSON 字段
type StringSlice []string

// Value 实现 driver.Valuer 接口，将 StringSlice 转为 JSON 字符串存入数据库
func (s StringSlice) Value() (driver.Value, error) {
	if s == nil {
		return "[]", nil
	}
	return json.Marshal(s)
}

// Scan 实现 sql.Scanner 接口，从数据库读取 JSON 字符串并解析为 StringSlice
func (s *StringSlice) Scan(value interface{}) error {
	if value == nil {
		*s = StringSlice{}
		return nil
	}

	var bytes []byte
	switch v := value.(type) {
	case []byte:
		bytes = v
	case string:
		bytes = []byte(v)
	default:
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(bytes, s)
}
