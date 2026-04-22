import request from '@/utils/request';


export interface UploadImageParams {
    module: string;
    content: any;
}

//上传图片
export const uploadImage = (data: UploadImageParams) => {
    return request('/api/v1/upload/uploadImages', {
        method: 'POST',
        data,
    });
};