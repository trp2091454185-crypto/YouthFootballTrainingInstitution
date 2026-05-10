import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Tag,
  Avatar,
  Tooltip,
  Switch,
  Modal,
  Input,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { SysUser, SysUserListParams } from '@/services/system';
import {
  getUserList,
  deleteUser,
  resetPassword,
} from '@/services/system';
import SpecialTable from '@/components/SpecialTable';
import UserEditModal from './edit';
import { USER_ROLE } from '@/utils/constant';
import dayjs from 'dayjs';

const UserManagement: React.FC = () => {
  useEffect(() => {
    document.title = '用户列表';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<SysUser[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<SysUser | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetRecord, setResetRecord] = useState<SysUser | null>(null);
  const [newPassword, setNewPassword] = useState('123456');

  // 获取用户列表
  const fetchUserList = async (params: SysUserListParams) => {
    const res = await getUserList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser(id);
      if (res.success) {
        message.success('删除成功');
        actionRef.current?.reload();
        setSelectedRows([]);
      } else {
        message.error(res.errorMessage || '删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 处理批量删除
  const handleBatchDelete = async () => {
    if (selectedRows.length === 0) {
      message.warning('请选择要删除的用户');
      return;
    }
    // 批量删除需要后端支持，这里逐个删除
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        if (row.id) {
          const res = await deleteUser(row.id);
          if (res.success) successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 名用户`);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 打开重置密码弹窗
  const handleOpenReset = (record: SysUser) => {
    setResetRecord(record);
    setNewPassword('123456');
    setResetModalOpen(true);
  };

  // 处理重置密码确认
  const handleResetPassword = async () => {
    if (!resetRecord?.id) return;
    try {
      const res = await resetPassword(resetRecord.id, newPassword);
      if (res.success) {
        message.success(`用户 "${resetRecord.username}" 密码已重置`);
        setResetModalOpen(false);
        setResetRecord(null);
      } else {
        message.error(res.errorMessage || '重置密码失败');
      }
    } catch {
      message.error('重置密码失败');
    }
  };

  // 关闭重置密码弹窗
  const handleCloseReset = () => {
    setResetModalOpen(false);
    setResetRecord(null);
  };

  // 打开新增弹窗
  const handleAdd = () => {
    setEditRecord(null);
    setEditModalOpen(true);
  };

  // 打开编辑弹窗
  const handleEdit = (record: SysUser) => {
    setEditRecord(record);
    setEditModalOpen(true);
  };

  // 弹窗操作成功
  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setEditRecord(null);
    actionRef.current?.reload();
  };

  // 关闭编辑弹窗
  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditRecord(null);
  };


  // 表格列定义
  const columns: ProColumns<SysUser>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
      render: (text, record) => (
        <Space>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 120,
      valueType: 'select',
      fieldProps: {
        options: { USER_ROLE }
      },
      render: (_, record) => {
        const roleItem = USER_ROLE.find(item => item.value === record.role);
        return <>{roleItem?.label || '未知'}</>;
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 130,
      copyable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 180,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '最后登录',
      width: 200,
      render: (_, record) => (
        <div>
          <div>{dayjs(record.lastLoginTime).format('YYYY-MM-DD HH:mm:ss') || '-'}</div>
          {record.lastLoginIp && (
            <div style={{ fontSize: 12, color: '#999' }}>
              IP: {record.lastLoginIp}
            </div>
          )}
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
      fixed: 'right',
      search: false,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="重置密码">
            <Button
              type="text"
              icon={<LockOutlined />}
              onClick={() => handleOpenReset(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确认删除"
              description={`确定要删除用户 "${record.username}" 吗？`}
              onConfirm={() => handleDelete(record.id!)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SpecialTable
        columns={columns}
        request={fetchUserList}
        handleAdd={handleAdd}
        handleBatchDelete={handleBatchDelete}
        buttonText="用户"
        tableRef={actionRef}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        searchKeyword="用户名"
        items={[
          {
            title: '系统管理',
          },
          {
            title: '用户列表',
          },
        ]}
      />
      <UserEditModal
        open={editModalOpen}
        editRecord={editRecord}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />
      <Modal
        title="重置密码"
        open={resetModalOpen}
        onOk={handleResetPassword}
        onCancel={handleCloseReset}
        okText="确认重置"
        cancelText="取消"
        width={420}
      >
        <div style={{ marginBottom: 16, color: '#666' }}>
          确定要重置用户 <strong>{resetRecord?.username}</strong> 的密码吗？
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ whiteSpace: 'nowrap' }}>新密码：</span>
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="请输入新密码"
            style={{ flex: 1 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserManagement;
