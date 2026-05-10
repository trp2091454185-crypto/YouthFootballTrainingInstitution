// 运行时配置
import { RequestConfig } from '@umijs/max';
import { getUserInfo, getAccessToken } from '@/utils/auth';

/** 全局初始状态 */
export async function getInitialState(): Promise<{
    currentUser?: {
        id: number;
        username: string;
        role: number;
        roleName: string;
    } | null;
}> {
    // 从 localStorage 读取已存储的用户信息和 Token
    const userInfo = getUserInfo();
    const token = getAccessToken();

    // Token 和用户信息都存在 → 已登录状态
    if (userInfo && token) {
        return { currentUser: userInfo };
    }

    // 未登录
    return { currentUser: undefined };
}

// 配置请求
export const request: RequestConfig = {
    timeout: 10000,
    errorConfig: {
        // 适配后端 go-zero 统一响应体: { code: 200, success: true, errorMessage: "OK", data }
        adaptor: (resData: any) => ({
            ...resData,
            success: resData.code === 200,
            errorMessage: resData.errorMessage || resData.message,
        }),
    },
};
