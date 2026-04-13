import React, { useRef, useState } from 'react';
import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable, ActionType, ProFormInstance } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  Input,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import './index.less'

interface SpecialTableProps {
  //表格列配置
  columns: ProColumns<any>[];
  request: (params: any) => Promise<any>;
  //  请求的接口，例子：
  // request = { async(params) => {
  //   const res = await getStudentList(params);
  //   return {
  //     data: res.data?.list || [],
  //     success: res.success,
  //     total: res.data?.total || 0,
  //   };
  // }}
  //面包屑导航
  items?: { title: string }[];
  //按钮文本
  buttonText?: string;
  //新建回调函数
  handleAdd: () => void;
  //批量删除回调函数
  handleBatchDelete: () => void;
  // 表格操作引用，用于刷新等操作
  tableRef?: React.RefObject<ActionType> | React.MutableRefObject<ActionType | undefined>;
  // 选中的行（受控模式）
  selectedRows?: any[];
  // 选中行变化回调
  onSelectedRowsChange?: (rows: any[]) => void;
  // 搜索关键字
  searchKeyword?: string;
  // 是否显示操作栏（默认true）
  enabledActionBar?: boolean;
  // 是否隐藏行选择（默认false，显示选择列）
  hideRowSelection?: boolean;
}

const SpecialTable: React.FC<SpecialTableProps> = (props) => {
  const innerActionRef = useRef<ActionType>();
  const actionRef = props.tableRef || innerActionRef;
  const formRef = useRef<ProFormInstance>();
  const [innerSelectedRows, setInnerSelectedRows] = useState<any[]>([]);
  const selectedRows = props.selectedRows !== undefined ? props.selectedRows : innerSelectedRows;
  const setSelectedRows = props.onSelectedRowsChange || setInnerSelectedRows;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState<string>('');

  // 刷新表格
  const handleRefresh = async () => {
    setRefreshing(true);
    await actionRef.current?.reload();
    setRefreshing(false);
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setKeyword(value);
    // 重置到第一页并刷新
    actionRef.current?.reloadAndRest?.();
  };

  // 包装 request 函数，添加 keyword 参数
  const wrappedRequest = async (params: any) => {
    const res = await props.request({
      ...params,
      keyword: keyword || undefined,
    });
    return res;
  };

  return (
    <PageContainer
      className='page-con'
      breadcrumb={{
        items: props.items || []
      }}
    >
      {/* 学员列表表格 */}
      <div className='page-content'>
        {/* 操作栏 */}
        {props.enabledActionBar !== false && <div className='content-header'>
          <div className='header-left'>
            <Input.Search
              placeholder={`请输入${props.searchKeyword || '关键字'}...`}
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </div>
          <div className='header-right'>
            <Space>
              <Button type="primary" icon={<PlusOutlined />} onClick={props.handleAdd}>
                新增{props?.buttonText || ''}
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
                onConfirm={props.handleBatchDelete}
                okText="确定"
                cancelText="取消"
              >
                <Button danger icon={<DeleteOutlined />} disabled={selectedRows.length === 0}>
                  批量删除
                </Button>
              </Popconfirm>
            </Space>
          </div>

        </div>}

        <div className='content-table'>
          <ProTable<any, any>
            actionRef={actionRef}
            formRef={formRef}
            rowKey="id"
            columns={props.columns}
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
            rowSelection={props.hideRowSelection ? false : {
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
    </PageContainer>
  );
};

export default SpecialTable;
