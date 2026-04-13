// 运行时配置
import { RequestConfig } from '@umijs/max';

// 全局初始化数据配置
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '管理员' };
}

// 配置请求
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 0,
        errorMessage: resData.message,
      };
    },
  },
};
