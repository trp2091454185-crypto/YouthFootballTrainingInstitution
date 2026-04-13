import { useState } from 'umi';
import { message } from 'antd';
import * as teamService from '@/services/team';

export default function team() {
  const [teamList, setTeamList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>(null);

  // 获取球队列表
  const fetchTeamList = async (params: any) => {
    setLoading(true);
    try {
      const res = await teamService.getTeamList(params);
      if (res.code === 0) {
        setTeamList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取球队详情
  const fetchTeamDetail = async (id: string) => {
    const res = await teamService.getTeamDetail(id);
    if (res.code === 0) {
      setCurrentTeam(res.data);
    }
    return res;
  };

  // 创建球队
  const addTeam = async (data: any) => {
    const res = await teamService.createTeam(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新球队
  const editTeam = async (id: string, data: any) => {
    const res = await teamService.updateTeam(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除球队
  const removeTeam = async (id: string) => {
    const res = await teamService.deleteTeam(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  return {
    teamList,
    total,
    loading,
    currentTeam,
    fetchTeamList,
    fetchTeamDetail,
    addTeam,
    editTeam,
    removeTeam,
  };
}
