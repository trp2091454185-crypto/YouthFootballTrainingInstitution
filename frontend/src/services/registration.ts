import request from '@/utils/request';

// 报名表 (registration)
export interface Registration {
  id?: string;
  registrationNo: string;
  studentName: string;
  gender: 1 | 2; // 1男 2女
  birthDate: string;
  parentName: string;
  parentPhone: string;
  wechat?: string;
  intendedCourseId?: string;
  intendedAgeGroup?: string; // 意向年龄段
  experience?: string; // 足球经历
  expectations?: string; // 培训期望
  source?: string; // 了解渠道
  status: 1 | 2 | 3 | 4; // 1未处理 2已联系 3已报名 4已拒绝
  remarks?: string;
  handledBy?: string;
  handledAt?: string;
  studentId?: string; // 转为正式学员后的ID
  createdAt?: string;
  updatedAt?: string;
  // 关联数据
  intendedCourseName?: string;
}

export interface RegistrationListParams {
  current?: number;
  pageSize?: number;
  studentName?: string;
  parentPhone?: string;
  status?: number;
  source?: string;
  startDate?: string;
  endDate?: string;
}

export interface RegistrationStatistics {
  total: number;
  pending: number; // 未处理
  contacted: number; // 已联系
  enrolled: number; // 已报名
  rejected: number; // 已拒绝
}

// 获取报名列表
export const getRegistrationList = (params: RegistrationListParams) => {
  return request('/api/v1/registration', {
    method: 'GET',
    params,
  });
};

// 获取报名详情
export const getRegistrationDetail = (id: string) => {
  return request(`/api/v1/registration/${id}`, {
    method: 'GET',
  });
};

// 创建报名
export const createRegistration = (data: Registration) => {
  return request('/api/v1/registration', {
    method: 'POST',
    data,
  });
};

// 更新报名信息
export const updateRegistration = (id: string, data: Registration) => {
  return request(`/api/v1/registration/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除报名
export const deleteRegistration = (id: string) => {
  return request(`/api/v1/registration/${id}`, {
    method: 'DELETE',
  });
};

// 处理报名
export const handleRegistration = (id: string, data: { status: number; remarks?: string }) => {
  return request(`/api/registration/handle/${id}`, {
    method: 'PUT',
    data,
  });
};

// 转为正式学员
export const convertToStudent = (id: string) => {
  return request(`/api/registration/convert/${id}`, {
    method: 'POST',
  });
};

// 获取报名统计
export const getRegistrationStatistics = (params?: { startDate?: string; endDate?: string }) => {
  return request('/api/registration/statistics', {
    method: 'GET',
    params,
  });
};
