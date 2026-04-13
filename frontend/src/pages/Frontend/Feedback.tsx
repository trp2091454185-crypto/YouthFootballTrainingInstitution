import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Input, Rate, Button, Typography, message, List, Avatar } from 'antd';
import {
    CommentOutlined,
    SendOutlined,
    UserOutlined,
    SmileOutlined,
    StarFilled,
} from '@ant-design/icons';
import './Feedback.less';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// 模拟已有留言
const mockMessages = [
    {
        id: 1,
        name: '王女士',
        content: '孩子在这里训练了两年，非常喜欢这里的教练团队！教学方式很专业，孩子进步明显。',
        rating: 5,
        time: '2024-12-15',
        reply: '感谢您的认可，我们会继续努力为孩子提供更好的训练体验！',
    },
    {
        id: 2,
        name: '李先生',
        content: '课程体系设计得很科学，分龄分级的教学方式很适合不同年龄段的孩子。希望能增加一些周末的短期训练营。',
        rating: 4,
        time: '2024-12-10',
        reply: '感谢您的建议！我们正在筹备寒假短期训练营，敬请期待。',
    },
    {
        id: 3,
        name: '张妈妈',
        content: '环境设施一流，教练都很耐心负责。唯一建议是希望能有更多的比赛机会让孩子们展示自己。',
        rating: 5,
        time: '2024-11-28',
        reply: '好的建议！我们已经和多家兄弟青训机构建立了联赛机制，每月都有友谊赛哦。',
    },
];

const Feedback: React.FC = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        document.title = '反馈留言';
    }, []);

    const onFinish = async (values: any) => {
        setSubmitting(true);
        // 模拟提交延迟
        setTimeout(() => {
            setSubmitting(false);
            form.resetFields();
            message.success('留言提交成功！感谢您的宝贵意见，我们会认真阅读并改进。');
        }, 1200);
    };

    return (
        <div className="feedback-page">
            {/* 头部区域 */}
            <section className="feedback-hero">
                <div className="hero-content">
                    <CommentOutlined className="hero-icon" />
                    <Title level={1} className="hero-title">反馈留言</Title>
                    <Paragraph className="hero-desc">
                        您的意见是我们前进的动力，欢迎留下您的宝贵建议
                    </Paragraph>
                </div>
            </section>

            <section className="feedback-content">
                <div className="feedback-container">
                    <Row gutter={[40, 40]} align="stretch">
                        {/* 左侧：留言表单 */}
                        <Col xs={24} lg={13}>
                            <Card className="form-card" bordered={false}>
                                <Title level={3} className="form-title">
                                    <SmileOutlined /> 发表留言
                                </Title>
                                <Paragraph className="form-subtitle">请填写以下信息，我们将认真阅读每一条留言</Paragraph>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    requiredMark="optional"
                                    className="feedback-form"
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="name"
                                                label="您的称呼"
                                                rules={[{ required: true, message: '请输入您的称呼' }]}
                                            >
                                                <Input placeholder="如：张先生/李女士" size="large" prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="contact"
                                                label="联系方式（选填）"
                                                rules={[{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]}
                                            >
                                                <Input placeholder="方便我们回复您" size="large" maxLength={11} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="rating"
                                        label="整体满意度评分"
                                        rules={[{ required: true, message: '请进行评分' }]}
                                    >
                                        <Rate allowHalf character={<StarFilled />} className="rating-rate" />
                                    </Form.Item>

                                    <Form.Item
                                        name="content"
                                        label="留言内容"
                                        rules={[
                                            { required: true, message: '请输入留言内容' },
                                            { min: 10, message: '留言内容不少于10个字' },
                                        ]}
                                    >
                                        <TextArea
                                            rows={5}
                                            placeholder="请详细描述您的意见、建议或感受..."
                                            showCount
                                            maxLength={500}
                                            className="feedback-textarea"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            icon={<SendOutlined />}
                                            loading={submitting}
                                            className="submit-btn"
                                        >
                                            提交留言
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>

                        {/* 右侧：留言墙 */}
                        <Col xs={24} lg={11}>
                            <div className="message-wall">
                                <Card className="wall-card" bordered={false}>
                                    <div className="wall-header">
                                        <Title level={4}>留言板</Title>
                                        <Text type="secondary">{mockMessages.length} 条留言</Text>
                                    </div>
                                    
                                    <List
                                        dataSource={mockMessages}
                                        renderItem={(item) => (
                                            <List.Item className="message-item">
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            style={{
                                                                background: `linear-gradient(135deg, ${['#2E7D32', '#1565C0', '#E65100', '#6A1B9A'][item.id % 4]}, ${['#66BB6A', '#42A5F5', '#FF8A65', '#CE93D8'][item.id % 4]})`,
                                                            }}
                                                            icon={<UserOutlined />}
                                                        />
                                                    }
                                                    title={
                                                        <div className="msg-title">
                                                            <Text strong>{item.name}</Text>
                                                            <Rate disabled defaultValue={item.rating} count={5} className="msg-rate" />
                                                        </div>
                                                    }
                                                    description={
                                                        <span className="msg-time">{item.time}</span>
                                                    }
                                                />
                                                <p className="msg-content">{item.content}</p>
                                                {item.reply && (
                                                    <div className="msg-reply">
                                                        <Text strong style={{ color: '#2E7D32' }}>官方回复：</Text>
                                                        <Text>{item.reply}</Text>
                                                    </div>
                                                )}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Feedback;
