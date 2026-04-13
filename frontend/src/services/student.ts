import request from '@/utils/request';
import { CommonParams } from './common';

// 学员信息表 (student)
export interface Student {
  id?: string;
  studentNo: string;
  name: string;
  avatar?: string;
  gender: 1 | 2; // 1男 2女
  birthDate: string;
  age?: number;
  idCard?: string;
  school?: string;
  grade?: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  relation?: string;
  address?: string;
  position?: string; // 培养方向
  medicalNotes?: string;
  footSize?: string;
  height?: number;
  weight?: number;
  joinDate: string;
  status: 1 | 2 | 3 | 4; // 1在读 2结业 3休学 4退学
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentListParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
  Student?: Student;
}

export interface AttendanceParams extends CommonParams {
  studentId: string;
}


export interface StudentStatistics {
  total: number;
  active: number; // 在读
  graduated: number; // 结业
  suspended: number; // 休学
  dropped: number; // 退学
}

// 学员报班记录 (student_enrollment)
export interface StudentEnrollment {
  id?: string;
  studentId: string;
  courseId: string;
  classId: string;
  enrollDate: string;
  expireDate?: string;
  totalHours: number;
  remainingHours: number;
  amount: number;
  status: 1 | 2 | 3 | 4; // 1有效 2已转班 3已退班 4已结业
  createdAt?: string;
}

// 学员考勤记录 (student_attendance)
export interface StudentAttendance {
  id?: string;
  studentId: string;
  classId: string;
  scheduleId?: string;
  attendanceDate: string;
  status: 1 | 2 | 3 | 4; // 1出勤 2请假 3缺勤 4迟到
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
  createdBy?: string;
  createdAt?: string;
}

// 学员成长档案 (student_growth_record)
export interface StudentGrowthRecord {
  id?: string;
  studentId: string;
  recordType: 1 | 2 | 3 | 4 | 5; // 1训练表现 2比赛记录 3体测数据 4获奖记录 5其他
  title: string;
  content?: string;
  images?: string[];
  videos?: string[];
  recordDate: string;
  coachId?: string;
  tags?: string[];
  isHighlight: 0 | 1;
  status: 0 | 1;
  createdAt?: string;
}

// 学员体测数据 (student_fitness_test)
export interface StudentFitnessTest {
  id?: string;
  studentId: string;
  testDate: string;
  height?: number;
  weight?: number;
  bmi?: number;
  vitalCapacity?: number; // 肺活量
  sprintFiveHundred?: number; // 50米跑
  sitAndReach?: number; // 坐位体前屈
  standingLongJump?: number; // 立定跳远
  sitUps?: number; // 仰卧起坐
  enduranceRun?: string; // 耐力跑成绩
  dribbling?: number; // 带球绕桩
  passingAccuracy?: number; // 传球准确率
  shootingAccuracy?: number; // 射门准确率
  coachId?: string;
  remarks?: string;
  createdAt?: string;
}

// ==================== 学员管理 API ====================

// 获取学员列表
export const getStudentList = (params: StudentListParams) => {
  return request('/api/v1/student/Student', {
    method: 'GET',
    params,
  });
};

// 获取学员详情
export const getStudentDetail = (id: string) => {
  return request(`/api/v1/student/Student/${id}`, {
    method: 'GET',
  });
};

// 创建学员
export const createStudent = (data: Student) => {
  return request('/api/v1/student/Student', {
    method: 'POST',
    data,
  });
};

// 更新学员
export const updateStudent = (id: string, data: Student) => {
  return request(`/api/v1/student/Student/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除学员
export const deleteStudent = (id: string) => {
  return request(`/api/v1/student/Student/${id}`, {
    method: 'DELETE',
  });
};

// 批量删除学员
export const batchDeleteStudents = (ids: string[]) => {
  return request(`/api/v1/student/Student/${ids}`, {
    method: 'DELETE',
    data: { ids },
  });
};

// 获取学员统计
export const getStudentStatistics = () => {
  return request('/api/student/statistics', {
    method: 'GET',
  });
};

// ==================== 报班记录 API ====================

// 获取学员报班记录
export const getStudentEnrollments = (studentId: string) => {
  return request(`/api/student/${studentId}/enrollments`, {
    method: 'GET',
  });
};

// 报名课程
export const enrollCourse = (data: StudentEnrollment) => {
  return request('/api/student/enrollment/create', {
    method: 'POST',
    data,
  });
};

// ==================== 考勤记录 API ====================

// 获取学员考勤记录
export const getStudentAttendance = (params: AttendanceParams) => {
  return request('/api/v1/student/attendance', {
    method: 'GET',
    params,
  });
};

// 记录考勤
export const recordAttendance = (data: StudentAttendance) => {
  return request('/api/student/attendance/create', {
    method: 'POST',
    data,
  });
};

// 批量记录考勤
export const batchRecordAttendance = (data: { classId: string; attendanceDate: string; records: { studentId: string; status: number }[] }) => {
  return request('/api/student/attendance/batch', {
    method: 'POST',
    data,
  });
};

// ==================== 成长档案 API ====================

// 获取学员成长档案
export const getStudentGrowthRecords = (studentId: string, params?: { recordType?: number }) => {
  return request(`/api/student/${studentId}/growth-records`, {
    method: 'GET',
    params,
  });
};

// 创建成长档案记录
export const createGrowthRecord = (data: StudentGrowthRecord) => {
  return request('/api/student/growth-record/create', {
    method: 'POST',
    data,
  });
};

// 更新成长档案记录
export const updateGrowthRecord = (id: string, data: StudentGrowthRecord) => {
  return request(`/api/student/growth-record/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除成长档案记录
export const deleteGrowthRecord = (id: string) => {
  return request(`/api/student/growth-record/delete/${id}`, {
    method: 'DELETE',
  });
};

// ==================== 体测数据 API ====================

// 获取学员体测记录
export const getStudentFitnessTests = (studentId: string) => {
  return request(`/api/student/${studentId}/fitness-tests`, {
    method: 'GET',
  });
};

// 创建体测记录
export const createFitnessTest = (data: StudentFitnessTest) => {
  return request('/api/student/fitness-test/create', {
    method: 'POST',
    data,
  });
};

// 更新体测记录
export const updateFitnessTest = (id: string, data: StudentFitnessTest) => {
  return request(`/api/student/fitness-test/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除体测记录
export const deleteFitnessTest = (id: string) => {
  return request(`/api/student/fitness-test/delete/${id}`, {
    method: 'DELETE',
  });
};
