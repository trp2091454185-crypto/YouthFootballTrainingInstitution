import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Typography, Tabs } from 'antd';
import { BookOutlined, ClockCircleOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './Courses.less';

const { Title, Paragraph, Text } = Typography;

const courseCategories = [
    {
        key: 'all',
        label: '全部课程',
        icon: <BookOutlined />,
    },
    {
        key: 'u8',
        label: 'U8 启蒙班（5-8岁）',
        icon: <ThunderboltOutlined />,
    },
    {
        key: 'u12',
        label: 'U12 基础班（9-12岁）',
        icon: <TeamOutlined />,
    },
    {
        key: 'u16',
        label: 'U16 提高班（13-16岁）',
        icon: <ClockCircleOutlined />,
    },
];

const courses = [
    {
        category: 'u8',
        name: '快乐足球启蒙课',
        ageRange: '5-8岁',
        duration: '每周2次 · 每次90分钟',
        price: '￥2800/学期',
        desc: '通过游戏化教学方式，让孩子在欢乐中感受足球的魅力。注重球感培养、基础协调性训练和团队合作意识的初步建立。',
        highlights: ['小班教学（8人/班）', '游戏化课程', '亲子互动日'],
        popular: true,
    },
    {
        category: 'u8',
        name: '基础技术入门课',
        ageRange: '6-8岁',
        duration: '每周2次 · 每次90分钟',
        price: '￥3200/学期',
        desc: '系统学习传接球、运球突破、射门等基础技术动作，建立正确的技术定型，为后续提升打下坚实基础。',
        highlights: ['标准化教案', '阶段测评', '技术档案'],
        popular: false,
    },
    {
        category: 'u12',
        name: '综合能力进阶课',
        ageRange: '9-12岁',
        duration: '每周3次 · 每次120分钟',
        price: '￥4200/学期',
        desc: '在巩固基础技术的同时，加强战术意识培养、位置感建立和小范围配合训练，全面提升实战能力。',
        highlights: ['战术板讲解', '录像分析', '对抗赛训练'],
        popular: true,
    },
    {
        category: 'u12',
        name: '竞技强化训练营',
        ageRange: '10-12岁',
        duration: '每周3次 · 每次120分钟',
        price: '￥4800/学期',
        desc: '面向有竞赛需求的学员，高强度对抗训练与比赛模拟，快速提升比赛阅读能力和心理素质。',
        highlights: ['高强度对抗', '心理辅导', '赛事推荐'],
        popular: false,
    },
    {
        category: 'u16',
        name: '精英梯队训练',
        ageRange: '13-16岁',
        duration: '每周4次 · 每次150分钟',
        price: '￥6800/学期',
        desc: '准职业化训练模式，包含技战术训练、体能强化、比赛分析和职业规划指导，助力学员向更高水平发展。',
        highlights: ['职业化训练', '数据追踪', '升学通道'],
        popular: true,
    },
    {
        category: 'u16',
        name: '专项技能特训课',
        ageRange: '13-16岁',
        duration: '每周2次 · 每次120分钟',
        price: '￥3800/学期',
        desc: '针对守门员、边锋、中场等特定位置的专项技术训练，帮助学员在擅长的领域达到更高水平。',
        highlights: ['位置专精', '一对一指导', '视频复盘'],
        popular: false,
    },
];

const Courses: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        document.title = '课程体系';
    }, []);

    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter((c) => c.category === activeTab);

    return (
        <div className="courses-page">
            {/* 课程体系介绍区 */}
            <section className="courses-hero">
                <div className="hero-content">
                    <BookOutlined className="hero-icon" />
                    <Title level={1} className="hero-title">科学课程体系</Title>
                    <Paragraph className="hero-desc">
                        分龄分级、循序渐进的专业课程设置，
                        为不同年龄段的学员提供最适合的成长路径
                    </Paragraph>
                </div>
            </section>

            {/* 课程分类筛选 + 列表 */}
            <section className="courses-content">
                <div className="courses-container">
                    {/* 分类标签栏 */}
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        centered
                        items={courseCategories.map((cat) => ({
                            key: cat.key,
                            label: (
                                <span className="tab-label">
                                    {cat.icon}
                                    {cat.label}
                                </span>
                            ),
                        }))}
                        className="course-tabs"
                    />

                    {/* 课程卡片网格 */}
                    <Row gutter={[24, 24]}>
                        {filteredCourses.map((course, index) => (
                            <Col xs={24} md={12} key={index}>
                                <Card className={`course-card ${course.popular ? 'popular' : ''}`} hoverable>
                                    {course.popular && (
                                        <Tag color="#FF5722" className="popular-tag">热门推荐</Tag>
                                    )}
                                    <div className="card-top">
                                        <Title level={4} className="course-name">{course.name}</Title>
                                        <Tag color="#2E7D32">{course.ageRange}</Tag>
                                    </div>
                                    <div className="course-meta">
                                        <span><ClockCircleOutlined /> {course.duration}</span>
                                        <span className="course-price">{course.price}</span>
                                    </div>
                                    <Paragraph className="course-desc">{course.desc}</Paragraph>
                                    <div className="course-highlights">
                                        <Text type="secondary" className="highlights-title">课程亮点：</Text>
                                        {course.highlights.map((h, i) => (
                                            <Tag key={i} color="processing">{h}</Tag>
                                        ))}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Courses;
