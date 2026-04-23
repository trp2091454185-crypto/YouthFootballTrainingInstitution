import React, { useState } from 'react';
import { Upload, message, Spin } from 'antd';
import type { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { GetProp } from 'antd';
import ImgCrop from 'antd-img-crop';
import { VerticalAlignBottomOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';

export interface ImageUploadProps {
    /** 图片地址（单图模式）或图片地址数组（多图模式） */
    value?: string | string[];
    /** 值变化回调 */
    onChange?: (value: string | string[]) => void;
    /** 上传接口地址 */
    action?: string;
    /** 上传字段名，默认 image */
    name?: string;
    /** 模块名称，用于后端分类存储 */
    module?: string;
    /** 上传按钮文字 */
    text?: string;
    /** 最大文件大小(MB)，默认10 */
    maxSize?: number;
    /** 接受的文件类型，默认 image/jpeg,image/png,image/webp */
    accept?: string;
    /** 自定义类名 */
    className?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 裁剪比例，如 1 表示正方形, 16/9 表示横屏等 */
    aspect?: number;
    /** 是否启用多图上传，默认 false */
    multiple?: boolean;
    /** 最大上传数量，默认5（仅多图模式生效） */
    maxCount?: number;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    action = '/api/v1/upload/uploadImages',
    name = 'content',
    module = 'file',
    text = '上传图片',
    maxSize = 10,
    accept = 'image/jpeg,image/png',
    className,
    disabled = false,
    aspect,
    multiple = false,
    maxCount = 5,
}) => {
    const [imageUrl, setImageUrl] = useState<string>(typeof value === 'string' ? (value || '') : '');
    const [fileList, setFileList] = useState<UploadFile[]>(
        Array.isArray(value)
            ? value.map((url, index) => ({
                uid: `-${index}`,
                name: `image${index + 1}`,
                status: 'done' as const,
                url,
            }))
            : []
    );
    const [uploading, setUploading] = useState<boolean>(false);

    // 外部值变化时同步内部状态
    React.useEffect(() => {
        if (value !== undefined) {
            if (!multiple && typeof value === 'string') {
                setImageUrl(value);
            } else if (multiple && Array.isArray(value)) {
                setFileList(
                    value.map((url, index) => ({
                        uid: `-${index}`,
                        name: `image${index + 1}`,
                        status: 'done' as const,
                        url,
                    }))
                );
            }
        }
    }, [value, multiple]);

    const beforeUpload = (file: File) => {
        const isAccepted = accept.split(',').includes(file.type);
        if (!isAccepted) {
            message.error(`只能上传 ${accept.replace(/image\//g, '').toUpperCase()} 格式的图片!`);
            return false;
        }
        const isLtM = file.size / 1024 / 1024 < maxSize;
        if (!isLtM) {
            message.error(`图片大小不能超过 ${maxSize}MB!`);
            return false;
        }

        if (multiple) {
            const currentList = fileList.filter((f) => f.status === 'done');
            if (currentList.length >= maxCount) {
                message.error(`最多只能上传 ${maxCount} 张图片!`);
                return false;
            }
        }

        return true;
    };

    const handleChangeSingle = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setUploading(true);
        } else if (info.file.status === 'done') {
            setUploading(false);
            let url = '';
            if (info.file.response?.url) {
                url = info.file.response.url;
            } else if (info.file.response?.data?.url) {
                url = info.file.response.data.url;
            } else if (info.file.originFileObj) {
                url = URL.createObjectURL(info.file.originFileObj);
            }
            setImageUrl(url);
            onChange?.(url);
            message.success('图片上传成功');
        } else if (info.file.status === 'error') {
            setUploading(false);
            message.error('图片上传失败，请重试');
        }
    };

    const handleChangeMultiple = (info: UploadChangeParam<UploadFile>) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.map((file) => {
            if (file.response?.url || file.response?.data?.url) {
                return {
                    ...file,
                    url: file.response?.url || file.response?.data?.url || file.url,
                };
            }
            return file;
        });

        setFileList(newFileList);

        const urls = newFileList
            .filter((f) => f.status === 'done' && f.url)
            .map((f) => f.url!);
        onChange?.(urls);

        // 检查是否有新文件完成上传
        const lastFile = info.fileList[info.fileList.length - 1];
        if (lastFile?.status === 'uploading') {
            setUploading(true);
        } else if (lastFile?.status === 'done') {
            setUploading(false);
            message.success('图片上传成功');
        } else if (lastFile?.status === 'error') {
            setUploading(false);
            message.error('图片上传失败');
        }
    };

    const uploadButton = (
        <div style={{ position: 'relative' }}>
            {uploading ? (
                <Spin />
            ) : (
                <>
                    <span><VerticalAlignBottomOutlined style={{ fontSize: 24 }} /></span>
                    <div style={{ marginTop: 8 }}>{text}</div>
                </>
            )}
        </div>
    );

    const cropProps = aspect ? { aspect } : {};

    const handlePreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    // 单图模式预览
    const handlePreviewSingle = (e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发上传
        if (imageUrl) {
            const image = new Image();
            image.src = imageUrl;
            const imgWindow = window.open(imageUrl);
            imgWindow?.document.write(image.outerHTML);
        }
    };

    // 单图模式删除
    const handleDeleteSingle = (e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发上传
        setImageUrl('');
        onChange?.('');
    };

    // 单图模式
    if (!multiple) {
        return (
            <>
                <ImgCrop quality={1} modalTitle="编辑图片" modalOk="确认" modalCancel="取消" {...cropProps}>
                    <Upload
                        name={name}
                        listType="picture-card"
                        className={`image-uploader ${className || ''}`}
                        showUploadList={false}
                        action={action}
                        data={{ module }}
                        beforeUpload={beforeUpload}
                        onChange={handleChangeSingle}
                        accept={accept}
                        disabled={disabled}
                    >
                        {imageUrl ? (
                            <div
                                className="image-preview-wrapper"
                            >
                                <img draggable={false} src={imageUrl} alt="preview" />
                                <div
                                    className="preview-mask"
                                >
                                    <EyeOutlined
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreviewSingle(e);
                                        }}
                                    />
                                    <DeleteOutlined
                                        onClick={(e) => handleDeleteSingle(e)}
                                    />
                                </div>
                            </div>
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </ImgCrop>
            </>
        );
    }

    // 多图模式
    return (
        <ImgCrop quality={1} modalTitle="编辑图片" modalOk="确认" modalCancel="取消" {...cropProps}>
            <Upload
                name={name}
                listType="picture-card"
                className={`image-uploader ${className || ''}`}
                fileList={fileList}
                action={action}
                data={{ module }}
                beforeUpload={beforeUpload}
                onChange={handleChangeMultiple as UploadProps['onChange']}
                onPreview={handlePreview}
                accept={accept}
                disabled={disabled}
                multiple
            >
                {(fileList.length < maxCount || uploading) && uploadButton}
            </Upload>
        </ImgCrop>
    );
};

export default ImageUpload;
