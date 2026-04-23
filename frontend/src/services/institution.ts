import request from '@/utils/request';

// 机构基本信息表 (institution_info)
export interface InstitutionInfo {
  id?: string;
  name: string;
  slogan?: string;
  logo?: string;
  description?: string;
  foundedDate?: string;
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  businessHours?: string;
  wechatQr?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 机构发展历程表 (institution_milestone)
export interface InstitutionMilestone {
  id?: string;
  title: string;
  content?: string;
  milestoneDate: string;
  image?: string;
  sortOrder: number;
  status: 0 | 1;
  createdAt?: string;
  updatedAt?: string;
}

// 场地设施表 (institution_facility)
export interface InstitutionFacility {
  id?: string;
  name: string;
  description?: string;
  images?: string[];
  features?: string[];
  sortOrder: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string;
}

// 荣誉奖项表 (institution_honor)
export interface InstitutionHonor {
  id?: string;
  title: string;
  description?: string;
  awardDate?: string;
  awardOrg?: string;
  image?: string;
  sortOrder: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== 机构基本信息 API ====================

// 获取机构信息
export const getInstitutionInfo = () => {
  return request('/api/institution/info', {
    method: 'GET',
  });
};

// 更新机构信息
export const updateInstitutionInfo = (data: InstitutionInfo) => {
  return request('/api/institution/info', {
    method: 'PUT',
    data,
  });
};

// ==================== 发展历程 API ====================

// 获取发展历程列表
export const getMilestoneList = (params?: { status?: number }) => {
  return request('/api/institution/milestone/list', {
    method: 'GET',
    params,
  });
};

// 创建发展历程
export const createMilestone = (data: InstitutionMilestone) => {
  return request('/api/institution/milestone/create', {
    method: 'POST',
    data,
  });
};

// 更新发展历程
export const updateMilestone = (id: string, data: InstitutionMilestone) => {
  return request(`/api/institution/milestone/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除发展历程
export const deleteMilestone = (id: string) => {
  return request(`/api/institution/milestone/delete/${id}`, {
    method: 'DELETE',
  });
};

// 更新发展历程排序
export const updateMilestoneSort = (id: string, sortOrder: number) => {
  return request(`/api/institution/milestone/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};

// ==================== 场地设施 API ====================

// 获取场地设施列表
export const getFacilityList = (params: any) => {
  return request('/api/v1/institution/facility', {
    method: 'GET',
    params,
  });
};

// 创建场地设施
export const createFacility = (data: InstitutionFacility) => {
  return request('/api/v1/institution/facility', {
    method: 'POST',
    data,
  });
};

// 更新场地设施
export const updateFacility = (id: string, data: InstitutionFacility) => {
  return request(`/api/v1/institution/facility/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除场地设施
export const deleteFacility = (id: string) => {
  return request(`/api/v1/institution/facility/${id}`, {
    method: 'DELETE',
  });
};

// 更新场地设施排序
export const updateFacilitySort = (id: string, sortOrder: number) => {
  return request(`/api/institution/facility/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};

// 荣誉奖项列表参数
export interface HonorListParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
}

// ==================== 荣誉奖项 API ====================

// 获取荣誉奖项列表
export const getHonorList = (params?: HonorListParams) => {
  return request('/api/v1/institution/honor', {
    method: 'GET',
    params,
  });
};

// 创建荣誉奖项
export const createHonor = (data: InstitutionHonor) => {
  return request('/api/v1/institution/honor', {
    method: 'POST',
    data,
  });
};

// 更新荣誉奖项
export const updateHonor = (id: string, data: InstitutionHonor) => {
  return request(`/api/v1/institution/honor/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除荣誉奖项
export const deleteHonor = (id: string) => {
  return request(`/api/v1/institution/honor/${id}`, {
    method: 'DELETE',
  });
};

// 更新荣誉奖项排序
export const updateHonorSort = (id: string, sortOrder: number) => {
  return request(`/api/institution/honor/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};
