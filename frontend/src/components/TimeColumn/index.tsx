import type { ProColumns } from '@ant-design/pro-components';

/**
 * 获取时间列配置（创建时间、更新时间）
 * @returns ProTable 列配置数组
 */
export const getTimeColumns = <T extends Record<string, any> = any>(): ProColumns<T>[] => {
    return [
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 170,
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            width: 170,
            valueType: 'dateTime',
            search: false,
        },
    ];
};

export default getTimeColumns;
