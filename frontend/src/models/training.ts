import { useState } from 'umi';
import { message } from 'antd';
import * as trainingService from '@/services/training';

export default function training() {
  const [trainingList, setTrainingList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentTraining, setCurrentTraining] = useState<any>(null);

  // 获取训练列表
  const fetchTrainingList = async (params: any) => {
    setLoading(true);
    try {
      const res = await trainingService.getTrainingList(params);
      if (res.code === 0) {
        setTrainingList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取训练详情
  const fetchTrainingDetail = async (id: string) => {
    const res = await trainingService.getTrainingDetail(id);
    if (res.code === 0) {
      setCurrentTraining(res.data);
    }
    return res;
  };

  // 创建训练
  const addTraining = async (data: any) => {
    const res = await trainingService.createTraining(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新训练
  const editTraining = async (id: string, data: any) => {
    const res = await trainingService.updateTraining(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除训练
  const removeTraining = async (id: string) => {
    const res = await trainingService.deleteTraining(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  return {
    trainingList,
    total,
    loading,
    currentTraining,
    fetchTrainingList,
    fetchTrainingDetail,
    addTraining,
    editTraining,
    removeTraining,
  };
}
