import request from '@/utils/request';

export interface Player {
  id?: string;
  name: string;
  position: string;
  number: number;
  age: number;
  teamId?: string;
  contractStart?: string;
  contractEnd?: string;
  status?: string;
}

export interface PlayerListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  position?: string;
  teamId?: string;
  status?: string;
}

// 获取球员列表
export const getPlayerList = (params: PlayerListParams) => {
  return request('/player/list', {
    method: 'GET',
    params,
  });
};

// 获取球员详情
export const getPlayerDetail = (id: string) => {
  return request(`/player/detail/${id}`, {
    method: 'GET',
  });
};

// 创建球员
export const createPlayer = (data: Player) => {
  return request('/player/create', {
    method: 'POST',
    data,
  });
};

// 更新球员
export const updatePlayer = (id: string, data: Player) => {
  return request(`/player/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除球员
export const deletePlayer = (id: string) => {
  return request(`/player/delete/${id}`, {
    method: 'DELETE',
  });
};

// 转会球员
export const transferPlayer = (playerId: string, newTeamId: string) => {
  return request('/player/transfer', {
    method: 'POST',
    data: { playerId, newTeamId },
  });
};
