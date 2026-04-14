import React, { useRef, useState, useEffect } from 'react';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    Button,
    Space,
    Popconfirm,
    message,
    Tooltip,
    Switch,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import type { CoreAdvantage } from '@/services/home';
import {
    getCoreAdvantageList,
    deleteCoreAdvantage,
    updateCoreAdvantage,
} from '@/services/home';
import SpecialTable from '@/components/SpecialTable';
import CoreAdvantageForm from './Components/form';
import { ICON_MAP } from '@/components/IconsSelect';
import getTimeColumns from '@/components/TimeColumn';
import getStatusColumn from '@/components/StatusColumn';

const HomeContent: React.FC = () => {
    useEffect(() => {
        document.title = '核心优势';
    }, []);
    const actionRef = useRef<ActionType>();
    const [selectedRows, setSelectedRows] = useState<CoreAdvantage[]>([]);

    // Modal 状态
    const [formVisible, setFormVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<CoreAdvantage | null>(null);

    // 获取核心优势列表
    const fetchList = async (params: any) => {
        const res = await getCoreAdvantageList(params);
        return {
            data: res?.data?.list || [],
            success: res.success,
            total: res.data?.total || 0,
        };
    };

    // 处理删除
    const handleDelete = async (id: string) => {
        try {
            const res = await deleteCoreAdvantage(id);
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
                const res = await deleteCoreAdvantage(row.id!);
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
    const handleEdit = (record: CoreAdvantage) => {
        setCurrentRecord(record);
        setFormVisible(true);
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

    // 表格列定义
    const columns: ProColumns<CoreAdvantage>[] = [
        {
            title: '图标',
            dataIndex: 'icon',
            width: 80,
            search: false,
            render: (_, record) => {
                const renderer = ICON_MAP[record.icon || ''];
                return renderer ? renderer() : '-';
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 180,
            ellipsis: true,
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: 250,
            ellipsis: true,
        },
        getStatusColumn<any>({
            updateApi: updateCoreAdvantage,
            actionRef,
        }),
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
                        description={`确定要删除核心优势 "${record.title}" 吗？`}
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
                buttonText="核心优势"
                tableRef={actionRef}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
                searchKeyword='标题'
                items={[
                    {
                        title: '首页管理',
                    },
                    {
                        title: '核心优势',
                    }
                ]}
            />
            <CoreAdvantageForm
                visible={formVisible}
                record={currentRecord}
                onClose={handleCloseForm}
                onSuccess={handleFormSuccess}
            />
        </>
    );
};

export default HomeContent;
