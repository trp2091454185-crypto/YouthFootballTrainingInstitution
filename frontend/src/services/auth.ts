import request from '@/utils/request';
import type { UserInfo } from '@/utils/auth';

// ==================== 类型定义 ====================
export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginResp {
    accessToken: string;
    refreshToken: string;
    expireIn: number;
    userInfo: UserInfo;
}

// ==================== API 方法 ====================

/** 登录 */
export const authLogin = (data: LoginReq) => {
    return request<LoginResp>('/api/v1/auth/login', {
        method: 'POST',
        data,
    });
};

/** 刷新 Token */
export const authRefresh = (refreshToken: string) => {
    return request('/api/v1/auth/refresh', {
        method: 'POST',
        data: { refreshToken },
    });
};

/** 登出 */
export const authLogout = () => {
    return request('/api/v1/auth/logout', {
        method: 'POST',
    });
};

/** 获取当前用户信息 */
export const authGetCurrentUser = () => {
    return request<UserInfo>('/api/v1/auth/currentUser');
};
