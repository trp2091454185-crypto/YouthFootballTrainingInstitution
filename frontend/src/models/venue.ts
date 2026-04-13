import { useState } from 'umi';
import { message } from 'antd';
import * as venueService from '@/services/venue';

export default function venue() {
  const [venueList, setVenueList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentVenue, setCurrentVenue] = useState<any>(null);
  const [bookingList, setBookingList] = useState([]);

  // 获取场地列表
  const fetchVenueList = async (params: any) => {
    setLoading(true);
    try {
      const res = await venueService.getVenueList(params);
      if (res.code === 0) {
        setVenueList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取场地详情
  const fetchVenueDetail = async (id: string) => {
    const res = await venueService.getVenueDetail(id);
    if (res.code === 0) {
      setCurrentVenue(res.data);
    }
    return res;
  };

  // 创建场地
  const addVenue = async (data: any) => {
    const res = await venueService.createVenue(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新场地
  const editVenue = async (id: string, data: any) => {
    const res = await venueService.updateVenue(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除场地
  const removeVenue = async (id: string) => {
    const res = await venueService.deleteVenue(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 获取场地预约列表
  const fetchBookingList = async (params: any) => {
    const res = await venueService.getBookingList(params);
    if (res.code === 0) {
      setBookingList(res.data.list || []);
    }
    return res;
  };

  // 创建预约
  const addBooking = async (data: any) => {
    const res = await venueService.createBooking(data);
    if (res.code === 0) {
      message.success('预约成功');
      return true;
    }
    return false;
  };

  // 取消预约
  const cancelBooking = async (id: string) => {
    const res = await venueService.cancelBooking(id);
    if (res.code === 0) {
      message.success('取消成功');
      return true;
    }
    return false;
  };

  return {
    venueList,
    total,
    loading,
    currentVenue,
    bookingList,
    fetchVenueList,
    fetchVenueDetail,
    addVenue,
    editVenue,
    removeVenue,
    fetchBookingList,
    addBooking,
    cancelBooking,
  };
}
