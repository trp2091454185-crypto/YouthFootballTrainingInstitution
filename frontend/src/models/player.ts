import { useState } from 'umi';
import { message } from 'antd';
import * as playerService from '@/services/player';

export default function player() {
  const [playerList, setPlayerList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);

  // 获取球员列表
  const fetchPlayerList = async (params: any) => {
    setLoading(true);
    try {
      const res = await playerService.getPlayerList(params);
      if (res.code === 0) {
        setPlayerList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取球员详情
  const fetchPlayerDetail = async (id: string) => {
    const res = await playerService.getPlayerDetail(id);
    if (res.code === 0) {
      setCurrentPlayer(res.data);
    }
    return res;
  };

  // 创建球员
  const addPlayer = async (data: any) => {
    const res = await playerService.createPlayer(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新球员
  const editPlayer = async (id: string, data: any) => {
    const res = await playerService.updatePlayer(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除球员
  const removePlayer = async (id: string) => {
    const res = await playerService.deletePlayer(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 转会球员
  const transferPlayer = async (playerId: string, newTeamId: string) => {
    const res = await playerService.transferPlayer(playerId, newTeamId);
    if (res.code === 0) {
      message.success('转会成功');
      return true;
    }
    return false;
  };

  return {
    playerList,
    total,
    loading,
    currentPlayer,
    fetchPlayerList,
    fetchPlayerDetail,
    addPlayer,
    editPlayer,
    removePlayer,
    transferPlayer,
  };
}
