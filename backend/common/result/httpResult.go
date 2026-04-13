package result

import (
	"context"
	"fmt"
	"net/http"

	"github.com/duke-git/lancet/v2/validator"

	"server/common/xerr"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/rest/httpx"
	"google.golang.org/grpc/status"
)

type PageParams struct {
	Current   int               `form:"current,default=1"`   // 页码
	PageSize  int               `form:"pageSize,default=10"` // 每页大小
	Sorter    map[string]string `form:"sorter,optional"`     // 排序
	Keyword   string            `form:"keyword,optional"`    // 搜索关键字
	Preloader []string          `form:"preloader,optional"`  // 关联
}
type DistanceParams struct {
	Lat           float64 `form:"lat,optional"`           // 距离查询字段
	Lon           float64 `form:"lon,optional"`           // 距离查询字段
	DistanceRange float64 `form:"distanceRange,optional"` // 范围查询
}
type PageResult struct {
	List     interface{} `json:"list"`
	Total    int64       `json:"total"`
	Current  int         `json:"current"`
	PageSize int         `json:"pageSize"`
	Pages    int64       `json:"pages"`
	Offset   int         `json:"offset"`
}

// HttpResult http返回
func HttpResult(r *http.Request, w http.ResponseWriter, resp interface{}, err error) {
	var code int
	ctx := r.Context()

	if err == nil {
		//成功返回
		r := Success(resp)
		code = http.StatusOK

		httpx.WriteJson(w, code, r)
	} else {
		//错误返回
		errCode := xerr.SERVER_COMMON_ERROR.GetErrCode()
		errMsg := "服务器开小差啦，稍后再来试一试 : " + err.Error()

		causeErr := errors.Cause(err)
		// err类型
		if e, ok := causeErr.(*xerr.CodeError); ok {
			//自定义错误类型
			errCode = e.GetErrCode()
			errMsg = e.GetErrMsg()
		} else if err.Error() != "" && validator.ContainChinese(err.Error()) {
			errMsg = err.Error()
		} else {
			// grpc err错误
			if gStatus, ok := status.FromError(causeErr); ok {
				grpcCode := uint32(gStatus.Code())

				//区分自定义错误跟系统底层、db等错误，底层、db错误不能返回给前端
				if xerr.IsCodeErr(grpcCode) {
					errCode = grpcCode
					errMsg = gStatus.Message()
				}
			}
		}

		code = http.StatusBadRequest
		ctx = context.WithValue(ctx, "error", err)

		logx.WithContext(r.Context()).Errorf("[API-ERR] : %+v ", err)
		httpx.WriteJson(w, code, Error(errCode, errMsg))
	}

	ctx = context.WithValue(ctx, "code", code)
	*r = *r.WithContext(ctx)
}

func FailWithStatusCode(w http.ResponseWriter, status int, err *xerr.CodeError) {
	httpx.WriteJson(w, status, map[string]interface{}{
		"data":         map[string]interface{}{},
		"success":      false,
		"code":         err.GetErrCode(),
		"errorMessage": err.GetErrMsg(),
	})
}

// ParamErrorResult http 参数错误返回
func ParamErrorResult(r *http.Request, w http.ResponseWriter, err error) {
	errMsg := fmt.Sprintf("%s ,%s", xerr.REUQEST_PARAM_ERROR.GetErrMsg(), err.Error())
	httpx.WriteJson(w, http.StatusBadRequest, Error(xerr.REUQEST_PARAM_ERROR.GetErrCode(), errMsg))
}
