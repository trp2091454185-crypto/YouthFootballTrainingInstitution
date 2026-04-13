import request from '@/utils/request';

// 管理员账户表 (sys_user)
export interface SysUser {
  id?: string;
  username: string;
  password?: string;
  phone?: string;
  email?: string;
  role: 1 | 2; // 1管理员 2超级管理员
  status: 0 | 1; // 0禁用 1启用
  lastLoginTime?: string;
  lastLoginIp?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 系统配置表 (sys_config)
export interface SysConfig {
  id?: string;
  configKey: string;
  configValue?: string;
  configDesc?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 操作日志表 (sys_operation_log)
export interface SysOperationLog {
  id?: string;
  userId: string;
  username: string;
  module: string;
  action: string;
  requestMethod?: string;
  requestUrl?: string;
  requestParams?: any;
  responseData?: any;
  ip?: string;
  userAgent?: string;
  executeTime?: number; // 执行时长ms
  status: 0 | 1; // 0失败 1成功
  errorMsg?: string;
  createdAt?: string;
}

export interface SysUserListParams {
  current?: number;
  pageSize?: number;
  username?: string;
  role?: number;
  status?: number;
}

export interface SysLogListParams {
  current?: number;
  pageSize?: number;
  username?: string;
  module?: string;
  status?: number;
  startDate?: string;
  endDate?: string;
}

// ==================== 认证 API ====================

// 登录
export const login = (data: { username: string; password: string }) => {
  return request('/api/auth/login', {
    method: 'POST',
    data,
  });
};

// 登出
export const logout = () => {
  return request('/api/auth/logout', {
    method: 'POST',
  });
};

// 获取当前登录用户信息
export const getCurrentUser = () => {
  return request('/api/auth/current-user', {
    method: 'GET',
  });
};

// 修改密码
export const changePassword = (data: { oldPassword: string; newPassword: string }) => {
  return request('/api/auth/change-password', {
    method: 'PUT',
    data,
  });
};

// ==================== 用户管理 API ====================

// 获取用户列表
export const getUserList = (params: SysUserListParams) => {
  return request('/api/system/user/list', {
    method: 'GET',
    params,
  });
};

// 获取用户详情
export const getUserDetail = (id: string) => {
  return request(`/api/system/user/detail/${id}`, {
    method: 'GET',
  });
};

// 创建用户
export const createUser = (data: SysUser) => {
  return request('/api/system/user/create', {
    method: 'POST',
    data,
  });
};

// 更新用户
export const updateUser = (id: string, data: SysUser) => {
  return request(`/api/system/user/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除用户
export const deleteUser = (id: string) => {
  return request(`/api/system/user/delete/${id}`, {
    method: 'DELETE',
  });
};

// 重置密码
export const resetPassword = (id: string, newPassword: string) => {
  return request(`/api/system/user/reset-password/${id}`, {
    method: 'PUT',
    data: { newPassword },
  });
};

// 切换用户状态
export const toggleUserStatus = (id: string, status: number) => {
  return request(`/api/system/user/status/${id}`, {
    method: 'PUT',
    data: { status },
  });
};

// ==================== 系统配置 API ====================

// 获取系统配置列表
export const getConfigList = () => {
  return request('/api/system/config/list', {
    method: 'GET',
  });
};

// 获取单个配置
export const getConfig = (key: string) => {
  return request(`/api/system/config/${key}`, {
    method: 'GET',
  });
};

// 更新配置
export const updateConfig = (key: string, value: string) => {
  return request(`/api/system/config/${key}`, {
    method: 'PUT',
    data: { configValue: value },
  });
};

// 批量更新配置
export const batchUpdateConfig = (data: Record<string, string>) => {
  return request('/api/system/config/batch', {
    method: 'PUT',
    data,
  });
};

// ==================== 操作日志 API ====================

// 获取操作日志列表
export const getLogList = (params: SysLogListParams) => {
  return request('/api/system/log/list', {
    method: 'GET',
    params,
  });
};

// 获取操作日志详情
export const getLogDetail = (id: string) => {
  return request(`/api/system/log/detail/${id}`, {
    method: 'GET',
  });
};

// 清空日志
export const clearLogs = (params?: { endDate?: string }) => {
  return request('/api/system/log/clear', {
    method: 'DELETE',
    params,
  });
};
