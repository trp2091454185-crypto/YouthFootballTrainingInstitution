import React, { useEffect } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, Typography, message, DatePicker } from 'antd';
import {
    EditOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined,
    ClockCircleOutlined,
    SendOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { AGE_GROUP_OPTIONS, CHANNEL, GENDER } from '@/utils/constant';
import './Registration.less';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Registration: React.FC = () => {
    const [form] = Form.useForm();

    useEffect(() => {
        document.title = '报名咨询';
    }, []);

    const onFinish = (values: any) => {
        message.success('报名信息提交成功！我们的工作人员将在1-2个工作日内与您联系。');
        form.resetFields();
    };

    return (
        <div className="registration-page">
            <section className="reg-content">
                <div className="reg-container">
                    <Row gutter={[40, 40]} align="stretch">
                        {/* 左侧：报名表单 */}
                        <Col xs={24} lg={14}>
                            <Card className="form-card" bordered={false}>
                                <Title level={3} className="form-title">
                                    <EditOutlined /> 在线报名表单
                                </Title>
                                <Paragraph className="form-subtitle">请填写真实信息，带 * 号的为必填项</Paragraph>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="reg-form"
                                >
                                    {/* 学员基本信息 */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <span className="section-icon">👤</span>
                                            <span className="section-title">学员基本信息</span>
                                        </div>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="studentName"
                                                    label="学员姓名"
                                                    rules={[{ required: true, message: '请输入学员姓名' }]}
                                                >
                                                    <Input placeholder="请输入学员姓名" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="gender"
                                                    label="性别"
                                                    rules={[{ required: true, message: '请选择性别' }]}
                                                >
                                                    <Select placeholder="请选择性别" options={GENDER.map(item => ({ label: item.label, value: item.value }))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="birthDate"
                                                    label="出生日期"
                                                    rules={[{ required: true, message: '请选择出生日期' }]}
                                                >
                                                    <DatePicker
                                                        style={{ width: '100%' }}
                                                        placeholder="请选择日期"
                                                        locale={locale}
                                                        maxDate={dayjs(dayjs(), 'YYYY-MM-DD')}
                                                        format="YYYY-MM-DD"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="source"
                                                    label="了解渠道"
                                                >
                                                    <Select placeholder="请选择了解渠道" options={CHANNEL.map(item => ({ label: item.label, value: item.value }))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>

                                    {/* 课程意向 */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <span className="section-icon">⚽</span>
                                            <span className="section-title">课程意向</span>
                                        </div>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="intendedAgeGroup"
                                                    label="意向年龄段"
                                                    rules={[{ required: true, message: '请选择意向年龄段' }]}
                                                >
                                                    <Select placeholder="请选择年龄段" options={AGE_GROUP_OPTIONS.map(item => ({ label: item.label, value: item.value }))} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="intendedCourse"
                                                    label="意向课程"
                                                    rules={[{ required: true, message: '请选择意向课程' }]}
                                                >
                                                    <Select placeholder="请选择意向课程">
                                                        <Select.Option value="u8-basic">U8 快乐足球启蒙课</Select.Option>
                                                        <Select.Option value="u8-tech">U8 基础技术入门课</Select.Option>
                                                        <Select.Option value="u12-advance">U12 综合能力进阶课</Select.Option>
                                                        <Select.Option value="u12-camp">U12 竞技强化训练营</Select.Option>
                                                        <Select.Option value="u16-elite">U16 精英梯队训练</Select.Option>
                                                        <Select.Option value="u16-special">U16 专项技能特训课</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            name="expectations"
                                            label="培养期望"
                                            className="expectations-field"
                                        >
                                            <Input.TextArea placeholder="请描述您对孩子将来的培养方向和期望..." rows={3} maxLength={500} showCount />
                                        </Form.Item>
                                    </div>

                                    {/* 家长联系信息 */}
                                    <div className="form-section">
                                        <div className="section-header">
                                            <span className="section-icon">📞</span>
                                            <span className="section-title">家长联系信息</span>
                                        </div>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="parentName"
                                                    label="家长姓名"
                                                    rules={[{ required: true, message: '请输入家长姓名' }]}
                                                >
                                                    <Input placeholder="请输入家长姓名" prefix={<EditOutlined />} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="phone"
                                                    label="联系电话"
                                                    rules={[
                                                        { required: true, message: '请输入联系电话' },
                                                        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
                                                    ]}
                                                >
                                                    <Input placeholder="请输入11位手机号" prefix={<PhoneOutlined />} maxLength={11} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item
                                            name="remark"
                                            label="备注说明"
                                            className="remark-field"
                                        >
                                            <TextArea
                                                rows={3}
                                                placeholder="如有特殊需求或想了解的内容，可在此备注..."
                                                showCount
                                                maxLength={300}
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item className="submit-wrapper">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            icon={<SendOutlined />}
                                            className="submit-btn"
                                        >
                                            提交报名申请
                                        </Button>
                                        <p className="submit-hint">提交后我们将在 1-2 个工作日内与您联系</p>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                        {/* 右侧：联系信息侧边栏 */}
                        <Col xs={24} lg={10}>
                            <div className="sidebar">
                                <Card className="contact-card" bordered={false}>
                                    <Title level={4} className="sidebar-title">联系我们</Title>

                                    <div className="contact-list">
                                        <div className="contact-item">
                                            <div className="contact-icon phone">
                                                <PhoneOutlined />
                                            </div>
                                            <div className="contact-detail">
                                                <Text strong>咨询电话</Text>
                                                <p>400-888-6688</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon address">
                                                <EnvironmentOutlined />
                                            </div>
                                            <div className="contact-detail">
                                                <Text strong>训练基地地址</Text>
                                                <p>XX市体育中心绿茵青训基地<br />A馆主训练场</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon email">
                                                <MailOutlined />
                                            </div>
                                            <div className="contact-detail">
                                                <Text strong>电子邮箱</Text>
                                                <p>contact@lvyin-football.com</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon time">
                                                <ClockCircleOutlined />
                                            </div>
                                            <div className="contact-detail">
                                                <Text strong>营业时间</Text>
                                                <p>周一至周五 14:00-21:00<br />周六日 08:00-18:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="tip-card" bordered={false}>
                                    <Title level={5}>温馨提示</Title>
                                    <ul className="tips-list">
                                        <li>首次报名可享受免费试训体验一次</li>
                                        <li>老学员推荐新学员双方各享95折优惠</li>
                                        <li>支持分期付款，详情请联系客服咨询</li>
                                        <li>报名后如因特殊原因可申请退款（开课前）</li>
                                    </ul>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section >
        </div >
    );
};

export default Registration;
