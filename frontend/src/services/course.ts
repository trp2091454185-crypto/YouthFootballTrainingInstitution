import request from '@/utils/request';

// 课程分类表 (course_category)
export interface CourseCategory {
  id?: string;
  name: string;
  code?: string;
  description?: string;
  parentId: string; // 0为顶级
  sortOrder: number;
  status: 0 | 1;
  createdAt?: string;
  children?: CourseCategory[];
}

// 课程信息表 (course)
export interface Course {
  id?: string;
  categoryId: string;
  name: string;
  code?: string;
  coverImage?: string;
  images?: string[];
  suitableAgeMin: number;
  suitableAgeMax: number;
  ageGroupTag?: string; // U6/U8/U10/U12/U14/U16
  courseHours: number; // 总课时数
  classDuration: number; // 单次课时(分钟)
  classSizeMin: number; // 最少开班人数
  classSizeMax: number; // 最多容纳人数
  price: number;
  priceUnit: 'course' | 'hour'; // course期/hour课时
  description?: string;
  outline?: string[];
  objectives?: string[];
  features?: string[];
  requirements?: string;
  equipment?: string;
  sortOrder: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

// 班级表 (course_class)
export interface CourseClass {
  id?: string;
  courseId: string;
  name: string;
  code?: string;
  coachId?: string;
  assistantCoachId?: string;
  venue?: string;
  scheduleDesc?: string; // 上课时间描述
  startDate?: string;
  endDate?: string;
  maxStudents: number;
  currentStudents: number;
  status: 0 | 1 | 2; // 0已结课 1招生中 2开课中
  createdAt?: string;
  updatedAt?: string;
  // 关联数据
  courseName?: string;
  coachName?: string;
}

// 班级排课表 (class_schedule)
export interface ClassSchedule {
  id?: string;
  classId: string;
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 星期几
  startTime: string; // HH:mm
  endTime: string;
  status: 0 | 1;
  createdAt?: string;
}

export interface CourseListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  categoryId?: string;
  status?: number;
  ageGroup?: string;
}

export interface ClassListParams {
  current?: number;
  pageSize?: number;
  courseId?: string;
  coachId?: string;
  status?: number;
}

// ==================== 课程分类 API ====================

// 获取课程分类列表
export const getCourseCategoryList = () => {
  return request('/api/v1/course/category', {
    method: 'GET',
  });
};

// 创建课程分类
export const createCourseCategory = (data: CourseCategory) => {
  return request('/api/v1/course/category', {
    method: 'POST',
    data,
  });
};

// 更新课程分类
export const updateCourseCategory = (id: string, data: CourseCategory) => {
  return request(`/api/v1/course/category/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除课程分类
export const deleteCourseCategory = (ids: string) => {
  return request(`/api/v1/course/category/${ids}`, {
    method: 'DELETE',
    data: { ids },
  });
};

// ==================== 课程 API ====================

// 获取课程列表
export const getCourseList = (params: CourseListParams) => {
  return request('/api/v1/course/Course', {
    method: 'GET',
    params,
  });
};

// 获取课程详情
export const getCourseDetail = (id: string) => {
  return request(`/api/v1/course/Course/${id}`, {
    method: 'GET',
  });
};

// 创建课程
export const createCourse = (data: Course) => {
  return request('/api/v1/course/Course', {
    method: 'POST',
    data,
  });
};

// 更新课程
export const updateCourse = (id: string, data: Course) => {
  return request(`/api/v1/course/Course/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除课程
export const deleteCourse = (id: string) => {
  return request(`/api/v1/course/Course/${id}`, {
    method: 'DELETE',
  });
};

// ==================== 班级 API ====================

// 获取班级列表
export const getClassList = (params: ClassListParams) => {
  return request('/api/course/class/list', {
    method: 'GET',
    params,
  });
};

// 获取班级详情
export const getClassDetail = (id: string) => {
  return request(`/api/course/class/detail/${id}`, {
    method: 'GET',
  });
};

// 创建班级
export const createClass = (data: CourseClass) => {
  return request('/api/course/class/create', {
    method: 'POST',
    data,
  });
};

// 更新班级
export const updateClass = (id: string, data: CourseClass) => {
  return request(`/api/course/class/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除班级
export const deleteClass = (id: string) => {
  return request(`/api/course/class/delete/${id}`, {
    method: 'DELETE',
  });
};

// ==================== 排课 API ====================

// 获取班级排课表
export const getClassSchedules = (classId: string) => {
  return request(`/api/course/class/${classId}/schedules`, {
    method: 'GET',
  });
};

// 创建排课
export const createClassSchedule = (data: ClassSchedule) => {
  return request('/api/course/class/schedule/create', {
    method: 'POST',
    data,
  });
};

// 更新排课
export const updateClassSchedule = (id: string, data: ClassSchedule) => {
  return request(`/api/course/class/schedule/update/${id}`, {
    method: 'PUT',
    data,
  });
};

// 删除排课
export const deleteClassSchedule = (id: string) => {
  return request(`/api/course/class/schedule/delete/${id}`, {
    method: 'DELETE',
  });
};
