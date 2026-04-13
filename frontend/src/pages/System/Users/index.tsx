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
  toggleUserStatus,
  resetPassword,
} from '@/services/system';
import SpecialTable from '@/components/SpecialTable';

const ROLE_MAP: Record<number, { label: string; color: string }> = {
  1: { label: '管理员', color: 'blue' },
  2: { label: '超级管理员', color: 'red' },
};

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '用户列表';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<SysUser[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SysUser | null>(null);

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

  // 处理状态切换
  const handleStatusChange = async (id: string, status: number) => {
    try {
      const res = await toggleUserStatus(id, status);
      if (res.success) {
        message.success(status === 1 ? '用户已启用' : '用户已禁用');
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '操作失败');
      }
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 处理重置密码
  const handleResetPassword = async (id: string) => {
    try {
      const res = await resetPassword(id, '123456');
      if (res.success) {
        message.success('密码已重置为: 123456');
      } else {
        message.error(res.errorMessage || '重置密码失败');
      }
    } catch (error) {
      message.error('重置密码失败');
    }
  };

  // 跳转到新增页面
  const handleAdd = () => {
    navigate('/system/users/create');
  };

  // 跳转到编辑页面
  const handleEdit = (record: SysUser) => {
    navigate(`/system/users/edit/${record.id}`);
  };

  // 查看详情
  const handleViewDetail = (record: SysUser) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setDetailVisible(false);
    setCurrentRecord(null);
  };

  // 表格列定义
  const columns: ProColumns<SysUser>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 150,
      render: (text, record) => (
        <Space>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            style={{
              backgroundColor: record.role === 2 ? '#cf1322' : '#1890ff',
            }}
          />
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
        options: [
          { label: '管理员', value: 1 },
          { label: '超级管理员', value: 2 },
        ],
      },
      render: (_, record) => {
        const role = ROLE_MAP[record.role];
        return <Tag color={role?.color}>{role?.label || '未知'}</Tag>;
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
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'success' : 'default'}>
          {record.status === 1 ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '最后登录',
      width: 200,
      render: (_, record) => (
        <div>
          <div>{record.lastLoginTime || '-'}</div>
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
          <Tooltip title="查看详情">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="重置密码">
            <Popconfirm
              title="确认重置密码"
              description={`确定要重置用户 "${record.username}" 的密码吗？重置后密码为: 123456`}
              onConfirm={() => handleResetPassword(record.id!)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" icon={<LockOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={record.status === 1 ? '禁用' : '启用'}>
            <Switch
              size="small"
              checked={record.status === 1}
              onChange={(checked) =>
                handleStatusChange(record.id!, checked ? 1 : 0)
              }
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
    </>
  );
};

export default UserManagement;
