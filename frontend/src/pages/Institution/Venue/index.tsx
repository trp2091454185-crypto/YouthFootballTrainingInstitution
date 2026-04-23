import React, { useRef, useState, useEffect } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Tooltip,
  Image,
  Tag,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import type { InstitutionFacility } from '@/services/institution';
import {
  getFacilityList,
  deleteFacility,
  updateFacility,
} from '@/services/institution';
import SpecialTable from '@/components/SpecialTable';
import getTimeColumns from '@/components/TimeColumn';
import { getStatusColumn } from '@/components/StatusColumn';
import VenueEditModal from './Edit';

const VenueManagement: React.FC = () => {
  useEffect(() => {
    document.title = '场地设施';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<InstitutionFacility[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<InstitutionFacility | null>(null);

  // 获取场地设施列表
  const fetchFacilityList = async (params: { current?: number; pageSize?: number; keyword?: string }) => {
    const res = await getFacilityList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFacility(id);
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
      message.warning('请选择要删除的场地');
      return;
    }
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteFacility(row.id!);
        if (res.success) {
          successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 条场地记录`);
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
  const handleEdit = (record: InstitutionFacility) => {
    setEditRecord(record);
    setEditModalOpen(true);
  };

  // 表格列定义
  const columns: ProColumns<InstitutionFacility>[] = [
    {
      title: '场地图片',
      dataIndex: 'coverImage',
      width: 120,
      search: false,
      render: (values) => {
        return values ? (
          <Image
            src={values}
            alt="场地图片"
            width={120}
            height={60}
            style={{ objectFit: 'cover', borderRadius: 4 }}
            preview={{ mask: '查看' }}
          />
        ) : (
          <div
            style={{
              width: 100,
              height: 60,
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: 12,
              gap: 4,
            }}
          >
            <PictureOutlined />
            <span>暂无图片</span>
          </div>
        );
      },
    },
    {
      title: '场地名称',
      dataIndex: 'name',
      width: 120,
      render: (text) => (
        <Space>
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    getStatusColumn<any>({
      updateApi: updateFacility,
      actionRef,
    }),
    {
      title: '场地描述',
      dataIndex: 'description',
      width: 250,
      ellipsis: true,
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
            description={`确定要删除场地 "${record.name}" 吗？`}
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
        request={fetchFacilityList}
        handleAdd={handleAdd}
        handleBatchDelete={handleBatchDelete}
        buttonText="场地"
        tableRef={actionRef}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        searchKeyword="场地名称"
        items={[
          {
            title: '机构管理',
          },
          {
            title: '场地设施',
          }
        ]}
      />
      <VenueEditModal
        visible={editModalOpen}
        record={editRecord}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => actionRef.current?.reload()}
      />
    </>
  );
};

export default VenueManagement;
