import request from '@/utils/request';

export interface Venue {
  id?: string;
  name: string;
  address: string;
  capacity: number;
  type: string;
  status: string;
  description?: string;
}

export interface VenueListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: string;
  type?: string;
}

export interface Booking {
  id?: string;
  venueId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose?: string;
  status?: string;
}

// 获取场地列表
export const getVenueList = (params: VenueListParams) => {
  return request('/venue/list', {
    method: 'GET',
    params,
  });
};

// 获取场地详情
export const getVenueDetail = (id: string) => {
  return request(`/venue/detail/${id}`, {
    method: 'GET',
  });
};

// 创建场地
export const createVenue = (data: Venue) => {
  return request('/venue/create', {
    method: 'POST',
    data,
  });
};

// 更新场地
export const updateVenue = (id: string, data: Venue) => {
  return request(`/venue/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除场地
export const deleteVenue = (id: string) => {
  return request(`/venue/delete/${id}`, {
    method: 'DELETE',
  });
};

// 获取场地预约列表
export const getBookingList = (params: { venueId?: string; date?: string; current?: number; pageSize?: number }) => {
  return request('/venue/booking/list', {
    method: 'GET',
    params,
  });
};

// 创建预约
export const createBooking = (data: Booking) => {
  return request('/venue/booking/create', {
    method: 'POST',
    data,
  });
};

// 取消预约
export const cancelBooking = (id: string) => {
  return request(`/venue/booking/cancel/${id}`, {
    method: 'PUT',
  });
};
