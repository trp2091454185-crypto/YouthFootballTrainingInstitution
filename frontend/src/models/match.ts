import { useState } from 'umi';
import { message } from 'antd';
import * as matchService from '@/services/match';

export default function matchModel() {
  const [matchList, setMatchList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<any>(null);

  // 获取比赛列表
  const fetchMatchList = async (params: any) => {
    setLoading(true);
    try {
      const res = await matchService.getMatchList(params);
      if (res.code === 0) {
        setMatchList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取比赛详情
  const fetchMatchDetail = async (id: string) => {
    const res = await matchService.getMatchDetail(id);
    if (res.code === 0) {
      setCurrentMatch(res.data);
    }
    return res;
  };

  // 创建比赛
  const addMatch = async (data: any) => {
    const res = await matchService.createMatch(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新比赛
  const editMatch = async (id: string, data: any) => {
    const res = await matchService.updateMatch(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除比赛
  const removeMatch = async (id: string) => {
    const res = await matchService.deleteMatch(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 取消比赛
  const cancelMatch = async (id: string) => {
    const res = await matchService.cancelMatch(id);
    if (res.code === 0) {
      message.success('取消成功');
      return true;
    }
    return false;
  };

  return {
    matchList,
    total,
    loading,
    currentMatch,
    fetchMatchList,
    fetchMatchDetail,
    addMatch,
    editMatch,
    removeMatch,
    cancelMatch,
  };
}
