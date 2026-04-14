import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker, message } from 'antd';
import type { InstitutionHonor } from '@/services/institution';
import { createHonor, updateHonor } from '@/services/institution';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/zh_CN';

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

    // 打开时回填数据
    React.useEffect(() => {
        if (visible) {
            if (record) {
                form.setFieldsValue({
                    title: record.title,
                    awardOrg: record.awardOrg,
                    awardDate: dayjs(record.awardDate),
                    description: record.description,
                    image: record.image
                });
            } else {
                form.resetFields();
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
                res = await updateHonor(record.id, values as InstitutionHonor);
            } else {
                res = await createHonor(values as InstitutionHonor);
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

                <Form.Item
                    name="image"
                    label="图片"
                >
                    <Input placeholder="请输入" maxLength={100} showCount />
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
