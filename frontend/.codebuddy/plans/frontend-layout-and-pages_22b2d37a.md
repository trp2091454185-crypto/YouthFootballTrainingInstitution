---
name: frontend-layout-and-pages
overview: 创建前台展示布局和页面，包括顶部居中导航栏布局组件、6个前台页面的初始化，以及退出登录时跳转到前台的逻辑修改
design:
  architecture:
    framework: react
  styleKeywords:
    - Sports Theme
    - Fresh & Vibrant
    - Clean Modern
    - Card-based Layout
    - Glassmorphism Navigation
  fontSystem:
    fontFamily: PingFang SC, -apple-system, BlinkMacSystemFont
    heading:
      size: 28px
      weight: 700
    subheading:
      size: 20px
      weight: 600
    body:
      size: 15px
      weight: 400
  colorSystem:
    primary:
      - "#2E7D32"
      - "#1B5E20"
      - "#4CAF50"
    background:
      - "#FAFAFA"
      - "#FFFFFF"
      - "#F1F8E9"
    text:
      - "#212121"
      - "#424242"
      - "#757575"
    functional:
      - "#FF5722"
      - "#4CAF50"
      - "#F44336"
      - "#FFC107"
todos:
  - id: create-frontend-layout
    content: 创建 FrontendLayout 前台布局组件及样式文件（顶部居中水平导航）
    status: completed
  - id: update-routes-config
    content: 修改 routes.ts 新增 /frontend 前台路由组和6个页面路由
    status: completed
    dependencies:
      - create-frontend-layout
  - id: update-logout-logic
    content: 修改 CustomLayout.tsx 退出登录跳转路径至 /frontend
    status: completed
  - id: init-frontend-pages
    content: 初始化 Frontend 目录下6个前台页面组件（Home/About/Courses/Coaches/Registration/Feedback）
    status: completed
    dependencies:
      - create-frontend-layout
      - update-routes-config
---

## 产品概述

为现有足球青训机构后台管理系统新增一套前台展示网站，管理员退出登录后进入前台页面。前台采用顶部居中导航栏布局（无侧边栏），面向公众展示机构信息并提供报名咨询和反馈留言功能。

## 核心功能

- **前台布局**：新建 FrontendLayout 组件，导航菜单水平居中显示在顶部 Header 中，无侧边栏，下方为内容区域
- **退出登录跳转**：修改 CustomLayout 退出登录逻辑，从 `navigate('/login')` 改为 `navigate('/frontend')`
- **前台路由配置**：在 routes.ts 新增 `/frontend` 路由组，使用 FrontendLayout 布局
- **六个前台页面初始化**：
- 首页（Home）：机构概览、轮播图、亮点展示
- 机构介绍（About）：机构简介、荣誉奖项、场地设施
- 教练团队（Coaches）：教练列表、资质履历展示
- 课程体系（Courses）：课程分类、课程详情介绍
- 报名咨询（Registration）：在线报名表单、咨询入口
- 反馈留言（Feedback）：留言表单提交功能

## 技术栈

- 框架：React + TypeScript + UmiJS（与现有项目一致）
- UI 组件库：Ant Design（复用现有依赖）
- 样式方案：Less（与现有项目一致）
- 路由：UmiJS 约定式路由配置

## 实现方案

### 架构策略

采用**双布局并行架构**：保留原有后台管理 `CustomLayout` 不变，新建 `FrontendLayout` 作为前台布局。在 `routes.ts` 中新增独立的 `/frontend` 路由组指向前台布局和前台页面。退出登录时通过 `navigate('/frontend')` 切换到前台上下文。

### 关键技术决策

1. **FrontendLayout 设计**：使用 Ant Design 的 `Layout.Header` + `Menu(mode="horizontal")` 实现顶部居中导航，`Layout.Content` 作为内容区域，完全不使用 Sider 组件
2. **路由隔离**：前台路由 `/frontend/*` 与后台路由 `/` 完全分离，各自使用独立 Layout 组件，互不干扰
3. **页面初始化**：每个前台页面导出一个基础 React 函数组件，包含页面标题和占位结构，便于后续填充实际内容
4. **样式文件**：为 FrontendLayout 创建独立 less 文件，不修改现有的 index.less

### 数据流

用户点击"退出登录" -> localStorage.clear() -> navigate('/frontend') -> FrontendLayout 渲染 -> 顶部水平菜单 + 内容区 Outlet -> 前台各页面

## 目录结构

```
src/
├── components/
│   └── Layout/
│       ├── CustomLayout.tsx          # [MODIFY] 修改退出登录跳转路径
│       ├── index.less                # 不变
│       └── FrontendLayout.tsx        # [NEW] 前台布局组件，顶部居中导航+内容区
│       └── FrontendLayout.less       # [NEW] 前台布局样式
├── config/
│   └── routes.ts                     # [MODIFY] 新增 /frontend 路由组
├── pages/
│   └── Frontend/                     # [NEW] 前台页面目录
│       ├── index.tsx                 # [NEW] 首页 - 机构概览、轮播图、亮点展示
│       ├── About.tsx                 # [NEW] 机构介绍页 - 简介、荣誉、场地
│       ├── Coaches.tsx               # [NEW] 教练团队页 - 教练列表展示
│       ├── Courses.tsx               # [NEW] 课程体系页 - 课程分类详情
│       ├── Registration.tsx          # [NEW] 报名咨询页 - 在线报名表单
│       └── Feedback.tsx              # [NEW] 反馈留言页 - 留言表单
```

## 实现注意事项

- 退出登录仅修改 `navigate` 目标路径，不清除 localStorage 的逻辑保持不变
- 前台路由使用 `layout: false` 或独立 layout 配置避免与后台 Layout 冲突
- FrontendLayout 的 Menu 使用 `mode="horizontal"` 并通过样式实现居中效果
- 各页面组件暂时使用基础占位内容，预留数据接口对接空间

## 设计风格

采用现代体育主题的清新活力风格，体现足球青训的专业性与青春气息。整体设计以绿色（足球场主色）和深蓝色为主色调，搭配明亮的强调色，营造专业且富有活力的视觉体验。

## 页面规划

共1个布局 + 6个页面，以下为核心页面设计：

### 全局布局（FrontendLayout）

- **顶部导航栏**：固定高度64px，白色半透明背景带毛玻璃效果，Logo居左、水平导航菜单居中、操作区域居右
- **内容区**：全宽自适应内容区域，支持页面切换过渡动画

### 首页（Home）

- **Hero横幅区块**：全宽大图背景区，机构名称+Slogan+CTA按钮
- **核心亮点区块**：三列卡片展示机构核心优势（师资/课程/成果）
- **快速导航区块**：图标+文字快捷入口链接到其他页面

### 机构介绍（About）

- **机构简介区块**：图文混排，左侧图片右侧文字描述
- **荣誉奖项区块**：时间线或卡片式展示获奖信息
- **场地展示区块**：图片画廊形式展示训练场地

### 教练团队（Coaches）

- **团队总览区块**：教练头像网格卡片布局，悬停显示详细信息
- **筛选标签**：按执教领域分类筛选

### 课程体系（Courses）

- **课程分类Tab**：不同年龄段/级别的课程Tab切换
- **课程卡片列表**：课程名称、适合年龄、课时、简介

### 报名咨询（Registration）

- **报名表单**：学生信息、家长联系方式、意向课程选择
- **咨询信息**：联系电话、地址等联系信息侧边展示

### 反馈留言（Feedback）

- **留言表单**：姓名、联系方式、留言内容、评分
- **提交反馈**：表单校验+提交成功提示

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 探索现有项目中后台页面的组件模式和代码约定，确保新建的前台页面遵循一致的风格规范
- Expected outcome: 明确现有页面组件的结构模式和数据调用方式，使新页面与之保持一致