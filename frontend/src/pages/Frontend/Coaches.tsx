import React, { useEffect } from 'react';
import { Row, Col, Card, Avatar, Tag, Typography, Empty } from 'antd';
import {
    TeamOutlined,
    SafetyCertificateOutlined,
    TrophyOutlined,
    StarFilled,
} from '@ant-design/icons';
import './Coaches.less';

const { Title, Paragraph, Text } = Typography;

const coaches = [
    {
        name: '张伟',
        title: '总教练 / 亚足联A级教练员',
        specialty: '战术训练、比赛指导',
        experience: '15年执教经验，前中超球员',
        achievements: '带队获得省级冠军3次',
        avatar: null,
        tags: ['亚足联A级', '前职业球员'],
    },
    {
        name: '李强',
        title: '技术总监 / 亚足联B级教练员',
        specialty: '技术训练、青训体系设计',
        experience: '12年执教经验',
        achievements: '培养职业球员20余名',
        avatar: null,
        tags: ['亚足联B级', '青训专家'],
    },
    {
        name: '王磊',
        title: '守门员教练 / 前国少队门将',
        specialty: '守门员专项训练',
        experience: '10年执教经验，8年职业履历',
        achievements: '培养多名优秀门将',
        avatar: null,
        tags: ['门将专项', '前国字号'],
    },
    {
        name: '陈明',
        title: '体能教练 / 国家一级运动员',
        specialty: '体能训练、运动康复',
        experience: '8年专业体能训练经验',
        achievements: '运动科学硕士学历',
        avatar: null,
        tags: ['体能专项', '运动科学'],
    },
    {
        name: '刘洋',
        title: 'U12梯队主教练 / 亚足联C级教练员',
        specialty: '青少年基础技术教学',
        experience: '7年青少年足球教学经验',
        achievements: '多次获评优秀教师',
        avatar: null,
        tags: ['亚足联C级', '少儿专家'],
    },
    {
        name: '赵鹏',
        title: 'U8梯队主教练 / 体育教育学士',
        specialty: '幼儿足球启蒙教育',
        experience: '6年少儿足球启蒙经验',
        achievements: '独创趣味足球教学法',
        avatar: null,
        tags: ['启蒙教育', '趣味教学'],
    },
];

const Coaches: React.FC = () => {
    useEffect(() => {
        document.title = '教练团队';
    }, []);
    return (
        <div className="coaches-page">
            {/* 团队总览区块 */}
            <section className="coaches-hero">
                <div className="hero-content">
                    <TeamOutlined className="hero-icon" />
                    <Title level={1} className="hero-title">精英教练团队</Title>
                    <Paragraph className="hero-desc">
                        汇聚行业顶尖教练人才，以专业的态度和丰富的经验，
                        为每一位学员量身定制成长方案
                    </Paragraph>
                    <div className="coach-stats">
                        <div className="stat-item">
                            <span className="stat-num">10+</span>
                            <span className="stat-text">资深教练</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">80%</span>
                            <span className="stat-text">持证上岗</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-num">10年+</span>
                            <span className="stat-text">平均教龄</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 教练列表 */}
            <section className="coaches-list-section">
                <Row gutter={[24, 24]} justify="center">
                    {coaches.map((coach, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <Card className="coach-card" hoverable>
                                <div className="coach-header">
                                    <Avatar size={72} className="coach-avatar" icon={<TeamOutlined />} />
                                    <div className="coach-info">
                                        <Title level={4} className="coach-name">{coach.name}</Title>
                                        <Text className="coach-title">{coach.title}</Text>
                                    </div>
                                </div>
                                <div className="coach-tags">
                                    {coach.tags.map((tag, i) => (
                                        <Tag key={i} color="#2E7D32">{tag}</Tag>
                                    ))}
                                </div>
                                <div className="coach-detail">
                                    <div className="detail-item">
                                        <SafetyCertificateOutlined className="detail-icon" />
                                        <div>
                                            <Text type="secondary">擅长领域</Text>
                                            <p>{coach.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <StarFilled className="detail-icon" style={{ color: '#FFC107' }} />
                                        <div>
                                            <Text type="secondary">个人经历</Text>
                                            <p>{coach.experience}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <TrophyOutlined className="detail-icon" style={{ color: '#FF5722' }} />
                                        <div>
                                            <Text type="secondary">主要成就</Text>
                                            <p>{coach.achievements}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    );
};

export default Coaches;
