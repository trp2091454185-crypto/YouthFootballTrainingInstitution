// 获取token
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// 设置token
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// 删除token
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// 获取用户信息
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

// 设置用户信息
export const setUserInfo = (userInfo: any): void => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

// 删除用户信息
export const removeUserInfo = (): void => {
  localStorage.removeItem('userInfo');
};

// 清空所有认证信息
export const clearAuth = (): void => {
  removeToken();
  removeUserInfo();
};
