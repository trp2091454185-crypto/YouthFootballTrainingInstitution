import { extend, RequestOptionsInit } from 'umi-request';
import { message } from 'antd';
import {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
    getRefreshToken,
    clearAuth,
} from './auth';

const codeMessage: Record<number, string> = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '登录已过期，请重新登录',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

// ==================== Token 自动刷新状态管理 ====================
let isRefreshing = false;
let retryQueue: Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    options: RequestOptionsInit;
}> = [];

/**
 * 处理队列中的请求：用新Token重试所有排队的请求
 */
function processQueue(error: any, accessToken?: string) {
    retryQueue.forEach(({ resolve, reject, options }) => {
        if (error) {
            reject(error);
        } else if (accessToken) {
            // 用新Token重试原请求
            const newOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            resolve(request(newOptions.url || '', newOptions));
        }
    });
    retryQueue = [];
}

/**
 * 使用 RefreshToken 获取新的 Token 对
 */
async function refreshTokenRequest(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    // 直接使用原生 fetch 避免循环触发拦截器
    const response = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    const res = await response.json();
    if (res.code !== 200 || !res.data) {
        throw new Error(res.errorMessage || 'Token 刷新失败');
    }

    return {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
    };
}

// ==================== 创建 request 实例 ====================
const request = extend({
    timeout: 10000,
    errorHandler: (error: any) => {
        const { response } = error;
        if (response && response.status) {
            const errorText = codeMessage[response.status] || response.statusText;
            message.error(errorText);
        }
        if (!response) {
            message.error('您的网络发生异常，无法连接服务器');
        }
        throw error;
    },
});

// ==================== 请求拦截器：注入 Bearer Token ====================
request.interceptors.request.use((url, options) => {
    const token = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return {
        url,
        options: { ...options, headers },
    };
});

// ==================== 响应拦截器：处理 401 + 自动刷新 Token ====================
request.interceptors.response.use(async (response) => {
    const res = await response.clone().json();

    // 401 未授权 → 触发 Token 刷新
    if (response.status === 401) {
        // 排除 refresh 接口本身，避免死循环
        const reqUrl = response.url || '';
        if (reqUrl.includes('/auth/refresh')) {
            clearAuth();
            window.location.href = '/login';
            return Promise.reject(new Error('Refresh token 失效'));
        }

        // 如果正在刷新中，将请求加入等待队列
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                retryQueue.push({ resolve, reject, options: response.request?.options || {} });
            });
        }

        // 开始刷新流程
        isRefreshing = true;

        try {
            const { accessToken: newAT, refreshToken: newRT } =
                await refreshTokenRequest();

            // 更新本地存储
            setAccessToken(newAT);
            setRefreshToken(newRT);

            // 处理队列中的请求（用新Token重试）
            processQueue(null, newAT);

            // 重试当前请求
            const originalOptions = response.request?.options || {};
            const retryOptions: RequestOptionsInit = {
                ...originalOptions,
                headers: {
                    ...originalOptions.headers,
                    Authorization: `Bearer ${newAT}`,
                },
            };

            return request(originalOptions.url || '', retryOptions);
        } catch (refreshError) {
            // 刷新失败 → 清除认证信息 → 跳转登录页
            processQueue(refreshError);
            clearAuth();
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return res;
});

export default request;
