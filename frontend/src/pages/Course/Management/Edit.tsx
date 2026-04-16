import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@umijs/max';
import {
    Form,
    Input,
    Select,
    InputNumber,
    Row,
    Col,
    Button,
    message,
    Spin,
    Upload,
    Image,
    Space,
    Tag,
    Divider,
} from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { createCourse, updateCourse, getCourseDetail } from '@/services/course';
import type { Course, CourseOutline } from '@/services/course';
import { getCourseCategoryList } from '@/services/course';
import './index.less';
import { PageContainer } from '@ant-design/pro-components';
import type { UploadFile } from 'antd/es/upload/interface';
import { AGE_GROUP_OPTIONS } from '@/utils/constant';

const { Option } = Select;
const { TextArea } = Input;

// 价格单位选项
const PRICE_UNIT_OPTIONS = [
    { label: '每期', value: 'course' },
    { label: '每课时', value: 'hour' },
];


const CourseEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [coverImage, setCoverImage] = useState<string>('');
    const [outlines, setOutlines] = useState<CourseOutline[]>([]);
    const [objectives, setObjectives] = useState<string[]>(['']);
    const [features, setFeatures] = useState<string[]>(['']);

    const isEdit = !!id;

    // 加载课程详情
    useEffect(() => {
        fetchCategories();
        if (isEdit && id) {
            fetchCourseDetail(id);
        }
    }, [isEdit, id]);

    // 设置浏览器标题
    useEffect(() => {
        document.title = !!id ? '编辑课程' : '新增课程';
    }, [id]);

    // 获取分类列表
    const fetchCategories = async () => {
        try {
            const res = await getCourseCategoryList();
            if (res.success && res.data) {
                setCategories(res.data.list || []);
            }
        } catch (error) {
            console.error('获取分类失败:', error);
        }
    };

    const fetchCourseDetail = async (courseId: string) => {
        setLoading(true);
        try {
            const res = await getCourseDetail(courseId);
            if (res.success && res.data) {
                const course = res.data;
                form.setFieldsValue({
                    ...course,
                });
                setCoverImage(course.coverImage || '');
                setOutlines(course.outline || []);
                setObjectives(course.objectives && course.objectives.length > 0 ? course.objectives : ['']);
                setFeatures(course.features && course.features.length > 0 ? course.features : ['']);
            } else {
                message.error(res.errorMessage || '获取课程信息失败');
            }
        } catch (error) {
            message.error('获取课程信息失败');
        } finally {
            setLoading(false);
        }
    };

    // 返回列表页
    const handleBack = () => {
        navigate('/course/management');
    };

    // 添加课程大纲
    const handleAddOutline = () => {
        setOutlines([...outlines, { phase: '', title: '', content: '' }]);
    };

    // 删除课程大纲
    const handleRemoveOutline = (index: number) => {
        setOutlines(outlines.filter((_, i) => i !== index));
    };

    // 更新大纲字段
    const handleOutlineChange = (index: number, field: keyof CourseOutline, value: any) => {
        const newOutlines = [...outlines];
        newOutlines[index] = { ...newOutlines[index], [field]: value };
        setOutlines(newOutlines);
    };

    // 添加课程目标
    const handleAddObjective = () => {
        setObjectives([...objectives, '']);
    };

    // 删除课程目标
    const handleRemoveObjective = (index: number) => {
        if (objectives.length > 1) {
            setObjectives(objectives.filter((_, i) => i !== index));
        }
    };

    // 更新课程目标
    const handleObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...objectives];
        newObjectives[index] = value;
        setObjectives(newObjectives);
    };

    // 添加课程特色
    const handleAddFeature = () => {
        setFeatures([...features, '']);
    };

    // 删除课程特色
    const handleRemoveFeature = (index: number) => {
        if (features.length > 1) {
            setFeatures(features.filter((_, i) => i !== index));
        }
    };

    // 更新课程特色
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    // 提交表单
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const submitData: Partial<Course> = {
                ...values,
                                outline: outlines.filter(o => o.title.trim()),
                features: features.filter(f => f.trim()),
                objectives: objectives.filter(o => o.trim()),
            };

            let res;
            if (isEdit && id) {
                res = await updateCourse(id, submitData as Course);
            } else {
                res = await createCourse(submitData as Course);
            }

            if (res.success) {
                message.success(isEdit ? '更新成功' : '创建成功');
                setTimeout(() => {
                    navigate('/course/management');
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

    // 上传封面图片（模拟）
    const handleCoverUpload = (info: any) => {
        // 这里应该调用实际上传接口
        // 暂时模拟上传成功
        if (info.file.status === 'done') {
            setCoverImage(URL.createObjectURL(info.file.originFileObj));
            message.success('上传成功');
        }
    };

    return (
        <PageContainer
            breadcrumb={{
                items: [
                    { title: '课程管理' },
                    { title: '课程列表', href: '/course/management' },
                    { title: isEdit ? '编辑课程' : '新增课程' },
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
                                        <span className='section-subtitle'>填写课程的基础信息</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            {/* 课程编码 + 名称 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="name"
                                                    label="课程名称"
                                                    rules={[{ required: true, message: '请输入课程名称' }]}
                                                >
                                                    <Input placeholder="请输入课程名称" maxLength={50} />
                                                </Form.Item>
                                            </Col>

                                            {/* 所属分类 + 年龄段 */}
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="categoryId"
                                                    label="所属分类"
                                                    rules={[{ required: true, message: '请选择分类' }]}
                                                >
                                                    <Select placeholder="请选择分类">
                                                        {categories.map((cat) => (
                                                            <Option key={cat.id} value={cat.id}>
                                                                {cat.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="ageGroupTag"
                                                    label="适合年龄段"
                                                    rules={[{ required: true, message: '请选择年龄段' }]}
                                                >
                                                    <Select placeholder="请选择年龄段">
                                                        {AGE_GROUP_OPTIONS.map((opt) => (
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

                                {/* 课时信息卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>课时信息</span>
                                        <span className='section-subtitle'>设置课程的课时和班级规模</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="courseHours"
                                                    label="总课时数"
                                                    rules={[{ required: true, message: '请输入总课时数' }]}
                                                >
                                                    <InputNumber min={1} max={999} style={{ width: '100%' }} placeholder="节" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="classDuration"
                                                    label="单次课时"
                                                    rules={[{ required: true, message: '请输入单次课时' }]}
                                                >
                                                    <InputNumber min={30} max={180} style={{ width: '100%' }} placeholder="分钟" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="classSizeMax"
                                                    label="最多容纳人数"
                                                    rules={[{ required: true, message: '请输入最多容纳人数' }]}
                                                >
                                                    <InputNumber min={1} max={200} style={{ width: '100%' }} placeholder="人" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                {/* 价格信息卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>价格信息</span>
                                        <span className='section-subtitle'>设置课程的价格</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="price"
                                                    label="价格"
                                                    rules={[{ required: true, message: '请输入价格' }]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        precision={2}
                                                        style={{ width: '100%' }}
                                                        prefix="¥"
                                                        placeholder="请输入价格"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item
                                                    name="priceUnit"
                                                    label="计价单位"
                                                    rules={[{ required: true, message: '请选择计价单位' }]}
                                                >
                                                    <Select placeholder="请选择">
                                                        {PRICE_UNIT_OPTIONS.map((opt) => (
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

                                {/* 课程详情卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>课程详情</span>
                                        <span className='section-subtitle'>填写课程的详细描述</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="description"
                                                    label="课程描述"
                                                >
                                                    <TextArea rows={4} placeholder="请输入课程的详细描述" maxLength={500} showCount />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    name="equipment"
                                                    label="所需装备"
                                                >
                                                    <TextArea rows={2} placeholder="如：足球鞋、运动服、护腿板等" maxLength={200} showCount />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <div className="objective-section">
                                                    <div className="objective-label">
                                                        <span className="label-text">课程目标</span>
                                                        <span className="label-extra">每行一个目标，可添加多个</span>
                                                    </div>
                                                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                                        {objectives.map((objective, index) => (
                                                            <div key={index} className="objective-item">
                                                                <Input
                                                                    placeholder={`如：掌握基本传球技巧`}
                                                                    value={objective}
                                                                    onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                                                    maxLength={100}
                                                                    style={{ flex: 1 }}
                                                                />
                                                                <Button
                                                                    type="text"
                                                                    danger
                                                                    icon={<DeleteOutlined />}
                                                                    onClick={() => handleRemoveObjective(index)}
                                                                    disabled={objectives.length <= 1}
                                                                />
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="dashed"
                                                            block
                                                            icon={<PlusOutlined />}
                                                            onClick={handleAddObjective}
                                                        >
                                                            添加目标
                                                        </Button>
                                                    </Space>
                                                </div>
                                            </Col>
                                            <Divider />
                                            <Col span={24}>
                                                <div className="feature-section">
                                                    <div className="feature-label">
                                                        <span className="label-text">课程特色</span>
                                                        <span className="label-extra">每行一个特色，可添加多个</span>
                                                    </div>
                                                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                                        {features.map((feature, index) => (
                                                            <div key={index} className="feature-item">
                                                                <Input
                                                                    placeholder={`如：专业教练团队`}
                                                                    value={feature}
                                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                                    maxLength={100}
                                                                    style={{ flex: 1 }}
                                                                />
                                                                <Button
                                                                    type="text"
                                                                    danger
                                                                    icon={<DeleteOutlined />}
                                                                    onClick={() => handleRemoveFeature(index)}
                                                                    disabled={features.length <= 1}
                                                                />
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="dashed"
                                                            block
                                                            icon={<PlusOutlined />}
                                                            onClick={handleAddFeature}
                                                        >
                                                            添加特色
                                                        </Button>
                                                    </Space>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                {/* 课程大纲卡片 */}
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>课程大纲</span>
                                        <span className='section-subtitle'>设置课程的教学大纲</span>
                                    </div>
                                    <div className='section-body'>
                                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                            {outlines.map((outline, index) => (
                                                <div key={index} className="outline-item">
                                                    <Row gutter={[16, 8]}>
                                                        <Col xs={24} sm={4}>
                                                            <Input
                                                                placeholder="阶段名称"
                                                                value={outline.phase}
                                                                onChange={(e) => handleOutlineChange(index, 'phase', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col xs={24} sm={8}>
                                                            <Input
                                                                placeholder="核心主题"
                                                                value={outline.title}
                                                                onChange={(e) => handleOutlineChange(index, 'title', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col xs={24} sm={8}>
                                                            <Input
                                                                placeholder="训练内容"
                                                                value={outline.content}
                                                                onChange={(e) => handleOutlineChange(index, 'content', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col xs={4} sm={2}>
                                                            <Button
                                                                type="text"
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                                onClick={() => handleRemoveOutline(index)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                            <Button
                                                type="dashed"
                                                block
                                                icon={<PlusOutlined />}
                                                onClick={handleAddOutline}
                                            >
                                                添加大纲阶段
                                            </Button>
                                        </Space>
                                    </div>
                                </div>
                            </Col>

                            {/* 右侧辅助信息区 */}
                            <Col xs={24} lg={8}>
                                <div className='section-card'>
                                    <div className='section-header'>
                                        <span className='section-title'>发布设置</span>
                                    </div>
                                    <div className='section-body'>
                                        <Row gutter={[24, 0]}>
                                            {/* 课程封面 */}
                                            <Col span={24}>
                                                <Form.Item label="课程封面">
                                                    <Space direction="vertical" size={8}>
                                                        {coverImage && (
                                                            <Image
                                                                src={coverImage}
                                                                alt="课程封面"
                                                                width={200}
                                                                height={120}
                                                                style={{ objectFit: 'cover', borderRadius: 8 }}
                                                            />
                                                        )}
                                                        <Upload
                                                            accept="image/*"
                                                            showUploadList={false}
                                                            customRequest={({ onSuccess }) => {
                                                                setTimeout(() => onSuccess?.('ok'), 500);
                                                            }}
                                                            onChange={handleCoverUpload}
                                                        >
                                                            <Button icon={<UploadOutlined />}>
                                                                {coverImage ? '更换封面' : '上传封面'}
                                                            </Button>
                                                        </Upload>
                                                    </Space>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="课程图片集">
                                                    <Space direction="vertical" size={8}>
                                                        {coverImage && (
                                                            <Image
                                                                src={coverImage}
                                                                alt="图片集"
                                                                width={200}
                                                                height={120}
                                                                style={{ objectFit: 'cover', borderRadius: 8 }}
                                                            />
                                                        )}
                                                        <Upload
                                                            accept="image/*"
                                                            showUploadList={false}
                                                            customRequest={({ onSuccess }) => {
                                                                setTimeout(() => onSuccess?.('ok'), 500);
                                                            }}
                                                            onChange={handleCoverUpload}
                                                        >
                                                            <Button icon={<UploadOutlined />}>
                                                                {coverImage ? '更换封面' : '上传封面'}
                                                            </Button>
                                                        </Upload>
                                                    </Space>
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
                                                标有 <span style={{ color: '#ff4d4f' }}>*</span> 的为必填项。课程大纲可以根据实际教学计划添加多个阶段，每个阶段包含标题、内容。
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

export default CourseEdit;
