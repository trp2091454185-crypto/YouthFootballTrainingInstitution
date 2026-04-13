import React, { useEffect } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, Typography, message, Divider } from 'antd';
import {
    EditOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined,
    ClockCircleOutlined,
    SendOutlined,
} from '@ant-design/icons';
import useNavigate from '@umijs/max';
import './Registration.less';

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
            {/* 报名头部区域 */}
            <section className="reg-hero">
                <div className="hero-content">
                    <EditOutlined className="hero-icon" />
                    <Title level={1} className="hero-title">报名咨询</Title>
                    <Paragraph className="hero-desc">
                        填写下方表单即可完成在线报名，我们将尽快安排试训体验
                    </Paragraph>
                </div>
            </section>

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
                                    requiredMark="optional"
                                    className="reg-form"
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="studentName"
                                                label="学员姓名"
                                                rules={[{ required: true, message: '请输入学员姓名' }]}
                                            >
                                                <Input placeholder="请输入学员姓名" size="large" prefix={<EditOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="gender"
                                                label="性别"
                                                rules={[{ required: true, message: '请选择性别' }]}
                                            >
                                                <Select placeholder="请选择性别" size="large">
                                                    <Select.Option value="male">男</Select.Option>
                                                    <Select.Option value="female">女</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="birthDate"
                                                label="出生日期"
                                                rules={[{ required: true, message: '请输入出生日期' }]}
                                            >
                                                <Input placeholder="如：2015-06" size="large" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="intendedCourse"
                                                label="意向课程"
                                                rules={[{ required: true, message: '请选择意向课程' }]}
                                            >
                                                <Select placeholder="请选择意向课程" size="large">
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

                                    <Divider plain>家长联系信息</Divider>

                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="parentName"
                                                label="家长姓名"
                                                rules={[{ required: true, message: '请输入家长姓名' }]}
                                            >
                                                <Input placeholder="请输入家长姓名" size="large" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="phone"
                                                label="联系电话"
                                                rules={[
                                                    { required: true, message: '请输入联系电话' },
                                                    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
                                                ]}
                                            >
                                                <Input placeholder="请输入11位手机号" size="large" prefix={<PhoneOutlined />} maxLength={11} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="remark"
                                        label="备注说明"
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="如有特殊需求或想了解的内容，可在此备注..."
                                            showCount
                                            maxLength={300}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            icon={<SendOutlined />}
                                            className="submit-btn"
                                        >
                                            提交报名申请
                                        </Button>
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
                                            <div class="contact-detail">
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
            </section>
        </div>
    );
};

export default Registration;
