import request from '@/utils/request';

export interface Member {
  id?: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  level: string;
  status: string;
  joinDate?: string;
}

export interface MemberListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  phone?: string;
  level?: string;
  status?: string;
}

// 获取会员列表
export const getMemberList = (params: MemberListParams) => {
  return request('/member/list', {
    method: 'GET',
    params,
  });
};

// 获取会员详情
export const getMemberDetail = (id: string) => {
  return request(`/member/detail/${id}`, {
    method: 'GET',
  });
};

// 创建会员
export const createMember = (data: Member) => {
  return request('/member/create', {
    method: 'POST',
    data,
  });
};

// 更新会员
export const updateMember = (id: string, data: Member) => {
  return request(`/member/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除会员
export const deleteMember = (id: string) => {
  return request(`/member/delete/${id}`, {
    method: 'DELETE',
  });
};

// 批量删除会员
export const batchDeleteMembers = (ids: string[]) => {
  return request('/member/batchDelete', {
    method: 'DELETE',
    data: { ids },
  });
};

// 导出会员
export const exportMembers = (params: MemberListParams) => {
  return request('/member/export', {
    method: 'GET',
    params,
    responseType: 'blob',
  });
};
