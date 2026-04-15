import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Image, Tag } from 'antd';
import {
    ApartmentOutlined,
    TrophyOutlined,
    EnvironmentOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './About.less';
import { getFrontHonorList } from '@/services/frontend';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
    //奖项数据
    const [honorList, SetHonorList] = useState<any[]>([]);

    useEffect(() => {
        document.title = '机构介绍';
        fetchHonorList()
    }, []);

    // 获取荣誉奖项数据
    const fetchHonorList = async () => {
        try {
            const res = await getFrontHonorList();
            if (res?.success) {
                SetHonorList(res?.data?.list || []);
            }
        } catch (error) {
            console.error('获取核心优势失败:', error);
        }
    };


    return (
        <div className="about-page">
            {/* 机构简介区块 */}
            <section className="intro-section">
                <div className="intro-banner">
                    <div className="banner-text">
                        <Tag icon={<ApartmentOutlined />} color="#2E7D32" className="banner-tag">关于我们</Tag>
                        <Title level={1} className="intro-title">专业铸就品质 · 匠心培育英才</Title>
                        <Paragraph className="intro-desc">
                            绿茵青训机构成立于2020年，是一家专注于5-16岁青少年足球培训的专业机构。
                            我们秉承"以球育人、快乐足球"的教育理念，引进欧洲先进青训体系，
                            结合中国青少年身心发展特点，打造了一套科学、系统、有趣的足球训练课程。
                            目前已拥有3个标准训练基地，占地总面积超20000平方米，
                            在册学员超过500人，是本地最具规模和影响力的足球青训品牌。
                        </Paragraph>
                    </div>
                    <div className="banner-image">
                        <div className="image-placeholder">
                            <ApartmentOutlined style={{ fontSize: 64, color: '#4CAF50' }} />
                            <span>机构全景</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 数据展示区 */}
            <section className="stats-section">
                <Row gutter={[32, 32]} justify="center">
                    {[
                        { number: '500+', label: '在册学员', icon: <TeamOutlined /> },
                        { number: '50+', label: '职业球员输出', icon: <TrophyOutlined /> },
                        { number: '20000㎡', label: '训练场地面积', icon: <EnvironmentOutlined /> },
                        { number: '10+', label: '资深教练团队', icon: <SafetyCertificateOutlined /> },
                    ].map((stat, index) => (
                        <Col xs={12} sm={12} md={6} key={index}>
                            <div className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* 荣誉奖项区块 */}
            {honorList?.length > 0 && <section className="awards-section">
                <div className="section-header">
                    <TrophyOutlined className="section-icon" />
                    <Title level={2} className="section-title">荣誉奖项</Title>
                </div>
                <Row gutter={[24, 24]}>
                    {honorList.map((award, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <Card className="honor-card">
                                <div className="honor-image-wrapper">
                                    {award.image ? (
                                        <Image
                                            src={award.image}
                                            alt={award.title}
                                            className="honor-image"
                                            preview={{ mask: '查看大图' }}
                                        />
                                    ) : (
                                        <div className="honor-image-fallback">
                                            <TrophyOutlined />
                                            <span>暂无图片</span>
                                        </div>
                                    )}
                                </div>
                                <div className="honor-content">
                                    <Title level={4} className="honor-title">{award.title}</Title>
                                    <div className="honor-org">
                                        <Text type="secondary">颁发机构：{award.org}</Text>
                                        <Text type="secondary">{dayjs(award.honorData).format("YYYY-MM-DD")}</Text>
                                    </div>
                                    {award.desc ? (
                                        <Paragraph className="honor-desc" ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}>
                                            {award.desc}
                                        </Paragraph>
                                    ) : (
                                        <Text type="secondary" className="honor-desc-empty">暂无描述</Text>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>}

            {/* 场地设施区块 */}
            <section className="venue-section">
                <div className="section-header">
                    <EnvironmentOutlined className="section-icon" />
                    <Title level={2} className="section-title">场地设施</Title>
                </div>
                <Row gutter={[24, 24]}>
                    {[
                        { title: '主训练场', desc: '国际标准11人制天然草坪球场，配备专业照明系统' },
                        { title: '室内训练馆', desc: '全天候恒温室内场馆，面积3000平方米' },
                        { title: '体能训练中心', desc: '配备全套专业体能训练器材及恢复设备' },
                    ].map((venue, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card className="venue-card" hoverable>
                                <div className="venue-image">
                                    <EnvironmentOutlined style={{ fontSize: 36, color: '#4CAF50' }} />
                                </div>
                                <Title level={5}>{venue.title}</Title>
                                <Paragraph type="secondary">{venue.desc}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    );
};

export default About;
