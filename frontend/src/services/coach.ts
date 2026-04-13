import request from '@/utils/request';

// 教练信息表 (coach)
export interface Coach {
  id?: string;
  name: string;
  avatar?: string;
  gender: 1 | 2; // 1男 2女
  phone?: string;
  email?: string;
  birthDate?: string;
  workYears: number; // 执教年限
  bio?: string; // 个人简介
  careerHistory?: CareerHistory[]; // 执教履历
  certificates?: Certificate[]; // 资质证书
  specialties?: string[]; // 专项擅长:启蒙/体能/战术/门将等
  ageGroups?: string[]; // 适合年龄段:U6/U8/U10/U12等
  teachingFeatures?: string; // 教学特色
  sortOrder: number;
  status: 0 | 1; // 0禁用 1启用
  createdAt?: string;
  updatedAt?: string;
}

export interface CareerHistory {
  period: string;
  team: string;
  position: string;
  achievements?: string;
}

export interface Certificate {
  name: string;
  issuingAuthority: string;
  issueDate?: string;
  certificateNo?: string;
  image?: string;
}

export interface CoachListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: number;
  specialty?: string;
}

// 获取教练列表
export const getCoachList = (params: CoachListParams) => {
  return request('/api/v1/coach', {
    method: 'GET',
    params,
  });
};

// 获取教练详情
export const getCoachDetail = (id: string) => {
  return request(`/api/v1/coach/${id}`, {
    method: 'GET',
  });
};

// 创建教练
export const createCoach = (data: Coach) => {
  return request('/api/v1/coach', {
    method: 'POST',
    data,
  });
};

// 更新教练
export const updateCoach = (id: string, data: Coach) => {
  return request(`/api/v1/coach/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除教练
export const deleteCoach = (id: string) => {
  return request(`/api/v1/coach/${id}`, {
    method: 'DELETE',
  });
};

// 更新教练排序
export const updateCoachSort = (id: string, sortOrder: number) => {
  return request(`/api/coach/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};

// 切换教练状态
export const toggleCoachStatus = (id: string, status: number) => {
  return request(`/api/coach/status/${id}`, {
    method: 'PUT',
    data: { status },
  });
};
