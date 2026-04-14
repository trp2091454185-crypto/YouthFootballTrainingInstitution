import React, { useRef, useState, useEffect } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Tooltip,
  Image,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { InstitutionHonor, HonorListParams } from '@/services/institution';
import {
  getHonorList,
  deleteHonor,
  updateHonor,
} from '@/services/institution';
import SpecialTable from '@/components/SpecialTable';
import HonorEditModal from './Edit';
import getTimeColumns from '@/components/TimeColumn';
import { getStatusColumn } from '@/components/StatusColumn';

const HonorManagement: React.FC = () => {
  useEffect(() => {
    document.title = '荣誉奖项';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<InstitutionHonor[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<InstitutionHonor | null>(null);

  // 获取荣誉列表
  const fetchHonorList = async (params: HonorListParams) => {
    const res = await getHonorList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteHonor(id);
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
      message.warning('请选择要删除的荣誉');
      return;
    }
    // 逐个删除选中的荣誉
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteHonor(row.id!);
        if (res.success) {
          successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 条荣誉记录`);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 打开新增弹窗
  const handleAdd = () => {
    setEditRecord(null);
    setEditModalOpen(true);
  };

  // 打开编辑弹窗
  const handleEdit = (record: InstitutionHonor) => {
    setEditRecord(record);
    setEditModalOpen(true);
  };


  // 表格列定义
  const columns: ProColumns<InstitutionHonor>[] = [
    {
      title: '奖项图片',
      dataIndex: 'image',
      width: 120,
      search: false,
      render: (image) =>
        image ? (
          <Image
            src={image as string}
            alt="奖项图片"
            width={80}
            height={60}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            preview={{ mask: '查看' }}
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 60,
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: 12,
            }}
          >
            暂无图片
          </div>
        ),
    },
    {
      title: '奖项名称',
      dataIndex: 'title',
      width: 200,
      render: (text) => (
        <Space>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '颁奖机构',
      dataIndex: 'awardOrg',
      width: 150,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '获奖日期',
      dataIndex: 'awardDate',
      width: 120,
      valueType: 'date',
      render: (text) =>
        text ? (
          <Space>
            <CalendarOutlined style={{ color: '#52c41a' }} />
            <span>{text}</span>
          </Space>
        ) : (
          '-'
        ),
    },
    getStatusColumn<any>({
      updateApi: updateHonor,
      actionRef,
    }),
    {
      title: '奖项描述',
      dataIndex: 'description',
      width: 250,
      ellipsis: true,
      search: false,
      render: (text) => text || '-',
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
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="确认删除"
            description={`确定要删除荣誉 "${record.title}" 吗？`}
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
    <>
      <SpecialTable
        columns={columns}
        request={fetchHonorList}
        handleAdd={handleAdd}
        handleBatchDelete={handleBatchDelete}
        buttonText="荣誉"
        tableRef={actionRef}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        searchKeyword="奖项名称"
        items={[
          {
            title: '机构管理',
          },
          {
            title: '荣誉奖项',
          }
        ]}
      />
      <HonorEditModal
        visible={editModalOpen}
        record={editRecord}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => actionRef.current?.reload()}
      />
    </>
  );
};

export default HonorManagement;
