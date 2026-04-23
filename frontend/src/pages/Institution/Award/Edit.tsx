import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, message } from 'antd';
import type { InstitutionHonor } from '@/services/institution';
import { createHonor, updateHonor } from '@/services/institution';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/zh_CN';
import ImageUpload from '@/components/ImageUpload';

export interface HonorEditModalProps {
    /** 模态框可见性 */
    visible: boolean;
    /** 当前编辑的记录（新建时为 null） */
    record?: InstitutionHonor | null;
    /** 关闭回调 */
    onClose: () => void;
    /** 提交成功后的回调 */
    onSuccess: () => void;
}

const HonorEditModal: React.FC<HonorEditModalProps> = ({
    visible,
    record,
    onClose,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const isEdit = !!record?.id;
    const [image, setImage] = useState<string>('');

    // 图片上传变化处理
    const handleImageChange = (value: string | string[]) => {
        setImage(value as string);
    };

    // 打开时回填数据
    React.useEffect(() => {
        if (visible) {
            if (record) {
                form.setFieldsValue({
                    title: record.title,
                    awardOrg: record.awardOrg,
                    awardDate: dayjs(record.awardDate),
                    description: record.description,
                });
                setImage(record?.image || '')
            } else {
                form.resetFields();
            }
        }
    }, [visible, record, form]);

    // 关闭
    const handleClose = () => {
        form.resetFields();
        onClose();
        setImage("")
    };

    // 提交
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSubmitting(true);

            const submitData = {
                ...values,
                image: image,
            };
            if (image == '') {
                message.warning('请上传图片');
                return;
            }

            let res;
            if (isEdit && record?.id) {
                res = await updateHonor(record.id, submitData as InstitutionHonor);
            } else {
                res = await createHonor(submitData as InstitutionHonor);
            }

            if (res.success) {
                message.success(isEdit ? '更新成功' : '创建成功');
                handleClose();
                onSuccess();
                setImage("")
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
            title={isEdit ? '编辑荣誉奖项' : '新增荣誉奖项'}
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
                    label="奖项名称"
                    rules={[{ required: true, message: '请输入奖项名称' }]}
                >
                    <Input placeholder="请输入奖项名称" maxLength={100} showCount />
                </Form.Item>

                <Form.Item
                    name="awardOrg"
                    label="颁奖机构"
                    rules={[{ required: true, message: '请输入颁奖机构' }]}
                >
                    <Input placeholder="请输入颁奖机构" maxLength={100} showCount />
                </Form.Item>

                <Form.Item
                    name="awardDate"
                    label="获奖日期"
                    rules={[{ required: true, message: '请选择获奖日期' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder="请选择日期"
                        locale={locale}
                        maxDate={dayjs(dayjs(), 'YYYY-MM-DD')}
                    />
                </Form.Item>

                <Form.Item label="图片">
                    <ImageUpload
                        value={image}
                        onChange={handleImageChange}
                        text="上传图片"
                        module='honor'
                        aspect={16 / 9}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="奖项描述"
                >
                    <Input.TextArea placeholder="请输入奖项描述" rows={4} maxLength={500} showCount />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default HonorEditModal;
