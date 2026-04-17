import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Typography, Menu, Pagination, Empty } from 'antd';
import {
    ClockCircleOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import './Courses.less';
import { CouresListParams, getCourseCategory, getCourseList } from '@/services/frontend';

const { Title, Paragraph, Text } = Typography;

const PAGE_SIZE = 4;

const Courses: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    //课程分类列表
    const [categoryList, setCategoryList] = useState<any[]>([]);
    //课程信息列表＋总数
    const [courseList, setCourseList] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    // 列表动画状态
    const [listKey, setListKey] = useState(0);

    useEffect(() => {
        document.title = '课程体系';
        fetchCourseCategory();
    }, []);

    useEffect(() => {
        const childIds = selectedCategory === 'all'
            ? undefined
            : categoryList.find(c => c.title === selectedCategory)?.childIds;
        let ids
        if (selectedCategory === 'all') {
            ids = undefined
        } else {
            ids = childIds && childIds.length > 0 ? childIds : ['1'];
        }
        fetchCoursesList({ current: currentPage, pageSize: PAGE_SIZE, ids });
    }, [currentPage, selectedCategory, categoryList]);


    // 获取课程分类数据
    const fetchCourseCategory = async () => {
        try {
            const res = await getCourseCategory();
            if (res?.success) {
                setCategoryList(res?.data?.list || []);
            }
        } catch (error) {
            console.error('获取数据失败:', error);
        }
    };

    // 获取课程信息数据
    const fetchCoursesList = async (params: CouresListParams) => {
        try {
            const res = await getCourseList(params);
            if (res?.success) {
                setCourseList(res?.data?.list || []);
                setTotal(res?.data?.total || 0);
                setListKey(prev => prev + 1); // 触发动画重播
            }
        } catch (error) {
            console.error('获取数据失败:', error);
        }
    };

    // 切换分类时重置页码
    const handleCategoryChange = (key: string) => {
        setSelectedCategory(key);
        setCurrentPage(1);
    };

    return (
        <div className="courses-page">
            <section className="courses-content">
                <div className="courses-container">
                    <Row gutter={32} align="top">
                        {/* 左侧筛选栏 */}
                        <Col xs={24} sm={24} md={6}>
                            <Card className="filter-card" bordered>
                                <div className="filter-header">
                                    <AppstoreOutlined />
                                    <span>课程分类</span>
                                </div>
                                <Menu
                                    mode="inline"
                                    selectedKeys={[selectedCategory]}
                                    onSelect={({ key }) => handleCategoryChange(key)}
                                    items={[
                                        { key: 'all', label: <span className="filter-menu-label">全部课程</span> },
                                        ...categoryList.map((cat) => ({
                                            key: cat.title,
                                            label: <span className="filter-menu-label">{cat.title}</span>
                                        }))
                                    ]}
                                />
                            </Card>
                        </Col>

                        {/* 右侧内容区 */}
                        <Col xs={24} sm={24} md={18}>
                            <div className="course-list-area">
                                {/* 结果统计 */}
                                <div className="result-info">
                                    <Text type="secondary">
                                        共找到 <Text strong>{total}</Text> 门课程
                                    </Text>
                                </div>

                                {/* 课程卡片列表 */}
                                {courseList.length > 0 ? (
                                    <div className="course-list-animate" key={listKey}>
                                        <Row gutter={[20, 20]}>
                                            {courseList.map((course, index) => (
                                                <Col xs={24} lg={12} key={index}>
                                                    <Card
                                                        className="course-card"
                                                        hoverable
                                                    >
                                                        <div className="card-top">
                                                            <Title level={4} className="course-name">
                                                                {course.name}
                                                            </Title>
                                                            <Tag color="#2E7D32">{course.ageGroup}</Tag>
                                                        </div>
                                                        <div className="course-meta">
                                                            <span>
                                                                <ClockCircleOutlined /> {course.classDuration}分钟/次 · 共{course.courseHours}课时
                                                            </span>
                                                            <span className="course-price">￥{course.price}/{course.priceUnit === 'course' ? '学期' : '课时'}</span>
                                                        </div>
                                                        <Paragraph className="course-desc">{course.desc}</Paragraph>
                                                        <div className="course-highlights">
                                                            <Text type="secondary" className="highlights-title">
                                                                课程亮点：
                                                            </Text>
                                                            {(course.features || []).map((h: string, i: number) => (
                                                                <Tag key={i} color="processing">
                                                                    {h}
                                                                </Tag>
                                                            ))}
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>

                                        {/* 分页器 */}
                                        {total > PAGE_SIZE && (
                                            <div className="pagination-wrapper">
                                                <Pagination
                                                    current={currentPage}
                                                    total={total}
                                                    pageSize={PAGE_SIZE}
                                                    onChange={(page) => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    showSizeChanger={false}
                                                />
                                            </div>
                                        )}                                   
                                    </div>
                                ) : (
                                    <Empty description="暂无该分类的课程" />
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Courses;
