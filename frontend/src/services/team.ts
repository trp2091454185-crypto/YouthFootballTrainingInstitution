import request from '@/utils/request';

export interface Team {
  id?: string;
  name: string;
  level: string;
  coach: string;
  description?: string;
  status?: string;
}

export interface TeamListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  level?: string;
  status?: string;
}

// 获取球队列表
export const getTeamList = (params: TeamListParams) => {
  return request('/team/list', {
    method: 'GET',
    params,
  });
};

// 获取球队详情
export const getTeamDetail = (id: string) => {
  return request(`/team/detail/${id}`, {
    method: 'GET',
  });
};

// 创建球队
export const createTeam = (data: Team) => {
  return request('/team/create', {
    method: 'POST',
    data,
  });
};

// 更新球队
export const updateTeam = (id: string, data: Team) => {
  return request(`/team/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除球队
export const deleteTeam = (id: string) => {
  return request(`/team/delete/${id}`, {
    method: 'DELETE',
  });
};
