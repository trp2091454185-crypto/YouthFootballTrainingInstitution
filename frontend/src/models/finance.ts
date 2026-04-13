import { useState } from 'umi';
import { message } from 'antd';
import * as financeService from '@/services/finance';

export default function finance() {
  const [financeList, setFinanceList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentFinance, setCurrentFinance] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);

  // 获取财务列表
  const fetchFinanceList = async (params: any) => {
    setLoading(true);
    try {
      const res = await financeService.getFinanceList(params);
      if (res.code === 0) {
        setFinanceList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取财务详情
  const fetchFinanceDetail = async (id: string) => {
    const res = await financeService.getFinanceDetail(id);
    if (res.code === 0) {
      setCurrentFinance(res.data);
    }
    return res;
  };

  // 获取财务统计
  const fetchFinanceStatistics = async (params: any) => {
    const res = await financeService.getFinanceStatistics(params);
    if (res.code === 0) {
      setStatistics(res.data);
    }
    return res;
  };

  // 创建财务记录
  const addFinance = async (data: any) => {
    const res = await financeService.createFinance(data);
    if (res.code === 0) {
      message.success('添加成功');
      return true;
    }
    return false;
  };

  // 更新财务记录
  const editFinance = async (id: string, data: any) => {
    const res = await financeService.updateFinance(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除财务记录
  const removeFinance = async (id: string) => {
    const res = await financeService.deleteFinance(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 导出财务报表
  const exportFinanceReport = async (params: any) => {
    try {
      await financeService.exportFinanceReport(params);
      message.success('导出成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    financeList,
    total,
    loading,
    currentFinance,
    statistics,
    fetchFinanceList,
    fetchFinanceDetail,
    fetchFinanceStatistics,
    addFinance,
    editFinance,
    removeFinance,
    exportFinanceReport,
  };
}
