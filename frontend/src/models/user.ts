import { useState } from 'umi';
import { message } from 'antd';
import * as systemService from '@/services/system';
import { setToken, setUserInfo, clearAuth } from '@/utils/auth';

export default function userModel() {
  const [userList, setUserList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [roleList, setRoleList] = useState([]);

  // 登录
  const login = async (data: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await systemService.login(data);
      if (res.code === 0) {
        const { token, userInfo } = res.data;
        setToken(token);
        setUserInfo(userInfo);
        setCurrentUser(userInfo);
        message.success('登录成功');
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 登出
  const logout = async () => {
    try {
      await systemService.logout();
      clearAuth();
      setCurrentUser(null);
      message.success('登出成功');
    } catch (error) {
      clearAuth();
      setCurrentUser(null);
    }
  };

  // 获取用户列表
  const fetchUserList = async (params: any) => {
    setLoading(true);
    try {
      const res = await systemService.getUserList(params);
      if (res.code === 0) {
        setUserList(res.data.list || []);
        setTotal(res.data.total || 0);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取用户详情
  const fetchUserDetail = async (id: string) => {
    const res = await systemService.getUserDetail(id);
    return res;
  };

  // 创建用户
  const addUser = async (data: any) => {
    const res = await systemService.createUser(data);
    if (res.code === 0) {
      message.success('创建成功');
      return true;
    }
    return false;
  };

  // 更新用户
  const editUser = async (id: string, data: any) => {
    const res = await systemService.updateUser(id, data);
    if (res.code === 0) {
      message.success('更新成功');
      return true;
    }
    return false;
  };

  // 删除用户
  const removeUser = async (id: string) => {
    const res = await systemService.deleteUser(id);
    if (res.code === 0) {
      message.success('删除成功');
      return true;
    }
    return false;
  };

  // 重置密码
  const resetUserPassword = async (id: string, newPassword: string) => {
    const res = await systemService.resetPassword(id, newPassword);
    if (res.code === 0) {
      message.success('重置成功');
      return true;
    }
    return false;
  };

  // 获取角色列表
  const fetchRoleList = async () => {
    // const res = await systemService.getRoleList();
    // if (res.code === 0) {
    //   setRoleList(res.data.list || []);
    // }
    // return res;
  };

  // 获取操作日志
  const fetchLogList = async (params: any) => {
    setLoading(true);
    try {
      const res = await systemService.getLogList(params);
      return res;
    } finally {
      setLoading(false);
    }
  };

  // 获取系统配置
  const fetchSystemConfig = async () => {

  };

  // 更新系统配置
  const updateSystemConfig = async (data: any) => {

  };

  return {
    userList,
    total,
    loading,
    currentUser,
    roleList,
    login,
    logout,
    fetchUserList,
    fetchUserDetail,
    addUser,
    editUser,
    removeUser,
    resetUserPassword,
    fetchRoleList,
    fetchLogList,
    fetchSystemConfig,
    updateSystemConfig,
  };
}
