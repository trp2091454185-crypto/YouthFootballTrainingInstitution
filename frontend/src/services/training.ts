import request from '@/utils/request';

export interface Training {
  id?: string;
  title: string;
  trainingDate: string;
  location: string;
  teamId?: string;
  content: string;
  status?: string;
  participants?: string[];
}

export interface TrainingListParams {
  current?: number;
  pageSize?: number;
  title?: string;
  teamId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// 获取训练列表
export const getTrainingList = (params: TrainingListParams) => {
  return request('/training/list', {
    method: 'GET',
    params,
  });
};

// 获取训练详情
export const getTrainingDetail = (id: string) => {
  return request(`/training/detail/${id}`, {
    method: 'GET',
  });
};

// 创建训练
export const createTraining = (data: Training) => {
  return request('/training/create', {
    method: 'POST',
    data,
  });
};

// 更新训练
export const updateTraining = (id: string, data: Training) => {
  return request(`/training/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除训练
export const deleteTraining = (id: string) => {
  return request(`/training/delete/${id}`, {
    method: 'DELETE',
  });
};
