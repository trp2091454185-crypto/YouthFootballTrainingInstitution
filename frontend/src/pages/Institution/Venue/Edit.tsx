import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import type { InstitutionFacility } from '@/services/institution';
import { createFacility, updateFacility } from '@/services/institution';

export interface VenueEditModalProps {
    /** 模态框可见性 */
    visible: boolean;
    /** 当前编辑的记录（新建时为 null） */
    record?: InstitutionFacility | null;
    /** 关闭回调 */
    onClose: () => void;
    /** 提交成功后的回调 */
    onSuccess: () => void;
}

const VenueEditModal: React.FC<VenueEditModalProps> = ({
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
                    name: record.name,
                    description: record.description,
                    images: record.images || '',
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

            // 处理数组字段转换
            const submitData: InstitutionFacility = {
                ...values,
            };

            let res;
            if (isEdit && record?.id) {
                res = await updateFacility(record.id, submitData);
            } else {
                res = await createFacility(submitData);
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
            title={isEdit ? '编辑场地设施' : '新增场地设施'}
            open={visible}
            onCancel={handleClose}
            onOk={handleSubmit}
            confirmLoading={submitting}
            width={600}
            afterClose={() => form.resetFields()}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 16 }}
            >
                <Form.Item
                    name="name"
                    label="场地名称"
                    rules={[{ required: true, message: '请输入场地名称' }]}
                >
                    <Input placeholder="请输入场地名称，如：主训练场" maxLength={100} showCount />
                </Form.Item>


                <Form.Item
                    name="description"
                    label="场地描述"
                >
                    <Input.TextArea
                        placeholder="请输入场地描述，如场地面积、配套设施等详细信息"
                        rows={4}
                        maxLength={500}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    name="images"
                    label="场地图片"
                    extra="每行输入一个图片URL地址，支持多个图片"
                >
                    <Input.TextArea
                        placeholder="请输入图片URL，每行一个地址"
                        rows={3}
                        maxLength={1000}
                        showCount
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default VenueEditModal;
