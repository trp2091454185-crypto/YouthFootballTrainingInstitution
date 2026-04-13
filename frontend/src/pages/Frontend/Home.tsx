import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Typography, Space, Carousel } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import './Home.less';
import { getBannerList, getCoreStrengthsList } from '@/services/frontend';
import { ICON_MAP } from '@/components/IconsSelect';

const { Title, Paragraph, Text } = Typography;

// 统一图标样式
const iconStyle = { fontSize: 32, color: '#2E7D32' };

// 获取图标组件
const getIcon = (iconName: string): React.ReactNode => {
    const renderer = ICON_MAP[iconName];
    if (!renderer) return null;
    // 克隆元素并覆盖样式
    const element = renderer();
    return React.cloneElement(element as React.ReactElement<{ style?: React.CSSProperties }>, {
        style: iconStyle,
    });
};


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [features, setFeatures] = useState<any[]>([]);
    const [banners, setBanners] = useState<any[]>([]);
    useEffect(() => {
        fetchCoreAdvantages();
        fetchBanner();
        document.title = '首页';
    }, []);

    // 获取核心优势数据
    const fetchCoreAdvantages = async () => {
        try {
            const res = await getCoreStrengthsList();
            if (res?.success) {
                setFeatures(res?.data?.list || []);
            }
        } catch (error) {
            console.error('获取核心优势失败:', error);
        }
    };

    // 获取轮播图数据
    const fetchBanner = async () => {
        try {
            const res = await getBannerList();
            if (res?.success) {
                setBanners(res?.data?.list || []);
            }
        } catch (error) {
            console.error('获取轮播图失败:', error);
        }
    };

    // 处理轮播图点击
    const handleBannerClick = (item: any) => {
        if (item.linkType === 1) return;
        if (item.linkType === 2 && item.linkPage) {
            navigate(item.linkPage);
        } else if (item.linkType === 3 && item.linkUrl) {
            window.open(item.linkUrl, item.target || '_blank');
        }
    };

    return (
        <div className="home-page">
            {/* Hero 横幅区域 */}
            <section className={`hero-section${banners.length > 0 ? ' has-banner' : ''}`}>
                {/* 装饰光晕 */}
                <div className="hero-glow hero-glow--1" />
                <div className="hero-glow hero-glow--2" />
                <div className="hero-glow hero-glow--3" />

                {/* 左侧内容区 */}
                <div className="hero-left">
                    <Title level={1} className="hero-title">
                        <span className="title-highlight">绿茵青训</span>
                        <br />筑梦未来
                    </Title>
                    <Paragraph className="hero-subtitle">
                        专注于青少年足球培训，引进欧洲先进青训理念，为每一位热爱足球的孩子提供科学、系统的专业训练
                    </Paragraph>
                    <Space size={16} className="hero-actions">
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            onClick={() => navigate('/frontend/about')}
                            className="hero-btn-primary"
                        >
                            了解更多
                        </Button>
                        <Button
                            size="large"
                            onClick={() => navigate('/frontend/registration')}
                            className="hero-btn-outline"
                        >
                            立即报名
                        </Button>
                    </Space>
                    {/* 统计数据 */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-value">3+</div>
                            <div className="stat-label">年办学经验</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">10+</div>
                            <div className="stat-label">优质课程</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">100+</div>
                            <div className="stat-label">在读学员</div>
                        </div>
                    </div>
                </div>

                {banners.length > 0 && (
                    <div className="hero-right">
                        <div className='hero-banner-wrapper'>
                            <div className='hero-banner'>
                                <Carousel autoplay dotPosition="bottom" effect="fade">
                                    {banners.map((item: any, index: number) => (
                                        <div key={index} className="banner-item">
                                            <div
                                                className={`banner-content ${item.linkType !== 1 ? 'clickable' : ''}`}
                                                style={{ backgroundImage: `url(${item.imageUrl})` }}
                                                onClick={() => handleBannerClick(item)}
                                            >
                                                <div className="banner-text">
                                                    {item.title && <h3 className="banner-title">{item.title}</h3>}
                                                    {item.subtitle && <p className="banner-subtitle">{item.subtitle}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 核心亮点区块 */}
            {features.length > 0 && <section className="features-section">
                <div className="section-header">
                    <Title level={2} className="section-title">核心优势</Title>
                    <Text className="section-desc">我们致力于为每一位热爱足球的青少年提供最专业的训练平台</Text>
                </div>
                <Row gutter={[24, 24]} justify="center">
                    {features.map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card className="feature-card" hoverable>
                                <div className="feature-icon">{getIcon(item.icon) || getIcon('SolutionOutlined')}</div>
                                <Title level={4} className="feature-title">{item.title}</Title>
                                <Paragraph className="feature-desc">{item.desc}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>}

        </div>
    );
};

export default Home;
