export default [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/',
    component: '@/components/Layout/CustomLayout',
    routes: [
      {
        path: '/',            // 匹配根路径
        redirect: '/frontend',  // 重定向到前台首页
        hideInMenu: true,
      },
      {
        path: '/dashboard',
        name: '工作台',
        icon: 'form',
        component: './Dashboard',
      },
      {
        path: '/home',
        name: '首页资讯',
        icon: 'home',
        routes: [
          {
            path: '/home/carousel',
            name: '轮播图管理',
            component: './Home/carousel.tsx',
          },
          {
            path: '/home/content',
            name: '核心优势',
            component: './Home/content.tsx',
          },
        ],
      },
      {
        path: '/institution',
        name: '机构管理',
        icon: 'apartment',
        routes: [
          {
            path: '/institution/management',
            name: '信息上传',
            component: './Institution/Management',
          },
          {
            path: '/institution/management/create',
            name: '新增机构信息',
            component: './Institution/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/institution/management/edit/:id',
            name: '编辑机构信息',
            component: './Institution/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/institution/award',
            name: '奖项上传',
            component: './Institution/Award',
          },
          {
            path: '/institution/venue',
            name: '场地上传',
            component: './Institution/Venue',
          },
        ],
      },
      {
        path: '/student',
        name: '学员管理',
        icon: 'student',
        routes: [
          {
            path: '/student/management',
            name: '学员列表',
            component: './Student/Management',
          },
          {
            path: '/student/management/create/:total',
            name: '新增学员',
            component: './Student/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/student/management/edit/:total/:id',
            name: '编辑学员',
            component: './Student/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/student/archive',
            name: '成长档案',
            component: './Student/Archive',
          },
        ],
      },
      {
        path: '/team',
        name: '教练管理',
        icon: 'team',
        component: './Team/Management',
      },
      {
        path: '/team/management/create',
        name: '新增教练',
        component: './Team/components/Edit',
        hideInMenu: true,
      },
      {
        path: '/team/management/edit/:id',
        name: '编辑教练',
        component: './Team/components/Edit',
        hideInMenu: true,
      },
      {
        path: '/course',
        name: '课程管理',
        icon: 'course',
        routes: [
          {
            path: '/course/management',
            name: '课程信息',
            component: './Course/Management',
          },
          {
            path: '/course/management/create',
            name: '新增课程',
            component: './Course/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/course/management/edit/:id',
            name: '编辑课程',
            component: './Course/Management/Edit',
            hideInMenu: true,
          },
          {
            path: '/course/statistics',
            name: '课程统计',
            component: './Course/Statistics',
          },
        ],
      },
      {
        path: '/registration',
        name: '报名管理',
        icon: 'registration',
        routes: [
          {
            path: '/registration/management',
            name: '报名信息',
            component: './Registration/Management',
          },
          {
            path: '/registration/statistics',
            name: '报名统计',
            component: './Registration/Statistics',
          },
        ],
      },
      {
        path: '/feedback',
        name: '反馈管理',
        icon: 'feedback',
        component: './Feedback',
      },
      {
        path: '/system',
        name: '系统管理',
        icon: 'system',
        routes: [
          {
            path: '/system/users',
            name: '用户列表',
            component: './System/Users',
          },
          {
            path: '/system/website',
            name: '网站配置',
            component: './System/Website',
          },
          {
            path: '/system/log',
            name: '操作日志',
            component: './System/Log',
          },
        ],
      },
    ],
  },
  {
    path: '/frontend',
    component: '@/components/Layout/FrontendLayout',
    routes: [
      {
        path: '/frontend',
        name: '首页',
        component: './Frontend/Home',
      },
      {
        path: '/frontend/about',
        name: '机构介绍',
        component: './Frontend/About',
      },
      {
        path: '/frontend/coaches',
        name: '教练团队',
        component: './Frontend/Coaches',
      },
      {
        path: '/frontend/courses',
        name: '课程体系',
        component: './Frontend/Courses',
      },
      {
        path: '/frontend/registration',
        name: '报名咨询',
        component: './Frontend/Registration',
      },
      {
        path: '/frontend/feedback',
        name: '反馈留言',
        component: './Frontend/Feedback',
      },
    ],
  },
];
