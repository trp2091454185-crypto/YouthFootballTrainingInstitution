import request from '@/utils/request';

// 反馈信息表 (feedback)
export interface Feedback {
  id?: string;
  feedbackType: 1 | 2 | 3 | 4; // 1咨询 2建议 3投诉 4其他
  contactName?: string;
  contactPhone?: string;
  content: string;
  images?: string[];
  status: 1 | 2 | 3 | 4; // 1未读 2已读 3已回复 4已解决
  replyContent?: string;
  repliedBy?: string;
  repliedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackListParams {
  current?: number;
  pageSize?: number;
  feedbackType?: number;
  status?: number;
  contactName?: string;
  startDate?: string;
  endDate?: string;
}

export interface FeedbackStatistics {
  total: number;
  unread: number; // 未读
  read: number; // 已读
  replied: number; // 已回复
  resolved: number; // 已解决
}

// 获取反馈列表
export const getFeedbackList = (params: FeedbackListParams) => {
  return request('/api/feedback/list', {
    method: 'GET',
    params,
  });
};

// 获取反馈详情
export const getFeedbackDetail = (id: string) => {
  return request(`/api/feedback/detail/${id}`, {
    method: 'GET',
  });
};

// 创建反馈（前端提交）
export const createFeedback = (data: Feedback) => {
  return request('/api/feedback/create', {
    method: 'POST',
    data,
  });
};

// 回复反馈
export const replyFeedback = (id: string, data: { replyContent: string }) => {
  return request(`/api/feedback/reply/${id}`, {
    method: 'PUT',
    data,
  });
};

// 更新反馈状态
export const updateFeedbackStatus = (id: string, status: number) => {
  return request(`/api/feedback/status/${id}`, {
    method: 'PUT',
    data: { status },
  });
};

// 删除反馈
export const deleteFeedback = (id: string) => {
  return request(`/api/feedback/delete/${id}`, {
    method: 'DELETE',
  });
};

// 获取反馈统计
export const getFeedbackStatistics = () => {
  return request('/api/feedback/statistics', {
    method: 'GET',
  });
};
