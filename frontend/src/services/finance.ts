import request from '@/utils/request';

export interface Finance {
  id?: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  relatedId?: string;
}

export interface FinanceListParams {
  current?: number;
  pageSize?: number;
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

// 获取财务列表
export const getFinanceList = (params: FinanceListParams) => {
  return request('/finance/list', {
    method: 'GET',
    params,
  });
};

// 获取财务详情
export const getFinanceDetail = (id: string) => {
  return request(`/finance/detail/${id}`, {
    method: 'GET',
  });
};

// 创建财务记录
export const createFinance = (data: Finance) => {
  return request('/finance/create', {
    method: 'POST',
    data,
  });
};

// 更新财务记录
export const updateFinance = (id: string, data: Finance) => {
  return request(`/finance/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除财务记录
export const deleteFinance = (id: string) => {
  return request(`/finance/delete/${id}`, {
    method: 'DELETE',
  });
};

// 获取财务统计
export const getFinanceStatistics = (params: { startDate?: string; endDate?: string }) => {
  return request('/finance/statistics', {
    method: 'GET',
    params,
  });
};

// 导出财务报表
export const exportFinanceReport = (params: FinanceListParams) => {
  return request('/finance/export', {
    method: 'GET',
    params,
    responseType: 'blob',
  });
};
