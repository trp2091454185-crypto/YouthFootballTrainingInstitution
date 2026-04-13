import { useState } from 'umi';
import { message } from 'antd';
import * as memberService from '@/services/member';

export default function member() {
  const [memberList, setMemberList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);

  // 获取会员列表
  const fetchMemberList = async (params: any) => {
    setLoading(true);
    try {
      const res = await memberService.getMemberList(params);
      if (res.code === 0) {
        setMemberList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取会员详情
  const fetchMemberDetail = async (id: string) => {
    const res = await memberService.getMemberDetail(id);
    if (res.code === 0) {
      setCurrentMember(res.data);
    }
    return res;
  };

  // 创建会员
  const addMember = async (data: any) => {
    const res = await memberService.createMember(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新会员
  const editMember = async (id: string, data: any) => {
    const res = await memberService.updateMember(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除会员
  const removeMember = async (id: string) => {
    const res = await memberService.deleteMember(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 批量删除会员
  const batchRemoveMembers = async (ids: string[]) => {
    const res = await memberService.batchDeleteMembers(ids);
    if (res.code === 0) {
      message.success('批量删除成功');
      return true;
    }
    return false;
  };

  // 导出会员
  const exportMembers = async (params: any) => {
    try {
      await memberService.exportMembers(params);
      message.success('导出成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    memberList,
    total,
    loading,
    currentMember,
    fetchMemberList,
    fetchMemberDetail,
    addMember,
    editMember,
    removeMember,
    batchRemoveMembers,
    exportMembers,
  };
}
