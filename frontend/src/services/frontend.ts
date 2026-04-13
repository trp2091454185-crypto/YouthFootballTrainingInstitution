import request from '@/utils/request';
// 获取核心优势列表
export const getCoreStrengthsList = () => {
    return request('/api/v1/frontend/home/coreStrengths', {
        method: 'GET',
    });
};

export const getBannerList = () => {
    return request('/api/v1/frontend/home/banner', {
        method: 'GET',
    });
};