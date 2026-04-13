import { MockData } from './types';

// 学员等级
const studentLevels = ['初级', '中级', '高级', '精英', '职业'];

// 学员状态
const studentStatuses = ['在读', '休学', '毕业', '退课'];

// 训练方向
const trainingDirections = ['进攻', '防守', '守门', '全能'];

// 生成随机日期
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// 生成随机手机号
const randomPhone = () => {
  const prefix = ['138', '139', '137', '136', '135', '134', '150', '151', '152', '157', '158', '159', '182', '183', '187', '188'];
  const pre = prefix[Math.floor(Math.random() * prefix.length)];
  const suffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return pre + suffix;
};

// 生成学员数据
const generateStudents = (count: number): MockData.Student[] => {
  const students: MockData.Student[] = [];
  const surnames = ['张', '王', '李', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '林', '何', '高', '罗'];
  const names = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀', '霞', '平'];

  for (let i = 0; i < count; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const joinDate = randomDate(new Date(2020, 0, 1), new Date());
    const birthDate = randomDate(new Date(2005, 0, 1), new Date(2015, 0, 1));
    
    students.push({
      id: `STU${String(i + 1).padStart(6, '0')}`,
      name: surname + name,
      gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE',
      age: new Date().getFullYear() - birthDate.getFullYear(),
      phone: randomPhone(),
      level: studentLevels[Math.floor(Math.random() * studentLevels.length)],
      status: studentStatuses[Math.floor(Math.random() * studentStatuses.length)],
      direction: trainingDirections[Math.floor(Math.random() * trainingDirections.length)],
      joinDate: joinDate.toISOString().split('T')[0],
      birthDate: birthDate.toISOString().split('T')[0],
      emergencyContact: randomPhone(),
      emergencyContactName: surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)],
      address: '北京市朝阳区某某街道' + Math.floor(Math.random() * 100) + '号',
      school: '北京市第' + Math.floor(Math.random() * 100 + 1) + '中学',
      height: Math.floor(Math.random() * 50 + 150),
      weight: Math.floor(Math.random() * 40 + 40),
      remark: Math.random() > 0.7 ? '该学员表现优秀，有潜力成为职业选手' : '',
      createTime: joinDate.toISOString(),
      updateTime: new Date().toISOString(),
    });
  }
  return students;
};

const students = generateStudents(156);

export default {
  // 获取学员列表
  'GET /api/student/list': (req: any, res: any) => {
    const { current = 1, pageSize = 10, name, phone, level, status, direction } = req.query;
    
    let list = [...students];
    
    // 搜索过滤
    if (name) {
      list = list.filter(item => item.name.includes(name));
    }
    if (phone) {
      list = list.filter(item => item.phone.includes(phone));
    }
    if (level) {
      list = list.filter(item => item.level === level);
    }
    if (status) {
      list = list.filter(item => item.status === status);
    }
    if (direction) {
      list = list.filter(item => item.direction === direction);
    }
    
    // 分页
    const start = (Number(current) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const pageList = list.slice(start, end);
    
    res.json({
      success: true,
      data: {
        list: pageList,
        current: Number(current),
        pageSize: Number(pageSize),
        total: list.length,
      },
      errorCode: 0,
    });
  },

  // 获取学员详情
  'GET /api/student/detail/:id': (req: any, res: any) => {
    const { id } = req.params;
    const student = students.find(item => item.id === id);
    
    if (student) {
      res.json({
        success: true,
        data: student,
        errorCode: 0,
      });
    } else {
      res.json({
        success: false,
        errorMessage: '学员不存在',
        errorCode: 404,
      });
    }
  },

  // 创建学员
  'POST /api/student/create': (req: any, res: any) => {
    const { body } = req;
    const newStudent: MockData.Student = {
      ...body,
      id: `STU${String(students.length + 1).padStart(6, '0')}`,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };
    students.unshift(newStudent);
    
    res.json({
      success: true,
      data: newStudent,
      errorCode: 0,
    });
  },

  // 更新学员
  'PUT /api/student/update/:id': (req: any, res: any) => {
    const { id } = req.params;
    const { body } = req;
    const index = students.findIndex(item => item.id === id);
    
    if (index > -1) {
      students[index] = {
        ...students[index],
        ...body,
        updateTime: new Date().toISOString(),
      };
      res.json({
        success: true,
        data: students[index],
        errorCode: 0,
      });
    } else {
      res.json({
        success: false,
        errorMessage: '学员不存在',
        errorCode: 404,
      });
    }
  },

  // 删除学员
  'DELETE /api/student/delete/:id': (req: any, res: any) => {
    const { id } = req.params;
    const index = students.findIndex(item => item.id === id);
    
    if (index > -1) {
      students.splice(index, 1);
      res.json({
        success: true,
        errorCode: 0,
      });
    } else {
      res.json({
        success: false,
        errorMessage: '学员不存在',
        errorCode: 404,
      });
    }
  },

  // 批量删除学员
  'DELETE /api/student/batchDelete': (req: any, res: any) => {
    const { ids } = req.body;
    ids.forEach((id: string) => {
      const index = students.findIndex(item => item.id === id);
      if (index > -1) {
        students.splice(index, 1);
      }
    });
    
    res.json({
      success: true,
      errorCode: 0,
    });
  },

  // 获取学员统计
  'GET /api/student/statistics': (req: any, res: any) => {
    const total = students.length;
    const active = students.filter(item => item.status === '在读').length;
    const graduated = students.filter(item => item.status === '毕业').length;
    const suspended = students.filter(item => item.status === '休学').length;
    const dropped = students.filter(item => item.status === '退课').length;
    
    res.json({
      success: true,
      data: {
        total,
        active,
        graduated,
        suspended,
        dropped,
      },
      errorCode: 0,
    });
  },
};
