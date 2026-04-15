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
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { Coach, CoachListParams } from '@/services/coach';
import {
  getCoachList,
  deleteCoach,
  updateCoach,
} from '@/services/coach';
import SpecialTable from '@/components/SpecialTable';
import getTimeColumns from '@/components/TimeColumn';
import getStatusColumn from '@/components/StatusColumn';
import { AGE_GROUP_OPTIONS, SPECIALTY_OPTIONS } from '@/utils/constant';


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
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span><PhoneOutlined style={{ marginRight: 4, color: '#07C160' }} />{record.phone || '-'}</span>
          <span style={{ fontSize: 12, color: '#999' }}><MailOutlined style={{ marginRight: 4, color: '#1677FF' }} />{record.email || '-'}</span>
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
    getStatusColumn<any>({
      updateApi: updateCoach,
      actionRef,
    }),
    {
      title: '专项擅长',
      dataIndex: 'specialties',
      width: 200,
      valueType: 'select',
      fieldProps: {
        options: SPECIALTY_OPTIONS,
      },
      render: (specialties) => {
        // 兼容多种数据格式：数组、JSON字符串、逗号分隔字符串
        const text = specialties?.props?.text || [];

        let arr: string[] = [];
        if (Array.isArray(text)) {
          arr = text as string[];
        } else if (typeof text === 'string') {
          // 尝试解析 JSON 字符串
          if (text.startsWith('[')) {
            try { arr = JSON.parse(text); } catch { }
          } else if (text.trim()) {
            // 逗号分隔
            arr = text.split(',').map(s => s.trim()).filter(Boolean);
          }
        }
        if (!arr || arr.length === 0) {
          return '-';
        }
        return (
          <Space size={[0, 4]} wrap>
            {arr.slice(0, 3).map((specialty, index) => (
              <Tag key={index} color="blue" style={{ fontSize: 11 }}>
                {specialty}
              </Tag>
            ))}
            {arr.length > 3 && (
              <Tag style={{ fontSize: 11 }}>+{arr.length - 3}</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: '适合年龄段',
      dataIndex: 'ageGroups',
      width: 190,
      valueType: 'select',
      fieldProps: {
        options: AGE_GROUP_OPTIONS,
      },
      render: (ageGroups) => {
        const text = ageGroups?.props?.text || [];
        if (!text || !Array.isArray(text) || text.length === 0) {
          return '-';
        }
        return (
          <Space size={[0, 4]} wrap>
            {(text as string[]).slice(0, 3).map((age, index) => (
              <Tag key={index} color="green" style={{ fontSize: 11 }}>
                {age}
              </Tag>
            ))}
            {(text as string[]).length > 3 && (
              <Tag style={{ fontSize: 11 }}>+{(text as string[]).length - 3}</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: '教学特色',
      dataIndex: 'teachingFeatures',
      width: 150,
      search: false,
      ellipsis: true,
    },
    ...getTimeColumns<any>(),
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
