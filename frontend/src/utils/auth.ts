// ==================== AccessToken (访问令牌, 2h有效) ====================
export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
};

export const removeAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};

// ==================== RefreshToken (刷新令牌, 7d有效) ====================
export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (token: string): void => {
    localStorage.setItem('refreshToken', token);
};

export const removeRefreshToken = (): void => {
    localStorage.removeItem('refreshToken');
};

// ==================== 向后兼容的别名 ====================
/** @deprecated 请使用 getAccessToken */
export const getToken = getAccessToken;
/** @deprecated 请使用 setAccessToken */
export const setToken = setAccessToken;
/** @deprecated 请使用 removeAccessToken */
export const removeToken = removeAccessToken;

// ==================== 用户信息 ====================
export interface UserInfo {
    id: number;
    username: string;
    role: number; // 1=管理员, 2=超级管理员
    roleName: string;
}

export const getUserInfo = (): UserInfo | null => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

export const setUserInfo = (userInfo: UserInfo): void => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const removeUserInfo = (): void => {
    localStorage.removeItem('userInfo');
};

// ==================== 清空所有认证信息 ====================
export const clearAuth = (): void => {
    removeAccessToken();
    removeRefreshToken();
    removeUserInfo();
};

// ==================== 判断是否已登录 ====================
export const isAuthenticated = (): boolean => {
    return !!getAccessToken() && !!getRefreshToken();
};
