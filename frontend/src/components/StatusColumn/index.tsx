import type { ProColumns } from '@ant-design/pro-components';
import { Switch, message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';

export interface StatusColumnOptions<T> {
  /** 更新状态的接口函数 */
  updateApi: (id: string, data: any) => Promise<{ success: boolean; errorMessage?: string }>;
  /** 表格 actionRef，用于刷新数据 */
  actionRef: React.MutableRefObject<ActionType | undefined>;
  /** 列宽度，默认 100 */
  width?: number;
}

/**
 * 获取状态列配置
 * @param options 配置选项
 * @returns ProTable 列配置
 */
export const getStatusColumn = <T extends { id?: string; status?: number } = any>(
  options: StatusColumnOptions<T>
): ProColumns<T> => {
  const { updateApi, actionRef, width = 100 } = options;

  // 切换状态
  const handleToggleStatus = async (id: string, newStatus: number) => {
    try {
      const res = await updateApi(id, { status: newStatus } as Partial<T>);
      if (res.success) {
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '状态更新失败');
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  return {
    title: '状态',
    dataIndex: 'status',
    width,
    valueType: 'select',
    fieldProps: {
      options: [
        { label: '显示', value: 2 },
        { label: '隐藏', value: 1 },
      ],
    },
    render: (_, record) => (
      <Switch
        checked={record.status === 2}
        checkedChildren="显示"
        unCheckedChildren="隐藏"
        onChange={(checked) => handleToggleStatus(record.id!, checked ? 2 : 1)}
      />
    ),
  };
};

export default getStatusColumn;
