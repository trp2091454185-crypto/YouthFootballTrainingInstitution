import React, { useRef, useState, useEffect } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Space, Tag, Tooltip, Modal, Descriptions, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { SysOperationLog, SysLogListParams } from '@/services/system';
import { getLogList, clearLogs } from '@/services/system';
import SpecialTable from '@/components/SpecialTable';

const LogManagement: React.FC = () => {
  useEffect(() => {
    document.title = '操作日志';
  }, []);
  const actionRef = useRef<ActionType>();
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SysOperationLog | null>(null);

  // 获取日志列表
  const fetchLogList = async (params: SysLogListParams) => {
    const res = await getLogList(params);
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };

  // 查看详情
  const handleViewDetail = (record: SysOperationLog) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setDetailVisible(false);
    setCurrentRecord(null);
  };

  // 清空日志
  const handleClearLogs = async () => {
    try {
      const res = await clearLogs();
      if (res.success) {
        message.success('日志清空成功');
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '清空失败');
      }
    } catch (error) {
      message.error('清空失败');
    }
  };

  // 表格列定义
  const columns: ProColumns<SysOperationLog>[] = [
    {
      title: '操作人',
      dataIndex: 'username',
      width: 120,
    },
    {
      title: '模块',
      dataIndex: 'module',
      width: 120,
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      width: 120,
    },
    {
      title: '请求方法',
      dataIndex: 'requestMethod',
      width: 90,
      search: false,
      render: (text) => {
        const colorMap: Record<string, string> = {
          GET: 'green',
          POST: 'blue',
          PUT: 'orange',
          DELETE: 'red',
        };
        return <Tag color={colorMap[text as string] || 'default'}>{text}</Tag>;
      },
    },
    {
      title: '请求URL',
      dataIndex: 'requestUrl',
      width: 200,
      ellipsis: true,
      search: false,
      copyable: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 140,
      search: false,
    },
    {
      title: '执行时长',
      dataIndex: 'executeTime',
      width: 100,
      search: false,
      render: (text) => `${text}ms`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      valueType: 'select',
      valueEnum: {
        0: { text: '失败', status: 'Error' },
        1: { text: '成功', status: 'Success' },
      },
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      width: 180,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
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
        </Space>
      ),
    },
  ];

  return (
    <>
      <SpecialTable
        columns={columns}
        request={fetchLogList}
        enabledActionBar={false}
        handleBatchDelete={handleClearLogs}
        tableRef={actionRef}
        hideRowSelection={true}
        items={[
          {
            title: '系统管理',
          },
          {
            title: '操作日志',
          },
        ]}
      />
      <Modal
        title="日志详情"
        open={detailVisible}
        onCancel={handleCloseDetail}
        footer={null}
        width={700}
      >
        {currentRecord && (
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="操作人">{currentRecord.username}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {currentRecord.status === 1 ? (
                <Tag color="success">成功</Tag>
              ) : (
                <Tag color="error">失败</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="模块" span={2}>{currentRecord.module}</Descriptions.Item>
            <Descriptions.Item label="操作类型" span={2}>{currentRecord.action}</Descriptions.Item>
            <Descriptions.Item label="请求方法">
              <Tag color={
                currentRecord.requestMethod === 'GET' ? 'green' :
                  currentRecord.requestMethod === 'POST' ? 'blue' :
                    currentRecord.requestMethod === 'PUT' ? 'orange' : 'red'
              }>
                {currentRecord.requestMethod}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="IP地址">{currentRecord.ip || '-'}</Descriptions.Item>
            <Descriptions.Item label="请求URL" span={2}>
              <span style={{ wordBreak: 'break-all' }}>{currentRecord.requestUrl || '-'}</span>
            </Descriptions.Item>
            <Descriptions.Item label="执行时长">{currentRecord.executeTime ? `${currentRecord.executeTime}ms` : '-'}</Descriptions.Item>
            <Descriptions.Item label="操作时间">{currentRecord.createdAt || '-'}</Descriptions.Item>
            {currentRecord.errorMsg && (
              <Descriptions.Item label="错误信息" span={2}>
                <pre style={{ margin: 0, color: '#ff4d4f', whiteSpace: 'pre-wrap' }}>
                  {currentRecord.errorMsg}
                </pre>
              </Descriptions.Item>
            )}
            {currentRecord.requestParams && (
              <Descriptions.Item label="请求参数" span={2}>
                <pre style={{ margin: 0, maxHeight: 200, overflow: 'auto', background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
                  {typeof currentRecord.requestParams === 'string'
                    ? currentRecord.requestParams
                    : JSON.stringify(currentRecord.requestParams, null, 2)}
                </pre>
              </Descriptions.Item>
            )}
            {currentRecord.responseData && (
              <Descriptions.Item label="响应数据" span={2}>
                <pre style={{ margin: 0, maxHeight: 200, overflow: 'auto', background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
                  {typeof currentRecord.responseData === 'string'
                    ? currentRecord.responseData
                    : JSON.stringify(currentRecord.responseData, null, 2)}
                </pre>
              </Descriptions.Item>
            )}
            {currentRecord.userAgent && (
              <Descriptions.Item label="User-Agent" span={2}>
                <span style={{ fontSize: 12, color: '#666' }}>{currentRecord.userAgent}</span>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default LogManagement;
