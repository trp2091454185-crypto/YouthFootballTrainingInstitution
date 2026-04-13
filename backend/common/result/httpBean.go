package result

type H map[string]interface{}

type ResponseSuccessBean struct {
	Code         uint32      `json:"code"`
	Data         interface{} `json:"data"`
	Success      bool        `json:"success"`
	ErrorMessage string      `json:"errorMessage"`
}
type NullJson struct{}

func Success(data interface{}) *ResponseSuccessBean {
	return &ResponseSuccessBean{200, data, true, "OK"}
}

type ResponseErrorBean struct {
	Code         uint32 `json:"code"`
	Success      bool   `json:"success"`
	ErrorMessage string `json:"errorMessage"`
}

func Error(errCode uint32, errMsg string) *ResponseErrorBean {
	return &ResponseErrorBean{errCode, false, errMsg}
}
