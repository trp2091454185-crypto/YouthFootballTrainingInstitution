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
import { createStudent, updateStudent, getStudentDetail } from '@/services/student';
import './index.less';
import { PageContainer } from '@ant-design/pro-components';
import { GENDER, POSITION, RELATIONSHIP, SCHOOLSTATUS } from '@/utils/constant';
import dayjs from 'dayjs';

const { Option } = Select;


const StudentEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { total } = useParams<{ total: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const isEdit = !!id;

    // 加载学员详情
    useEffect(() => {
        if (isEdit && id) {
            fetchStudentDetail(id);
        }
    }, [isEdit, id]);

    // 设置浏览器标题
    useEffect(() => {
        document.title = !!id ? '编辑学员' : '新增学员';
    }, [id]);

    const fetchStudentDetail = async (studentId: string) => {
        setLoading(true);
        try {
            const res = await getStudentDetail(studentId);
            if (res.success && res.data) {
                form.setFieldsValue({
                    ...res.data,
                    birthDate: res.data.birthDate ? dayjs(res.data.birthDate) : undefined,
                    joinDate: res.data.joinDate ? dayjs(res.data.joinDate) : undefined,
                });
            } else {
                message.error(res.errorMessage || '获取学员信息失败');
            }
        } catch (error) {
            message.error('获取学员信息失败');
        } finally {
            setLoading(false);
        }
    };

    // 返回列表页
    const handleBack = () => {
        navigate('/student/management');
    };

    // 提交表单
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const submitData = {
                ...values,
            };

            let res;
            if (isEdit && id) {
                res = await updateStudent(id, submitData);
            } else {
                res = await createStudent(submitData);
            }

            if (res.success) {
                message.success(isEdit ? '更新成功' : '创建成功');
                setTimeout(() => {
                    navigate('/student/management');
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
                    { title: '学员管理' },
                    { title: '学员列表', href: "/student/management" },
                    { title: isEdit ? '编辑学员' : '新增学员' },
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
                                        <span className='section-subtitle'>填写学员的基础档案信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            {/* 第一排：编号 + 姓名 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="studentNo"
                                                    label="学员编号"
                                                    initialValue={`100${total}`}
                                                >
                                                    <Input placeholder="请输入学员编号" maxLength={50} disabled />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="name"
                                                    label="学员姓名"
                                                    rules={[{ required: true, message: '请输入学员姓名' }]}
                                                >
                                                    <Input placeholder="请输入学员姓名" maxLength={50} />
                                                </Form.Item>
                                            </Col>

                                            {/* 第二排：性别 + 身份证 */}
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
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="idCard"
                                                    label="身份证号"
                                                    rules={[
                                                        { pattern: /^\d{17}[\dXx]$/, message: '请输入正确的身份证号' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入身份证号" maxLength={18} />
                                                </Form.Item>
                                            </Col>

                                            {/* 第三排：出生日期 + 入训日期 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="birthDate"
                                                    label="出生日期"
                                                    rules={[{ required: true, message: '请选择出生日期' }]}
                                                >
                                                    <DatePicker style={{ width: '100%' }} placeholder="请选择出生日期"
                                                        maxDate={dayjs(dayjs(), 'YYYY-MM-DD')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="joinDate"
                                                    label="入训日期"
                                                    rules={[{ required: true, message: '请选择入训日期' }]}
                                                >
                                                    <DatePicker style={{ width: '100%' }} placeholder="请选择入训日期" />
                                                </Form.Item>
                                            </Col>

                                            {/* 第四排：身高 + 体重 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="height"
                                                    label="身高(cm)"
                                                    rules={[{ required: true, message: '请输入身高' }]}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={50}
                                                        max={250}
                                                        precision={1}
                                                        placeholder="请输入身高"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="weight"
                                                    label="体重(kg)"
                                                    rules={[{ required: true, message: '请输入体重' }]}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={10}
                                                        max={200}
                                                        precision={1}
                                                        placeholder="请输入体重"
                                                    />
                                                </Form.Item>
                                            </Col>

                                            {/* 第五排：鞋码 + 联系电话 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="footSize"
                                                    label="鞋码"
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={1}
                                                        max={99}
                                                        precision={1}
                                                        placeholder="请输入"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="phone"
                                                    label="联系电话"
                                                    rules={[
                                                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入联系电话" maxLength={20} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="position"
                                                    label="培养方向"
                                                >
                                                    <Select placeholder="请选择">
                                                        {POSITION.map((opt) => (
                                                            <Option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="address"
                                                    label="家庭住址"
                                                >
                                                    <Input placeholder="请输入详细的家庭住址" maxLength={255} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="remarks"
                                                    label="备注"
                                                >
                                                    <Input placeholder="请输入备注" maxLength={255} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                {/* 教育信息卡片（示例） */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>教育信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="school"
                                                    label="就读学校"
                                                >
                                                    <Input placeholder="请输入学校名称" maxLength={100} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="grade"
                                                    label="年级"
                                                >
                                                    <Input placeholder="请输入年级" maxLength={20} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="status"
                                                    label="在读情况"
                                                >
                                                    <Select placeholder="请选择">
                                                        {SCHOOLSTATUS.map((opt) => (
                                                            <Option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </Option>
                                                        ))}
                                                    </Select>
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
                                        <span className='section-title'>紧急联系人</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="emergencyContact"
                                                    label="联系人姓名"
                                                >
                                                    <Input placeholder="请输入姓名" maxLength={100} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="relation"
                                                    label="关系"
                                                >
                                                    <Select placeholder="与学员的关系">
                                                        {RELATIONSHIP.map((opt) => (
                                                            <Option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="emergencyPhone"
                                                    label="联系电话"
                                                    rules={[
                                                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入联系电话" maxLength={20} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>提示信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <div className='info-card'>
                                            <div className='info-icon'>💡</div>
                                            <div className='info-title'>填写须知</div>
                                            <div className='info-desc'>
                                                标有 <span style={{ color: '#ff4d4f' }}>*</span> 的为必填项，请准确填写学员信息。身份证号用于身份核验，请确保正确。
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

export default StudentEdit;
