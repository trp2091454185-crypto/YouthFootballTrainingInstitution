import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  Button,
  Space,
  Popconfirm,
  message,
  Avatar,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ManOutlined,
  WomanOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { Student, StudentListParams } from '@/services/student';
import {
  getStudentList,
  deleteStudent,
  batchDeleteStudents,
} from '@/services/student';
import SpecialTable from '@/components/SpecialTable';
import { POSITION, SCHOOLSTATUS } from '@/utils/constant';
import StudentDetail from './Detail';
import AttendanceRecord from './Attendance';

const StudentManagement: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '学员列表';
  }, []);
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<Student[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Student | null>(null);
  const [attendanceVisible, setAttendanceVisible] = useState(false);
  const [attendanceStudentId, setAttendanceStudentId] = useState<string | null>(null);

  //获取学员总数
  const [studentTotal, setStudentTotal] = useState(0);


  const fetchStudentList = async (params: StudentListParams) => {
    const res = await getStudentList(params);
    if (res.success) {
      setStudentTotal(res.data?.total || 0);
    }
    return {
      data: res?.data?.list || [],
      success: res.success,
      total: res.data?.total || 0,
    };
  };
  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteStudent(id);
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
      message.warning('请选择要删除的学员');
      return;
    }
    try {
      const res = await batchDeleteStudents(selectedRows.map((row) => row.id!));
      if (res.success) {
        message.success(`成功删除 ${selectedRows.length} 名学员`);
        setSelectedRows([]);
        actionRef.current?.reload();
      } else {
        message.error(res.errorMessage || '批量删除失败');
      }
    } catch (error) {
      message.error('批量删除失败');
    }
  };

  // 跳转到新增页面
  const handleAdd = () => {
    navigate(`/student/management/create/${studentTotal + 1}`);
  };

  // 跳转到编辑页面
  const handleEdit = (record: Student) => {
    navigate(`/student/management/edit/${studentTotal}/${record.id}`);
  };

  // 查看详情
  const handleViewDetail = (record: Student) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setDetailVisible(false);
    setCurrentRecord(null);
  };

  // 打开考勤记录
  const handleViewAttendance = (id: string) => {
    setAttendanceStudentId(id);
    setAttendanceVisible(true);
  };

  // 关闭考勤记录
  const handleCloseAttendance = () => {
    setAttendanceVisible(false);
    setAttendanceStudentId(null);
  };

  // 表格列定义
  const columns: ProColumns<Student>[] = [
    {
      title: '学员编号',
      dataIndex: 'studentNo',
      width: 120,
      render: (text) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
    },
    {
      title: '学员信息',
      dataIndex: 'name',
      width: 180,
      render: (_, record) => (
        <Space>
          <Avatar
            size="small"
            icon={record.gender === 1 ? <ManOutlined /> : <WomanOutlined />}
            style={{
              backgroundColor: record.gender === 1 ? '#1890ff' : '#eb2f96',
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: '#999' }}>
              {record.gender === 1 ? '男' : '女'} · {record.age}岁
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: '身高/体重',
      width: 120,
      render: (_, record) => (
        <span>
          {record.height}cm / {record.weight}kg
        </span>
      ),
    },
    {
      title: '培训方向',
      dataIndex: 'position',
      width: 100,
      valueType: 'select',
      fieldProps: {
        options: POSITION,
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 130,
      copyable: true,
    },
    {
      title: '入队日期',
      dataIndex: 'joinDate',
      width: 110,
      valueType: 'date',
    },
    {
      title: '学校信息',
      width: 150,
      render: (_, record) => {
        const statusItem = SCHOOLSTATUS.find((item) => item.value === record.status);
        return (
          <div>
            <div>{record.school || '-'}</div>
            <div style={{ fontSize: 12, color: '#999' }}>
              {statusItem?.label || '-'}
            </div>
          </div>
        );
      },
    },
    {
      title: '紧急联系人',
      width: 150,
      render: (_, record) => (
        <div>
          <div>{record.emergencyContact}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{record.emergencyPhone}</div>
        </div>
      ),
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      width: 150,
      ellipsis: true,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 150,
      ellipsis: true,
    },
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
          <Tooltip title="考勤记录">
            <Button
              type="text"
              icon={<CalendarOutlined />}
              onClick={() => handleViewAttendance(record.id!)}
            />
          </Tooltip>
          <Popconfirm
            title="确认删除"
            description={`确定要删除学员 "${record.name}" 吗？`}
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
        request={fetchStudentList}
        handleAdd={handleAdd}
        handleBatchDelete={handleBatchDelete}
        buttonText="学员"
        tableRef={actionRef}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        searchKeyword='学员编号或姓名'
        items={[
          {
            title: '学员管理',
          },
          {
            title: '学员列表',
          }
        ]}
      />
      <StudentDetail
        visible={detailVisible}
        record={currentRecord}
        onClose={handleCloseDetail}
      />
      <AttendanceRecord
        visible={attendanceVisible}
        studentId={attendanceStudentId}
        onClose={handleCloseAttendance}
      />
    </>
  );
};

export default StudentManagement;
