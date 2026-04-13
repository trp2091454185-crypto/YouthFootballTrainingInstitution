import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch, DatePicker, message } from 'antd';
import type { Dayjs } from 'dayjs';
import type { Banner } from '@/services/home';
import { createBanner, updateBanner } from '@/services/home';

export interface CarouselFormProps {
    /** 模态框可见性 */
    visible: boolean;
    /** 当前编辑的记录（新建时为 null） */
    record?: Banner | null;
    /** 关闭回调 */
    onClose: () => void;
    /** 提交成功后的回调 */
    onSuccess: () => void;
}

const CarouselForm: React.FC<CarouselFormProps> = ({
    visible,
    record,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const isEdit = !!record?.id;

    // 打开时回填数据
    React.useEffect(() => {
        if (visible) {
            if (record) {
                form.setFieldsValue({
                    title: record.title,
                    subtitle: record.subtitle,
                    image: record.image,
                    linkType: record.linkType ?? 1,
                    linkUrl: record.linkUrl,
                    linkPage: record.linkPage,
                    target: record.target || '_self',
                });
            } else {
                form.resetFields();
                form.setFieldsValue({
                    linkType: 1,
                    target: '_self',
                });
            }
        }
    }, [visible, record, form]);

    // 关闭
    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    // 提交
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSubmitting(true);

            let res;
            if (isEdit && record?.id) {
                res = await updateBanner(record.id, values as Banner);
            } else {
                res = await createBanner(values as Banner);
            }

            if (res.success) {
                message.success(isEdit ? '更新成功' : '创建成功');
                handleClose();
                onSuccess();
            } else {
                message.error(res.errorMessage || (isEdit ? '更新失败' : '创建失败'));
            }
        } catch (error) {
            if ((error as any)?.errorFields) return; // 表单校验错误
            message.error(isEdit ? '更新失败' : '创建失败');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title={isEdit ? '编辑轮播图' : '新增轮播图'}
            open={visible}
            onCancel={handleClose}
            onOk={handleSubmit}
            confirmLoading={submitting}
            width={600}
            destroyOnClose
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 16 }}
            >
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input placeholder="请输入轮播图标题" maxLength={100} showCount />
                </Form.Item>

                <Form.Item
                    name="subtitle"
                    label="副标题"
                >
                    <Input placeholder="请输入副标题" maxLength={200} showCount />
                </Form.Item>


                <Form.Item
                    name="linkType"
                    label="链接类型"
                    rules={[{ required: true, message: '请选择链接类型' }]}
                >
                    <Select
                        placeholder="请选择链接类型"
                        options={[
                            { label: '无链接', value: 1 },
                            { label: '内部页面', value: 2 },
                            { label: '外部链接', value: 3 },
                        ]}
                    />
                </Form.Item>

                {/* 内部页面 */}
                <Form.Item noStyle shouldUpdate={(prev, cur) => prev.linkType !== cur.linkType}>
                    {({ getFieldValue }) =>
                        getFieldValue('linkType') === 2 && (
                            <Form.Item
                                name="linkPage"
                                label="跳转页面路径"
                                rules={[{ required: true, message: '请输入页面路径' }]}
                            >
                                <Input placeholder="如 /frontend/about" maxLength={200} />
                            </Form.Item>
                        )
                    }
                </Form.Item>

                {/* 外部链接 */}
                <Form.Item noStyle shouldUpdate={(prev, cur) => prev.linkType !== cur.linkType}>
                    {({ getFieldValue }) =>
                        getFieldValue('linkType') === 3 && (
                            <>
                                <Form.Item
                                    name="linkUrl"
                                    label="外部链接地址"
                                    rules={[{ required: true, message: '请输入外部链接' }, { type: 'url', message: '请输入正确的URL' }]}
                                >
                                    <Input placeholder="如 www.baidu.com" maxLength={500} />
                                </Form.Item>
                                <Form.Item
                                    name="target"
                                    label="打开方式"
                                >
                                    <Select
                                        options={[
                                            { label: '当前窗口', value: '_self' },
                                            { label: '新窗口', value: '_blank' },
                                        ]}
                                    />
                                </Form.Item>
                            </>
                        )
                    }
                </Form.Item>

                <Form.Item
                    name="image"
                    label="图片地址"
                    rules={[{ required: false, message: '请输入图片地址' }]}
                >
                    <Input placeholder="请输入图片URL" maxLength={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CarouselForm;
