import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@umijs/max';
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Row,
    Col,
    Button,
    message,
    Spin,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { createCoach, updateCoach, getCoachDetail, type Coach } from '@/services/coach';
import { PageContainer } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import './Edit.less';
import { AGE_GROUP_OPTIONS, GENDER, SPECIALTY_OPTIONS } from '@/utils/constant';

const { Option } = Select;

const TeamEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const isEdit = !!id;

    // 加载教练详情
    useEffect(() => {
        if (isEdit && id) {
            fetchCoachDetail(id);
        }
    }, [isEdit, id]);

    // 设置浏览器标题
    useEffect(() => {
        document.title = isEdit ? '编辑教练信息' : '新增教练信息';
    }, [isEdit]);

    const fetchCoachDetail = async (coachId: string) => {
        setLoading(true);
        try {
            const res = await getCoachDetail(coachId);
            if (res.success && res.data) {
                form.setFieldsValue({
                    ...res.data,
                    birthDate: res.data.birthDate ? dayjs(res.data.birthDate) : undefined,
                });
            } else {
                message.error(res.errorMessage || '获取教练信息失败');
            }
        } catch (error) {
            message.error('获取教练信息失败');
        } finally {
            setLoading(false);
        }
    };

    // 返回列表页
    const handleBack = () => {
        navigate('/team');
    };

    // 提交表单
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const submitData: Coach = {
                ...values,
            };

            let res;
            if (isEdit && id) {
                res = await updateCoach(id, submitData);
            } else {
                res = await createCoach(submitData);
            }

            if (res.success) {
                message.success(isEdit ? '更新成功' : '创建成功');
                setTimeout(() => {
                    navigate('/team');
                }, 300);
            } else {
                message.error(res.errorMessage || (isEdit ? '更新失败' : '创建失败'));
            }
        } catch (error) {
            console.error('表单验证失败:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageContainer
            breadcrumb={{
                items: [
                    { title: '教练管理' },
                    { title: '教练列表', href: '/team/management' },
                    { title: isEdit ? '编辑教练信息' : '新增教练信息' },
                ],
            }}
        >
            <div className="editContainer">
                <Spin spinning={loading}>
                    <Form form={form} layout="vertical">
                        <Row gutter={24}>
                            <Col xs={24} lg={16}>
                                {/* 基本信息卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>基本信息</span>
                                        <span className='section-subtitle'>填写教练的基础档案信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            {/* 第一排：姓名 + 性别 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="name"
                                                    label="教练姓名"
                                                    rules={[{ required: true, message: '请输入教练姓名' }]}
                                                >
                                                    <Input placeholder="请输入教练姓名" maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="gender"
                                                    label="性别"
                                                    rules={[{ required: true, message: '请选择性别' }]}
                                                >
                                                    <Select placeholder="请选择性别">
                                                        {GENDER.map((opt) => (
                                                            <Option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            {/* 第二排：出生日期 + 执教年限 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="birthDate"
                                                    label="出生日期"
                                                >
                                                    <DatePicker
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择出生日期"
                                                        maxDate={dayjs(dayjs(), 'YYYY-MM-DD')}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="workYears"
                                                    label="执教年限"
                                                    rules={[{ required: true, message: '请输入执教年限' }]}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        max={50}
                                                        precision={0}
                                                        placeholder="请输入执教年限"
                                                        addonAfter="年"
                                                    />
                                                </Form.Item>
                                            </Col>

                                            {/* 第三排：联系电话 + 邮箱 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="phone"
                                                    label="联系电话"
                                                    rules={[
                                                        { required: true, message: '请输入联系电话' },
                                                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入联系电话" maxLength={20} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="email"
                                                    label="电子邮箱"
                                                    rules={[
                                                        { type: 'email', message: '请输入正确的邮箱地址' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入电子邮箱" maxLength={100} />
                                                </Form.Item>
                                            </Col>

                                        </Row>
                                    </div>
                                </div>

                                {/* 专业信息卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>专业信息</span>
                                        <span className='section-subtitle'>填写教练的专业特长和教学信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="specialties"
                                                    label="专项擅长"
                                                    extra="可选择多个专项"
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="请选择专项擅长"
                                                        options={SPECIALTY_OPTIONS}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="ageGroups"
                                                    label="适合年龄段"
                                                    extra="可选择多个年龄段"
                                                >
                                                    <Select
                                                        mode="multiple"
                                                        placeholder="请选择适合年龄段"
                                                        options={AGE_GROUP_OPTIONS}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="teachingFeatures"
                                                    label="教学特色"
                                                >
                                                    <Input.TextArea
                                                        placeholder="请输入教学特色，如教学风格、训练方法等"
                                                        rows={3}
                                                        maxLength={100}
                                                        showCount
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="bio"
                                                    label="个人简介"
                                                >
                                                    <Input.TextArea
                                                        placeholder="请输入个人简介"
                                                        rows={4}
                                                        maxLength={300}
                                                        showCount
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>

                            {/* 右侧辅助信息区 */}
                            <Col xs={24} lg={8}>
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>其他设置</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="avatar"
                                                    label="头像链接"
                                                    rules={[{ required: true, message: '请上传头像' }]}
                                                >
                                                    <Input placeholder="请输入头像图片URL" maxLength={500} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>填写须知</span>
                                    </div>
                                    <div className='section-body'>
                                        <div className='info-card'>
                                            <div className='info-icon'>💡</div>
                                            <div className='info-title'>提示信息</div>
                                            <div className='info-desc'>
                                                标有 <span style={{ color: '#ff4d4f' }}>*</span> 的为必填项，请准确填写教练信息。
                                                <br /><br />
                                                <strong>专项擅长：</strong>可多选，用于展示教练的专业方向
                                                <br /><br />
                                                <strong>适合年龄段：</strong>可多选，便于系统匹配合适的学员
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* 底部固定操作栏 */}
                        <div className='form-footer'>
                            <Button onClick={handleBack} size="large">
                                取消
                            </Button>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleSubmit}
                                loading={saving}
                                size="large"
                            >
                                保存
                            </Button>
                        </div>
                    </Form>
                </Spin>
            </div>
        </PageContainer>
    );
};

export default TeamEdit;
