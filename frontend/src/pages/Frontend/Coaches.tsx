import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Avatar, Tag, Typography, Empty } from 'antd';
import {
    TeamOutlined,
    SafetyCertificateOutlined,
    TrophyOutlined,
    StarFilled,
    SolutionOutlined,
} from '@ant-design/icons';
import './Coaches.less';
import { getCoachesList } from '@/services/frontend';

const { Title, Paragraph, Text } = Typography;

// 个人简介最大显示字符数
const BIO_MAX_LENGTH = 60;

const Coaches: React.FC = () => {

    const [coachesList, setCoachesList] = useState<any[]>([]);
    // 记录每张卡片简介的展开状态，key 为 coach index
    const [expandedBio, setExpandedBio] = useState<Set<number>>(new Set());

    useEffect(() => {
        document.title = '教练团队';
        fetchCoachesList();
    }, []);

    // 获取教练团队数据
    const fetchCoachesList = async () => {
        try {
            const res = await getCoachesList();
            if (res?.success) {
                setCoachesList(res?.data?.list || []);
            }
        } catch (error) {
            console.error('获取数据失败:', error);
        }
    };

    // 切换个人简介展开/收起
    const toggleBio = (index: number) => {
        setExpandedBio(prev => {
            const next = new Set(prev);
            next.has(index) ? next.delete(index) : next.add(index);
            return new Set(next);
        });
    };


    return (
        <div className="coaches-page">
            {/* 团队总览区块 */}
            <section className="coaches-hero">
                <div className="hero-grid-bg" />
                <div className="hero-glow hero-glow--left" />
                <div className="hero-glow hero-glow--right" />
                <div className="hero-content">
                    <span className="hero-badge">PROFESSIONAL TEAM</span>
                    <Title level={1} className="hero-title">精英教练团队</Title>
                    <Paragraph className="hero-desc">
                        汇聚行业顶尖教练人才，以专业的态度和丰富的经验<br />
                        为每一位学员量身定制成长方案
                    </Paragraph>
                </div>
            </section>

            {/* 教练列表 */}
            <section className="coaches-list-section">
                <Row gutter={[24, 24]} justify="center">
                    {coachesList.map((coach, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <Card className="coach-card">
                                <div className="coach-header">
                                    <Avatar size={72} className="coach-avatar" src={coach?.avatar} />
                                    <div className="coach-info">
                                        <Title level={4} className="coach-name">{coach?.name}</Title>
                                        <span className="coach-years">执教 {coach?.workYears || 0} 年</span>
                                        <div className="coach-age-groups">
                                            {coach?.ageGroups && coach.ageGroups.length > 0 ? (
                                                coach.ageGroups.map((tag: string, i: number) => (
                                                    <span key={i} className="age-tag">{tag}</span>
                                                ))
                                            ) : (
                                                <span className="age-empty">暂无</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="coach-tags">
                                    {coach?.specialties && coach.specialties.length > 0 ? (
                                        coach.specialties.map((tag: string, i: number) => (
                                            <Tag key={i} color="#2E7D32">{tag}</Tag>
                                        ))
                                    ) : (
                                        <span style={{ color: '#999' }}>暂无</span>
                                    )}
                                </div>
                                <div className="coach-detail">
                                    <div className="detail-item">
                                        <SafetyCertificateOutlined className="detail-icon" />
                                        <div>
                                            <Text type="secondary">教学特色</Text>
                                            <p>{coach.teachingFeatures}</p>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <SolutionOutlined className="detail-icon" style={{ color: '#FF6B35' }} />
                                        <div className="bio-wrapper">
                                            <Text type="secondary">个人简介</Text>
                                            <p className={`bio-text${expandedBio.has(index) ? ' is-expanded' : ''}`}>
                                                {coach?.bio || '暂无简介'}
                                            </p>
                                            {coach?.bio && coach.bio.length > BIO_MAX_LENGTH && (
                                                <span
                                                    className="bio-toggle"
                                                    onClick={() => toggleBio(index)}
                                                >
                                                    {expandedBio.has(index) ? '收起' : '展开'}
                                                </span>
                                            )}
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
