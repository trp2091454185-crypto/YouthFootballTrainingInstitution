import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Avatar,
  Tooltip,
  Tag,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import type { Coach, CoachListParams } from '@/services/coach';
import {
  getCoachList,
  deleteCoach,
} from '@/services/coach';
import SpecialTable from '@/components/SpecialTable';

// 专项擅长选项
const SPECIALTY_OPTIONS = [
  { label: '启蒙', value: '启蒙' },
  { label: '体能', value: '体能' },
  { label: '战术', value: '战术' },
  { label: '门将', value: '门将' },
  { label: '进攻', value: '进攻' },
  { label: '防守', value: '防守' },
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

const CoachManagement: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '教练信息';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<Coach[]>([]);

  // 获取教练列表
  const fetchCoachList = async (params: CoachListParams) => {
    const res = await getCoachList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCoach(id);
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
      message.warning('请选择要删除的教练');
      return;
    }
    // 由于没有批量删除API，逐个删除
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteCoach(row.id!);
        if (res.success) {
          successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 名教练`);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 跳转到新增页面
  const handleAdd = () => {
    navigate('/team/management/create');
  };

  // 跳转到编辑页面
  const handleEdit = (record: Coach) => {
    navigate(`/team/management/edit/${record.id}`);
  };

  // 查看详情
  const handleViewDetail = (record: Coach) => {
    navigate(`/team/management/detail/${record.id}`);
  };

  // 表格列定义
  const columns: ProColumns<Coach>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 80,
      search: false,
      render: (avatar, record) => (
        <Avatar
          size={40}
          src={avatar}
          icon={record.gender === 1 ? <ManOutlined /> : <WomanOutlined />}
          style={{
            backgroundColor: record.gender === 1 ? '#1890ff' : '#eb2f96',
          }}
        />
      ),
    },
    {
      title: '教练姓名',
      dataIndex: 'name',
      width: 120,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{record.name}</span>
          <span style={{ fontSize: 12, color: '#999' }}>
            {record.gender === 1 ? '男' : '女'}
          </span>
        </Space>
      ),
    },
    {
      title: '联系方式',
      width: 150,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>{record.phone || '-'}</span>
          <span style={{ fontSize: 12, color: '#999' }}>{record.email || '-'}</span>
        </Space>
      ),
    },
    {
      title: '执教年限',
      dataIndex: 'workYears',
      width: 100,
      search: false,
      render: (years) => <span>{years} 年</span>,
    },
    {
      title: '专项擅长',
      dataIndex: 'specialties',
      width: 180,
      valueType: 'select',
      fieldProps: {
        options: SPECIALTY_OPTIONS,
      },
      render: (specialties) => {
        if (!specialties || !Array.isArray(specialties) || specialties.length === 0) {
          return '-';
        }
        return (
          <Space size={[0, 4]} wrap>
            {(specialties as string[]).slice(0, 3).map((specialty, index) => (
              <Tag key={index} color="blue" style={{ fontSize: 11 }}>
                {specialty}
              </Tag>
            ))}
            {(specialties as string[]).length > 3 && (
              <Tag style={{ fontSize: 11 }}>+{(specialties as string[]).length - 3}</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: '适合年龄段',
      dataIndex: 'ageGroups',
      width: 150,
      valueType: 'select',
      fieldProps: {
        options: AGE_GROUP_OPTIONS,
      },
      render: (ageGroups) => {
        if (!ageGroups || !Array.isArray(ageGroups) || ageGroups.length === 0) {
          return '-';
        }
        return (
          <Space size={[0, 4]} wrap>
            {(ageGroups as string[]).slice(0, 4).map((age, index) => (
              <Tag key={index} color="green" style={{ fontSize: 11 }}>
                {age}
              </Tag>
            ))}
            {(ageGroups as string[]).length > 4 && (
              <Tag style={{ fontSize: 11 }}>+{(ageGroups as string[]).length - 4}</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: '个人简介',
      dataIndex: 'bio',
      width: 200,
      search: false,
      ellipsis: true,
    },
    {
      title: '教学特色',
      dataIndex: 'teachingFeatures',
      width: 150,
      search: false,
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
      render: (status) => (
        <Tag color={status === 1 ? 'success' : 'default'}>
          {status === 1 ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 150,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
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
          <Popconfirm
            title="确认删除"
            description={`确定要删除教练 "${record.name}" 吗？`}
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
      request={fetchCoachList}
      handleAdd={handleAdd}
      handleBatchDelete={handleBatchDelete}
      buttonText="教练"
      tableRef={actionRef}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      searchKeyword="教练姓名"
      items={[
        {
          title: '教练管理',
        },
        {
          title: '教练列表',
        }
      ]}
    />
  );
};

export default CoachManagement;
