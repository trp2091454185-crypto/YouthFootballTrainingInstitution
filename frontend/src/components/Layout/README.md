# 自定义布局组件使用说明

## 组件位置

```
src/components/Layout/
├── CustomLayout.tsx      # 主布局组件
├── CustomLayout.less      # 布局样式
├── index.ts             # 导出文件
└── README.md           # 使用说明
```

## 如何使用自定义布局

### 方式1：全局使用（推荐）

修改路由配置 `src/config/routes.ts`，添加wrapper包裹：

```typescript
import CustomLayout from '@/components/Layout';

export default [
  {
    path: '/',
    component: CustomLayout, // 使用自定义布局
    routes: [
      {
        path: '/',
        name: '首页',
        icon: 'home',
        component: './Dashboard',
      },
      {
        path: '/member',
        name: '会员管理',
        icon: 'user',
        routes: [
          {
            path: '/member/list',
            name: '会员列表',
            component: './Member',
          },
        ],
      },
      // ... 其他路由
    ],
  },
];
```

### 方式2：禁用默认布局

修改 `.umirc.ts`：

```typescript
import { defineConfig } from '@umijs/max';
import routes from './src/config/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false, // 禁用默认布局
  routes,
  npmClient: 'npm',
  // 暴露环境变量
  define: {
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
  },
});
```

## 布局特性

### 1. 侧边栏
- ✅ 暗色主题
- ✅ 可折叠/展开
- ✅ 菜单高亮当前路由
- ✅ 自定义Logo

### 2. 顶部导航栏
- ✅ 面包屑导航
- ✅ 折叠按钮
- ✅ 用户信息下拉菜单
- ✅ 响应式设计

### 3. 内容区
- ✅ 自动适配剩余空间
- ✅ 滚动优化
- ✅ 响应式布局

## 自定义配置

### 修改Logo

编辑 `CustomLayout.tsx` 中的logo部分：

```typescript
<div className="logo">
  <img src="/images/your-logo.png" alt="logo" />
</div>
```

### 修改主题色

编辑 `CustomLayout.less` 中的颜色变量：

```less
.custom-sider {
  .ant-menu {
    background: #001529; // 修改侧边栏背景色

    .ant-menu-item-selected {
      color: #1890ff; // 修改选中颜色
    }
  }
}
```

### 修改菜单项

编辑 `CustomLayout.tsx` 中的 `menuItems`：

```typescript
const menuItems: MenuProps['items'] = [
  {
    key: '/your-path',
    icon: <YourIcon />,
    label: '菜单名称',
  },
  // ... 更多菜单项
];
```

## 响应式设计

布局组件已适配移动端：
- 小于768px时侧边栏自动隐藏
- 通过折叠按钮可显示侧边栏
- 优化了移动端的内容区域

## 注意事项

1. **不要修改 `.umi/plugin-layout/` 下的文件**
   - 这些是Umi自动生成的，每次运行都会重新生成

2. **使用自定义布局后，需要禁用默认layout**
   - 在 `.umirc.ts` 中设置 `layout: false`

3. **路由配置需要包裹在wrapper中**
   - 将所有路由放在自定义layout的routes数组下

4. **Outlet组件**
   - 必须使用 `<Outlet />` 来渲染子路由
   - 这是React Router v6的API

## 示例：完整路由配置

```typescript
import CustomLayout from '@/components/Layout';

export default [
  {
    path: '/',
    component: CustomLayout,
    routes: [
      {
        path: '/',
        name: '首页',
        icon: 'home',
        component: './Dashboard',
      },
      {
        path: '/player',
        name: '球员管理',
        icon: 'safety',
        routes: [
          {
            path: '/player/list',
            name: '球员列表',
            component: './Player',
          },
        ],
      },
      {
        path: '/team',
        name: '球队管理',
        icon: 'team',
        routes: [
          {
            path: '/team/list',
            name: '球队列表',
            component: './Team',
          },
        ],
      },
      // ... 其他路由
    ],
  },
];
```
