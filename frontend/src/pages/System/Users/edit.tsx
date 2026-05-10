import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Radio, message } from 'antd';
import type { SysUser } from '@/services/system';
import { createUser, updateUser } from '@/services/system';
import { USER_ROLE } from '@/utils/constant';

interface UserEditModalProps {
    open: boolean;
    editRecord?: SysUser | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    open,
    editRecord,
    onSuccess,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const isEdit = !!editRecord?.id;

    useEffect(() => {
        if (open) {
            if (isEdit && editRecord) {
                form.setFieldsValue(editRecord);
            } else {
                form.resetFields();
                form.setFieldsValue({ status: 1 });
            }
        }
    }, [open, isEdit, editRecord, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            let res;
            if (isEdit) {
                res = await updateUser(editRecord!.id!, values);
            } else {
                res = await createUser(values as SysUser);
            }
            if (res.success) {
                message.success(isEdit ? '编辑成功' : '创建成功');
                onSuccess();
            } else {
                message.error(res.errorMessage || (isEdit ? '编辑失败' : '创建失败'));
            }
        } catch {
            // 表单验证失败
        }
    };

    return (
        <Modal
            title={isEdit ? '编辑用户' : '新增用户'}
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            width={560}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 16 }}
                initialValues={{ status: 1 }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 3, max: 20, message: '用户名长度为3-20个字符' },
                        {
                            pattern: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能包含英文字母、数字、下划线，不能输入中文',
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                {!isEdit && (
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { min: 6, max: 20, message: '密码长度为6-20个字符' },
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                )}

                <Form.Item name="phone" label="联系电话">
                    <Input placeholder="请输入联系电话" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[{ type: 'email', message: '请输入正确的邮箱格式' }]}
                >
                    <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="角色"
                    rules={[{ required: true, message: '请选择角色' }]}
                >
                    <Select
                        placeholder="请选择角色"
                        options={USER_ROLE}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserEditModal;
