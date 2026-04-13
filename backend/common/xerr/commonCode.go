package xerr

var codes = make(map[uint32]string)

var (
	// 全局错误码
	SERVER_COMMON_ERROR                 = Register(100001, "服务器开小差啦,稍后再来试一试")
	REUQEST_PARAM_ERROR                 = Register(100002, "参数错误")
	TOKEN_EXPIRE_ERROR                  = Register(100003, "token失效，请重新登陆")
	TOKEN_GENERATE_ERROR                = Register(100004, "生成token失败")
	DB_ERROR                            = Register(100005, "数据库繁忙,请稍后再试")
	DB_RECORD_NOT_FOUND                 = Register(100006, "未查询到相关记录")
	DB_UPDATE_AFFECTED_ZERO_ERROR       = Register(100007, "更新数据影响行数为0")
	CACHE_ERROR                         = Register(100008, "读取或写入缓存失败，请稍后再试")
	UNAUTHENTICATED_ERROR               = Register(100009, "您无权访问该数据，请先登录")
	UNAUTHORIZED_TOKENTIMEOUT_ERROR     = Register(100010, "鉴权失败，Token超时")
	UNAUTHORIZED_TOKEN_INVALIDATE_ERROR = Register(100011, "Token校验失败")
	UNAUTHORIZED_TOKEN_NOT_EXIST        = Register(100012, "Token不存在")
	CANNOT_GET_USER_INFO_ERROR          = Register(100013, "获取用户信息失败")
	RPC_PARAMS_NOT_ALLOW_ZERO           = Register(100014, "参数不能为空")
	PERMISSION_NOT_ALLOW                = Register(100015, "您没有访问权限")
	JSON_UNMARSHAL_ERROR                = Register(100016, "JSON解析失败")
	FILTER_SENSITIVE_ERROR              = Register(100017, "系统检测到敏感词，请删除相关词语后再提交")
	REQUEST_PARAM_ERROR_CODE            = Register(100018, "读取请求体失败")
	USER_NOT_LOGIN                      = Register(100019, "用户未登录")
	PASSWORD_EXPIRED                    = Register(100020, "密码已过期，请修改密码")
	USER_NOT_REGISTER_BY_MOBILE         = Register(120009, "该手机号未注册,请检查输入是否正确")

	// 管理员用户模块错误码
	ADMIN_LOGIN_LACK_CAPTCH_ERROR        = Register(101001, "缺少验证码")
	ADMIN_LOGIN_EXPIRE_CAPTCHA_ERROR     = Register(101002, "验证码已过期")
	ADMIN_LOGIN_VERIFY_CAPTCHA_ERROR     = Register(101003, "验证码不正确")
	ADMIN_LOGIN_PHONE_NOT_USER_ERROR     = Register(101004, "用户名和密码不能为空")
	ADMIN_LOGIN_VERIFY_PWD_OR_NAME_ERROR = Register(101005, "用户名或密码错误")
	ADMIN_LOGIN_GET_TOKEN_ERROR          = Register(101006, "获取token失败")
	REGISTER_PASSWORD_NOT_SAME           = Register(101007, "两次密码输入不一致")
	REGISTER_USERNAME_OR_MOBILE_REPEAT   = Register(101008, "用户名或手机号码已注册")
	REGISTER_PHONE_NOT_OPEN_ERROR        = Register(101009, "手机号码未开通权限，请在该系统中添加管理员后登录")
	REGISTER_USERNAME_NOT_OPEN_ERROR     = Register(101010, "用户未开通权限，请在该系统中添加管理员后登录")

	TOKEN_INVALIDATE_ERROR    = Register(101010, "invalid_token")
	SEND_SMS_OVER_LIMIT_ERROR = Register(101011, "短信接收次数超出限制")

	REGISTER_USBKEY_USER_ERROR = Register(101012, "USBKEY用户无权限，请联系系统管理员 ")
	// 用户模块
	LOGIN_WITHOUT_CHALLENGE      = Register(102001, "缺少challenge参数")
	LOGIN_WITHOUT_MOBILE_OR_CODE = Register(102002, "缺少手机号码或验证码")
	LOGIN_SENDSMS_TARGET_IS_NULL = Register(102003, "手机号码为空或格式不正确")
	LOGIN_SENDSMS_ERROR          = Register(102004, "发送短信失败")
	LOGIN_CODE_INVALIDATE        = Register(102005, "验证码不正确")
	LOGIN_SUBJECT_NOT_MATCH      = Register(102006, "'subject' 和之前的授权数据不一致")
	CONSENT_WITHOUT_PARAMS       = Register(102007, "缺少请求参数")
	LOGOUT_WITHOUT_PARAMS        = Register(102007, "缺少请求参数")
	USER_MOBILE_ALREADR_EXIST    = Register(102008, "手机号码已注册")
	LOGIN_TYPE_NOT_SUPPORT       = Register(102009, "不支持的登录类型")

	// OAuth2模块
	OAUTH2_NO_AUTHENTICATION_SESSION_FOUND    = Register(103001, "找不到已登录的会话")
	OAUTH2_HINT_DOES_NOT_MATCH_AUTHENTICATION = Register(103002, "hint中的实体和session中的实体不一致")
	OAUTH2_ABORT_OAUTH2_REQUEST               = Register(103003, "OAuth 2.0 授权请求必须终止")
	OAUTH2_NO_PREVIOUS_CONSENT_FOUND          = Register(103004, "未找到之前的授权记录")

	// 客户端模块
	CLIENT_TENANT_ALREADY_OWN = Register(104001, "租户已拥有该应用")

	// 微信模块
	WECHAT_OPENID_ALREADY_BIND   = Register(105001, "OpenID已被绑定")
	WECHAT_ACCOUNT_ALREADR_BIND  = Register(105002, "账户已绑定OpenID")
	WECHAT_GET_OPENID_FAIL       = Register(105003, "获取OpenID失败")
	WECHAT_GET_BIND_ACCOUNT_FAIL = Register(105004, "暂未找到账户，请先去注册")

	// 企业微信微信模块
	WECOM_GETTOKEN_ERROR              = Register(106001, "获取token失败")
	WECOM_TOKEN_EXPIRE_ERROR          = Register(106002, "token失效,请重新获取")
	WECOM_GETUSERINFO_ERROR           = Register(106003, "获取用户信息失败")
	WECOM_GETUSERINFO_BY_USERID_ERROR = Register(106004, "获取登录用户信息失败")
	WECOM_GETUSERINFO_BY_CODE_ERROR   = Register(106005, "根据code获取登录用户信息失败")

	// 维修模块
	ORDER_ALREADY_HANDLED           = Register(106001, "工单已被受理")
	ORDER_STATUS_WAS_NOT_HANDLING   = Register(106002, "工单状态不是处理中，不可关闭")
	ORDER_STATUS_WAS_NOT_CLOSED     = Register(106002, "工单未关闭，不可评价")
	USER_HAS_NO_RIGHT               = Register(106003, "用户没有操作权限")
	USER_HAS_NO_RIGHT_TO_DESTRIBUTE = Register(106004, "用户没有权限分发给指定群组")

	// 用户模块
	USER_NOT_REGISTER               = Register(107001, "用户未认证")
	USER_TYPE_NOT_EXIST             = Register(107002, "用户类型不正确")
	USER_NOT_EXIST                  = Register(107003, "用户名或密码不正确")
	USERID_PASSWORD_CAPTCHA_EMPTY   = Register(107004, "缺少参数")
	INVALID_PARAMS                  = Register(107005, "参数有误")
	UPDATE_PASSWORD_ERR             = Register(107006, "只能修改自己账号的密码")
	RESET_PASSWORD_ERR              = Register(107007, "无权修改密码")
	USER_HAVE_NO_RIGHT              = Register(107008, "您的角色，无权访问此接口")
	TOURIST_USER_OLD_PASSWORD_ERROR = Register(107009, "旧密码验证失败")
	TOURIST_USER_PASSWORD_ERROR     = Register(107010, "密码错误")

	// 系统模块
	CAPTCHA_EXPIRE_ERROR        = Register(108001, "验证码已过期")
	ILLEGAL_CAPTCHA_KEY         = Register(108002, "非法的验证码key")
	ILLEGAL_CAPTCHA_PARAMS      = Register(108003, "非法的验证码")
	CAPTCHA_VALUE_ERROR         = Register(108004, "人机验证失败")
	LOGIN_WITHOUT_CAPTCHA_ERROR = Register(108005, "请先进行人机验证")
	USERNAME_OR_PWD_NOT_EXIST   = Register(108006, "用户名或密码不正确")
	ONLY_SUPPORT_USBKEY_LOGIN   = Register(108007, "用户仅支持usbkey方式登录")

	// 审批任务模块
	APPROVAL_TASK_TITIE_EMPTY         = Register(109001, "申请标题不能为空")
	APPROVAL_TASK_REASON_EMPTY        = Register(109002, "申请原因不能为空")
	APPROVAL_TASK_TYPE_ERROR          = Register(109003, "不支持的业务类型")
	APPROVAL_TASK_PENDING_EXIST_ERROR = Register(109004, "已有待审核的任务，请审核结束后再提交")
	APPROVAL_TASK_ONLINE_ERROR        = Register(109005, "未经过审核，不能上线")
	APPROVAL_TASK_REJECT_ERROR        = Register(109006, "审核被拒绝，不能上线")

	// 目的地模块
	DESTINATION_ALREADY_EXIST = Register(110001, "该目的地已存在")

	// 积分模块
	POINTS_ITEM_NOT_EXIST              = Register(120001, "商品不存在")
	POINTS_ITEM_NOT_IN_EXCHANGE_PERIOD = Register(120002, "商品不在兑换期内")
	POINTS_ITEM_EXCHANGED_OVER         = Register(120003, "商品兑换已达上限，请选择其他商品")
	POINTS_ITEM_POINTS_NOT_ENOUGH      = Register(120004, "用户积分不足，无法兑换此商品")
	POINTS_ITEM_RECEIPTED              = Register(120005, "商品已收货")
	POINTS_ITEM_NOT_RECEIPTED          = Register(120006, "商品未发货")
	POINTS_ITEM_RECEIPTED_OVER         = Register(120007, "商品已发货")
	POINTS_ITEM_NOT_ENOUGH             = Register(120008, "积分不足，无法转让")
	POINTS_ITEM_TRANSFER_SELF          = Register(120009, "无法转让给自己")
	// 反馈模块
	FEEDBACK_HANDLE_NO_RIGHT = Register(130001, "无权处理该反馈信息")

	//dfs

	DFS_FILE_NOT_FOUND = Register(140001, "文件没有发现")
)

func Register(errCode uint32, errMsg string) *CodeError {
	codes[errCode] = errMsg
	return NewErrCodeMsg(errCode, errMsg)
}

func IsCodeErr(errCode uint32) bool {
	_, o := codes[errCode]

	return o
}
