import React, { useRef, useState, useEffect } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Image,
  Tag,
  Tooltip,
  Switch,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { Banner } from '@/services/home';
import {
  getBannerList,
  deleteBanner,
  updateBanner,
} from '@/services/home';
import SpecialTable from '@/components/SpecialTable';
import CarouselForm from './Components/carouselForm';
import CarouselDetail from './Components/carouseDetail';
import getStatusColumn from '@/components/StatusColumn';
import getTimeColumns from '@/components/TimeColumn';

const Carousel: React.FC = () => {
  useEffect(() => {
    document.title = '轮播图管理';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<Banner[]>([]);

  // Modal 状态
  const [formVisible, setFormVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Banner | null>(null);

  // Drawer 状态
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailRecord, setDetailRecord] = useState<Banner | null>(null);

  // 获取轮播图列表
  const fetchList = async (params: any) => {
    const res = await getBannerList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBanner(id);
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
      message.warning('请选择要删除的记录');
      return;
    }
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteBanner(row.id!);
        if (res.success) successCount++;
      }
      if (successCount === selectedRows.length) {
        message.success(`成功删除 ${successCount} 条记录`);
      } else {
        message.warning(`成功删除 ${successCount}/${selectedRows.length} 条记录`);
      }
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 打开新增 Modal
  const handleAdd = () => {
    setCurrentRecord(null);
    setFormVisible(true);
  };

  // 打开编辑 Modal
  const handleEdit = (record: Banner) => {
    setCurrentRecord(record);
    setFormVisible(true);
  };

  // 打开详情 Drawer
  const handleViewDetail = (record: Banner) => {
    setDetailRecord(record);
    setDetailVisible(true);
  };

  // 关闭 Modal
  const handleCloseForm = () => {
    setFormVisible(false);
    setCurrentRecord(null);
  };

  // 提交成功回调
  const handleFormSuccess = () => {
    actionRef.current?.reload();
  };

  // 链接类型映射
  const linkTypeMap: Record<number, string> = { 1: '无链接', 2: '内部页面', 3: '外部链接' };
  const linkTypeColorMap: Record<number, string> = { 1: 'default', 2: 'blue', 3: 'green' };

  // 表格列定义
  const columns: ProColumns<Banner>[] = [
    {
      title: '图片',
      dataIndex: 'image',
      width: 120,
      search: false,
      render: (_, record) =>
        record.image ? (
          <Image src={record.image} width={80} height={45} style={{ borderRadius: 4 }} />
        ) : (
          '-'
        ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 150,
      ellipsis: true,
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
      width: 180,
      ellipsis: true,
      search: false,
    },
    {
      title: '链接类型',
      dataIndex: 'linkType',
      width: 110,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '无链接', value: 1 },
          { label: '内部页面', value: 2 },
          { label: '外部链接', value: 3 },
        ],
      },
      render: (_, record) => (
        <Tag color={linkTypeColorMap[record.linkType] || 'default'}>
          {linkTypeMap[record.linkType] || '-'}
        </Tag>
      ),
    },
    //状态组件
    getStatusColumn<any>({
      updateApi: updateBanner,
      actionRef,
    }),
    //时间组件
    ...getTimeColumns<any>(),
    {
      title: '操作',
      key: 'action',
      width: 200,
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
            description={`确定要删除轮播图 "${record.title}" 吗？`}
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
        request={fetchList}
        handleAdd={handleAdd}
        handleBatchDelete={handleBatchDelete}
        buttonText="轮播图"
        tableRef={actionRef}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        searchKeyword='标题'
        items={[
          {
            title: '首页管理',
          },
          {
            title: '轮播图管理',
          }
        ]}
      />
      <CarouselForm
        visible={formVisible}
        record={currentRecord}
        onClose={handleCloseForm}
        onSuccess={handleFormSuccess}
      />
      <CarouselDetail
        visible={detailVisible}
        record={detailRecord}
        onClose={() => setDetailVisible(false)}
      />
    </>
  );
};

export default Carousel;
