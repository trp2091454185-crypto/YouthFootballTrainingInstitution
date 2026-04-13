import React, { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { CoreAdvantage } from '@/services/home';
import { createCoreAdvantage, updateCoreAdvantage } from '@/services/home';
import IconSelect from '@/components/IconsSelect';

const { TextArea } = Input;

export interface CoreAdvantageFormProps {
    /** 模态框可见性 */
    visible: boolean;
    /** 当前编辑的记录（新建时为 null） */
    record?: CoreAdvantage | null;
    /** 关闭回调 */
    onClose: () => void;
    /** 提交成功后的回调 */
    onSuccess: () => void;
}

const CoreAdvantageForm: React.FC<CoreAdvantageFormProps> = ({
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
                    description: record.description,
                    icon: record.icon,
                    image: record.image,
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
                res = await updateCoreAdvantage(record.id, values as CoreAdvantage);
            } else {
                res = await createCoreAdvantage(values as CoreAdvantage);
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
            title={isEdit ? '编辑核心优势' : '新增核心优势'}
            open={visible}
            onCancel={handleClose}
            onOk={handleSubmit}
            confirmLoading={submitting}
            width={560}
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
                    <Input placeholder="请输入核心优势标题" maxLength={50} showCount />
                </Form.Item>

                <Form.Item
                    name="icon"
                    label="图标"
                >
                    <IconSelect />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="描述"
                >
                    <TextArea placeholder="请输入描述" rows={3} maxLength={200} showCount />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default CoreAdvantageForm;
