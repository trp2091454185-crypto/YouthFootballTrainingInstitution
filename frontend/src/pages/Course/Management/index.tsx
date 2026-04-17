import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable, ActionType, ProFormInstance } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  Input,
  Empty,
  Tag,
  Tooltip,
  Image,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { Course, CourseListParams } from '@/services/course';
import {
  getCourseList,
  deleteCourse,
  updateCourse,
} from '@/services/course';
import Category from './Category';
import './index.less';
import getStatusColumn from '@/components/StatusColumn';
import getTimeColumns from '@/components/TimeColumn';

// 年龄段选项
const AGE_GROUP_OPTIONS = [
  { label: 'U6', value: 'U6' },
  { label: 'U8', value: 'U8' },
  { label: 'U10', value: 'U10' },
  { label: 'U12', value: 'U12' },
  { label: 'U14', value: 'U14' },
  { label: 'U16', value: 'U16' },
];

// 状态选项
const STATUS_OPTIONS = [
  { label: '已下架', value: 0 },
  { label: '已上架', value: 1 },
];

const CourseManagement: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '课程信息';
  }, []);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [selectedRows, setSelectedRows] = useState<Course[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // 获取课程列表
  const fetchCourseList = async (params: CourseListParams) => {
    const res = await getCourseList({
      ...params,
      categoryId: selectedCategoryId || undefined,
    });
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 处理分类选择
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    actionRef.current?.reload();
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCourse(id);
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
      message.warning('请选择要删除的课程');
      return;
    }
    try {
      let successCount = 0;
      for (const row of selectedRows) {
        const res = await deleteCourse(row.id!);
        if (res.success) {
          successCount++;
        }
      }
      message.success(`成功删除 ${successCount} 门课程`);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 跳转到新增页面
  const handleAdd = () => {
    navigate('/course/management/create');
  };

  // 跳转到编辑页面
  const handleEdit = (record: Course) => {
    navigate(`/course/management/edit/${record.id}`);
  };

  // 查看详情
  const handleViewDetail = (record: Course) => {
    navigate(`/course/management/detail/${record.id}`);
  };

  // 刷新表格
  const handleRefresh = async () => {
    setRefreshing(true);
    await actionRef.current?.reload();
    setRefreshing(false);
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setKeyword(value);
    actionRef.current?.reloadAndRest?.();
  };

  // 包装 request 函数
  const wrappedRequest = async (params: any) => {
    const res = await fetchCourseList({
      ...params,
      keyword: keyword || undefined,
    });
    return res;
  };

  // 表格列定义
  const columns: ProColumns<Course>[] = [
    {
      title: '课程封面',
      dataIndex: 'coverImage',
      width: 100,
      search: false,
      render: (coverImage) => (
        <Image
          src={coverImage as string || '/default-course.png'}
          alt="课程封面"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          preview={false}
        />
      ),
    },
    {
      title: '课程编号',
      dataIndex: 'code',
      width: 80,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      width: 140,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{record.name}</span>
        </Space>
      ),
    },
    getStatusColumn<any>({
      updateApi: updateCourse,
      actionRef,
    }),
    {
      title: '年龄段',
      dataIndex: 'ageGroupTag',
      width: 100,
      render: (value, _) => (
        <Tag color="blue">
          {value}
        </Tag>
      ),
    },
    {
      title: '课时信息',
      width: 120,
      search: false,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span>总课时: {record.courseHours}节</span>
          <span style={{ fontSize: 12, color: '#999' }}>
            单次{record.classDuration}分钟
          </span>
        </Space>
      ),
    },
    {
      title: '班级规模',
      dataIndex: 'classSizeMax',
      width: 100,
      search: false,
      render: (value, _) => (
        <span>{value}人</span>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 120,
      search: false,
      render: (price, record) => (
        <Space direction="vertical" size={0}>
          <span style={{ color: '#cf1322', fontWeight: 500 }}>
            ¥{price}
          </span>
          <Tag style={{ fontSize: 11 }}>
            {record.priceUnit === 'course' ? '每期' : '每课时'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '课程特色',
      dataIndex: 'features',
      width: 180,
      search: false,
      ellipsis: true,
      render: (features) => {
        const text = features?.props?.children

        if (!text || !Array.isArray(text) || text.length === 0) {
          return '-';
        }
        return (
          <Space size={[0, 4]} wrap>
            {(text as string[]).slice(0, 2).map((feature, index) => (
              <Tag key={index} color="cyan" style={{ fontSize: 11 }}>
                {feature}
              </Tag>
            ))}
            {(text as string[]).length > 2 && (
              <Tag style={{ fontSize: 11 }}>+{(text as string[]).length - 2}</Tag>
            )}
          </Space>
        );
      },
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
            description={`确定要删除课程 "${record.name}" 吗？`}
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
    <PageContainer
      className="course-page"
      breadcrumb={{
        items: [
          { title: '课程管理' },
          { title: '课程列表' },
        ],
      }}
    >
      <div className="course-layout">
        {/* 左侧分类组件 */}
        <div className="course-sidebar">
          <Category
            selectedCategoryId={selectedCategoryId}
            onSelect={handleCategorySelect}
            showCreate={true}
            title="课程分类"
          />
        </div>

        {/* 右侧表格区域 */}
        <div className="course-content">
          {/* 操作栏 */}
          <div className="content-header">
            <div className="header-left">
              <Input.Search
                placeholder="请输入课程名称或编号..."
                allowClear
                enterButton
                onSearch={handleSearch}
                style={{ width: 320 }}
              />
            </div>
            <div className="header-right">
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  新增课程
                </Button>
                <Button
                  icon={<ReloadOutlined spin={refreshing} />}
                  onClick={handleRefresh}
                  loading={refreshing}
                >
                  刷新
                </Button>
                <Popconfirm
                  title="确认批量删除"
                  description={`确定要删除选中的 ${selectedRows.length} 条记录吗？`}
                  onConfirm={handleBatchDelete}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button danger icon={<DeleteOutlined />} disabled={selectedRows.length === 0}>
                    批量删除
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          </div>

          {/* 表格 */}
          <div className="content-table">
            <ProTable<Course, CourseListParams>
              actionRef={actionRef}
              formRef={formRef}
              rowKey="id"
              columns={columns}
              request={wrappedRequest}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
                onChange: (page, pageSize) => {
                  setPagination({ current: page, pageSize });
                },
              }}
              rowSelection={{
                selectedRowKeys: selectedRows.map((row) => row.id!),
                onChange: (_, rows) => setSelectedRows(rows),
              }}
              toolBarRender={false}
              search={false}
              cardProps={{
                bodyStyle: { padding: 10 },
              }}
              scroll={{ x: 1500 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="暂无数据"
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CourseManagement;
