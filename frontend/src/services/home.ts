import request from '@/utils/request';
import { CommonParams } from './common';

// 轮播图表 (banner)
export interface Banner {
  id?: string;
  title?: string;
  subtitle?: string;
  image: string;
  linkType: 1 | 2 | 3; // 1无链接 2内部页面 3外部链接
  linkUrl?: string;
  linkPage?: string;
  target?: '_self' | '_blank';
  sortOrder: number;
  status: number;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 核心优势表 (core_advantage)
export interface CoreAdvantage {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  sortOrder: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

// 快速入口表 (quick_entry)
export interface QuickEntry {
  id?: string;
  name: string;
  icon?: string;
  linkType: 1 | 2; // 1内部页面 2外部链接
  linkUrl?: string;
  linkPage?: string;
  sortOrder: number;
  status: 0 | 1;
  createdAt?: string;
  updatedAt?: string;
}


export interface AdvantageParms extends CommonParams {
  CoreAdvantage?: CoreAdvantage;
}

// ==================== 轮播图 API ====================

// 获取轮播图列表
export const getBannerList = (params?: { status?: number }) => {
  return request('/api/v1/banner', {
    method: 'GET',
    params,
  });
};

// 创建轮播图
export const createBanner = (data: Banner) => {
  return request('/api/v1/banner', {
    method: 'POST',
    data,
  });
};

// 更新轮播图
export const updateBanner = (id: string, data: Banner) => {
  return request(`/api/v1/banner/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除轮播图
export const deleteBanner = (id: string) => {
  return request(`/api/v1/banner/${id}`, {
    method: 'DELETE',
  });
};

// 更新轮播图排序
export const updateBannerSort = (id: string, sortOrder: number) => {
  return request(`/api/home/banner/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};

// ==================== 核心优势 API ====================

// 获取核心优势列表
export const getCoreAdvantageList = (params: AdvantageParms) => {
  return request('/api/v1/core/advantage', {
    method: 'GET',
    params,
  });
};

// 创建核心优势
export const createCoreAdvantage = (data: CoreAdvantage) => {
  return request('/api/v1/core/advantage', {
    method: 'POST',
    data,
  });
};

// 更新核心优势
export const updateCoreAdvantage = (id: string, data: CoreAdvantage) => {
  return request(`/api/v1/core/advantage/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除核心优势
export const deleteCoreAdvantage = (id: string) => {
  return request(`/api/v1/core/advantage/${id}`, {
    method: 'DELETE',
  });
};

// 更新核心优势排序
export const updateCoreAdvantageSort = (id: string, sortOrder: number) => {
  return request(`/api/home/core-advantage/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};

// ==================== 快速入口 API ====================

// 获取快速入口列表
export const getQuickEntryList = (params?: { status?: number }) => {
  return request('/api/home/quick-entry/list', {
    method: 'GET',
    params,
  });
};

// 创建快速入口
export const createQuickEntry = (data: QuickEntry) => {
  return request('/api/home/quick-entry/create', {
    method: 'POST',
    data,
  });
};

// 更新快速入口
export const updateQuickEntry = (id: string, data: QuickEntry) => {
  return request(`/api/home/quick-entry/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除快速入口
export const deleteQuickEntry = (id: string) => {
  return request(`/api/home/quick-entry/delete/${id}`, {
    method: 'DELETE',
  });
};

// 更新快速入口排序
export const updateQuickEntrySort = (id: string, sortOrder: number) => {
  return request(`/api/home/quick-entry/sort/${id}`, {
    method: 'PUT',
    data: { sortOrder },
  });
};
