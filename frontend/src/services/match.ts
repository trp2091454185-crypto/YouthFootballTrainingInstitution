import request from '@/utils/request';

export interface Match {
  id?: string;
  opponent: string;
  matchDate: string;
  location: string;
  teamId?: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  description?: string;
}

export interface MatchListParams {
  current?: number;
  pageSize?: number;
  opponent?: string;
  status?: string;
  teamId?: string;
  startDate?: string;
  endDate?: string;
}

// 获取比赛列表
export const getMatchList = (params: MatchListParams) => {
  return request('/match/list', {
    method: 'GET',
    params,
  });
};

// 获取比赛详情
export const getMatchDetail = (id: string) => {
  return request(`/match/detail/${id}`, {
    method: 'GET',
  });
};

// 创建比赛
export const createMatch = (data: Match) => {
  return request('/match/create', {
    method: 'POST',
    data,
  });
};

// 更新比赛
export const updateMatch = (id: string, data: Match) => {
  return request(`/match/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除比赛
export const deleteMatch = (id: string) => {
  return request(`/match/delete/${id}`, {
    method: 'DELETE',
  });
};

// 取消比赛
export const cancelMatch = (id: string) => {
  return request(`/match/cancel/${id}`, {
    method: 'PUT',
  });
};
