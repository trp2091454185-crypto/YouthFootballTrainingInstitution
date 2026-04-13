import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Tooltip,
  Tag,
  Avatar,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import type { Registration, RegistrationListParams } from '@/services/registration';
import {
  getRegistrationList,
  deleteRegistration,
  handleRegistration,
  convertToStudent,
} from '@/services/registration';
import SpecialTable from '@/components/SpecialTable';

// 报名状态选项
const STATUS_OPTIONS = [
  { label: '未处理', value: 1 },
  { label: '已联系', value: 2 },
  { label: '已报名', value: 3 },
  { label: '已拒绝', value: 4 },
];

// 了解渠道选项
const SOURCE_OPTIONS = [
  { label: '微信', value: '微信' },
  { label: '朋友圈', value: '朋友圈' },
  { label: '抖音', value: '抖音' },
  { label: '小红书', value: '小红书' },
  { label: '朋友介绍', value: '朋友介绍' },
  { label: '线下活动', value: '线下活动' },
  { label: '其他', value: '其他' },
];

// 年龄段选项
const AGE_GROUP_OPTIONS = [
  { label: 'U6', value: 'U6' },
  { label: 'U8', value: 'U8' },
  { label: 'U10', value: 'U10' },
  { label: 'U12', value: 'U12' },
  { label: 'U14', value: 'U14' },
  { label: 'U16', value: 'U16' },
];

const RegistrationManagement: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '报名信息';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<Registration[]>([]);

  // 获取报名列表
  const fetchRegistrationList = async (params: RegistrationListParams) => {
    const res = await getRegistrationList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRegistration(id);
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
      message.warning('请选择要删除的报名信息');
      return;
    }
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteRegistration(row.id!);
        if (res.success) {
          successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 条报名信息`);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 更新报名状态
  const handleStatusChange = async (id: string, status: number) => {
    try {
      const res = await handleRegistration(id, { status });
      if (res.success) {
        message.success('状态更新成功');
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '更新失败');
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  // 转为正式学员
  const handleConvert = async (record: Registration) => {
    try {
      const res = await convertToStudent(record.id!);
      if (res.success) {
        message.success('已转为正式学员');
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '转换失败');
      }
    } catch (error) {
      message.error('转换失败');
    }
  };

  // 跳转到新增页面
  const handleAdd = () => {
    navigate('/registration/management/create');
  };

  // 跳转到编辑页面
  const handleEdit = (record: Registration) => {
    navigate(`/registration/management/edit/${record.id}`);
  };

  // 查看详情
  const handleViewDetail = (record: Registration) => {
    navigate(`/registration/management/detail/${record.id}`);
  };

  // 获取状态标签颜色
  const getStatusColor = (status: number) => {
    switch (status) {
      case 1: return 'default';
      case 2: return 'processing';
      case 3: return 'success';
      case 4: return 'error';
      default: return 'default';
    }
  };

  // 表格列定义
  const columns: ProColumns<Registration>[] = [
    {
      title: '报名编号',
      dataIndex: 'registrationNo',
      width: 130,
      search: false,
      render: (text) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
    },
    {
      title: '学员信息',
      width: 150,
      render: (_, record) => (
        <Space>
          <Avatar
            size="small"
            icon={record.gender === 1 ? <ManOutlined /> : <WomanOutlined />}
            style={{
              backgroundColor: record.gender === 1 ? '#1890ff' : '#eb2f96',
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.studentName}</div>
            <div style={{ fontSize: 12, color: '#999' }}>
              {record.gender === 1 ? '男' : '女'} · {record.birthDate}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: '家长信息',
      width: 150,
      render: (_, record) => (
        <div>
          <div>{record.parentName}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{record.parentPhone}</div>
        </div>
      ),
    },
    {
      title: '微信号',
      dataIndex: 'wechat',
      width: 120,
      search: false,
      render: (text) => text || '-',
    },
    {
      title: '意向课程',
      dataIndex: 'intendedCourseName',
      width: 150,
      search: false,
      render: (text) => text || '-',
    },
    {
      title: '意向年龄段',
      dataIndex: 'intendedAgeGroup',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: AGE_GROUP_OPTIONS,
      },
      render: (text) => text ? <Tag color="blue">{text}</Tag> : '-',
    },
    {
      title: '足球经历',
      dataIndex: 'experience',
      width: 150,
      search: false,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '培训期望',
      dataIndex: 'expectations',
      width: 150,
      search: false,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '了解渠道',
      dataIndex: 'source',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: SOURCE_OPTIONS,
      },
      render: (text) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: STATUS_OPTIONS,
      },
      render: (status) => {
        const statusItem = STATUS_OPTIONS.find(item => item.value === status);
        return (
          <Tag color={getStatusColor(status as number)}>
            {statusItem?.label || '-'}
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 150,
      search: false,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '报名时间',
      dataIndex: 'createdAt',
      width: 150,
      valueType: 'dateTime',
      search: false,
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
          {record.status === 1 && (
            <Tooltip title="标记已联系">
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => handleStatusChange(record.id!, 2)}
              />
            </Tooltip>
          )}
          {record.status === 2 && (
            <Tooltip title="转为学员">
              <Button
                type="text"
                icon={<UserAddOutlined />}
                onClick={() => handleConvert(record)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="确认删除"
            description={`确定要删除报名 "${record.studentName}" 吗？`}
            onConfirm={() => handleDelete(record.id!)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <SpecialTable
      columns={columns}
      request={fetchRegistrationList}
      handleAdd={handleAdd}
      handleBatchDelete={handleBatchDelete}
      buttonText="报名"
      tableRef={actionRef}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      searchKeyword="学员姓名或家长电话"
      items={[
        {
          title: '报名管理',
        },
        {
          title: '报名列表',
        }
      ]}
    />
  );
};

export default RegistrationManagement;
