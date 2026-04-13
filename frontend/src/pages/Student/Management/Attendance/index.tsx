import React, { useRef, useState } from 'react';
import { Drawer } from 'antd';
import { ProColumns, ActionType } from '@ant-design/pro-components';
import SpecialTable from '@/components/SpecialTable';
import { AttendanceParams, getStudentAttendance, getStudentList } from '@/services';
import { CommonParams } from '@/services/common';

interface AttendanceRecordProps {
    visible: boolean;
    studentId: string | null;
    onClose: () => void;
}

// 考勤记录列定义（可根据实际接口调整）
const columns: ProColumns[] = [
    {
        title: '课程',
        dataIndex: 'scheduleId',
        width: 100,
    },
    {
        title: '日期',
        dataIndex: 'attendanceDate',
        width: 120,
        valueType: 'date',
    },
    {
        title: '签到时间',
        dataIndex: 'checkInTime',
        width: 100,
        valueType: 'time',
    },
    {
        title: '签退时间',
        dataIndex: 'checkOutTime',
        width: 100,
        valueType: 'time',
    },
    {
        title: '出勤状态',
        dataIndex: 'status',
        width: 100,
        valueType: 'select',
        valueEnum: {
            1: { text: '出勤', status: 'Success' },
            2: { text: '请假', status: 'Default' },
            3: { text: '缺勤', status: 'Error' },
            4: { text: '迟到', status: 'Warning' },
        },
    },
    {
        title: '备注',
        dataIndex: 'notes',
        ellipsis: true,
    },
];

const AttendanceRecord: React.FC<AttendanceRecordProps> = ({
    visible,
    studentId,
    onClose,
}) => {
    const actionRef = useRef<ActionType>();

    // 获取考勤数据（替换为实际接口）
    const fetchAttendanceList = async (params: AttendanceParams) => {
        const res = await getStudentAttendance({ ...params, studentId });
        return {
            data: res?.data?.list || [],
            success: res.success,
            total: res.data?.total || 0,
        };
    };

    return (
        <Drawer
            title='考勤记录'
            placement="right"
            width={720}
            onClose={onClose}
            open={visible}
            destroyOnClose
        >
            <SpecialTable
                columns={columns}
                request={fetchAttendanceList}
                handleAdd={() => { }}
                handleBatchDelete={() => { }}
                tableRef={actionRef}
                enabledActionBar={false}
                hideRowSelection={true}
            />
        </Drawer>
    );
};

export default AttendanceRecord;
