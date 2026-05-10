// Code scaffolded by goctl. Safe to edit.
// goctl 1.10.1

package auth

import (
	"context"
	"server/common/tools/password"
	"server/common/xerr"
	"server/gateway/internal/svc"
	"server/gateway/internal/types"
	"server/models"

	"github.com/zeromicro/go-zero/core/logx"
)

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LoginLogic {
	return &LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LoginLogic) Login(req *types.LoginReq) (*types.LoginResp, error) {
	// 1. 参数校验
	if req.Username == "" || req.Password == "" {
		return nil, xerr.ADMIN_LOGIN_PHONE_NOT_USER_ERROR
	}

	// 2. 查询用户
	var user models.SysUser
	if err := l.svcCtx.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		l.Errorf("登录失败: 用户不存在, username=%s, err=%v", req.Username, err)
		return nil, xerr.ADMIN_LOGIN_VERIFY_PWD_OR_NAME_ERROR
	}

	// 3. 验证密码 (SM3 哈希对比)
	if !password.VerifyStoredPassword(req.Password, user.Password) {
		l.Errorf("登录失败: 密码错误, username=%s", req.Username)
		return nil, xerr.ADMIN_LOGIN_VERIFY_PWD_OR_NAME_ERROR
	}

	// 4. 更新最后登录时间和IP (可选)
	loginIp := l.ctx.Value("remoteAddr")
	if loginIp == nil {
		loginIp = "unknown"
	}
	now := l.svcCtx.DB.NowFunc()
	l.svcCtx.DB.Model(&user).Updates(map[string]interface{}{
		"last_login_time": now,
		"last_login_ip":   loginIp.(string),
	})

	// 5. 签发 JWT 双 Token
	accessToken, refreshToken, err := l.svcCtx.JwtAuth.GenerateTokenPair(user.Id, user.Username, user.Role)
	if err != nil {
		l.Errorf("签发Token失败: userId=%d, err=%v", user.Id, err)
		return nil, xerr.TOKEN_GENERATE_ERROR
	}

	// 6. 构造角色名称
	roleName := "管理员"
	if user.Role == 2 {
		roleName = "家长"
	}
	if user.Role == 3 {
		roleName = "学员"
	}

	l.Infof("用户登录成功")

	return &types.LoginResp{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpireIn:     l.svcCtx.JwtAuth.AccessExpire,
		UserInfo: types.UserInfo{
			Id:       user.Id,
			Username: user.Username,
			Role:     user.Role,
			RoleName: roleName,
		},
	}, nil
}
