import { defineConfig } from '@umijs/max';
import routes from './src/config/routes';

export default defineConfig({
  title: '绿茵管理云',  // 浏览器窗口/标签页标题
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  // 关闭 Umi 内置 layout，使用自定义布局
  // layout: {
  //   title: '绿茵管理云'
  // },
  routes,
  npmClient: 'npm',
  // 暴露环境变量
  define: {
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
  },
  // 开发环境代理配置
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:4000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' }, // 如果需要重写路径，取消注释此行
    },
  },
});

