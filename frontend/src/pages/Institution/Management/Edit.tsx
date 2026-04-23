import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import {
    Form,
    Input,
    DatePicker,
    Button,
    Upload,
    Row,
    Col,
    message,
} from 'antd';
import {
    SaveOutlined,
    PhoneOutlined,
    MailOutlined,
    ClockCircleOutlined,
    QrcodeOutlined,
    PictureOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { getInstitutionInfo, updateInstitutionInfo, InstitutionInfo, createInstitutionInfo } from '@/services/institution';
import './Edit.less';
import ImageUpload from '@/components/ImageUpload';

const { TextArea } = Input;

interface EditProps {
    initialData?: InstitutionInfo | null;
}

const InstitutionEdit: React.FC<EditProps> = ({ initialData }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false);
    //机构Logo
    const [LogoImage, SetLogoImage] = useState<string>('');
    //微信二维码
    const [WechatImage, setWechatImage] = useState<string>('');


    // Logo上传变化处理
    const handleLogoImageChange = (value: string | string[]) => {
        SetLogoImage(value as string);
    };

    // 微信二维码上传变化处理
    const handleWechatImageChange = (value: string | string[]) => {
        setWechatImage(value as string);
    };


    // 加载机构信息
    const fetchInstitutionInfo = async () => {
        try {
            const res = await getInstitutionInfo();
            if (res?.data) {
                const data = res.data?.data as InstitutionInfo;
                setFormValues(data);
            }
        } catch (error) {
            console.error('获取机构信息失败:', error);
            message.error('获取机构信息失败');
        }
    };

    // 设置表单值
    const setFormValues = (data: InstitutionInfo) => {
        if (id) {
            form.setFieldsValue({
                name: data.name,
                slogan: data.slogan,
                description: data.description,
                foundedDate: data.foundedDate ? dayjs(data.foundedDate) : undefined,
                contactPhone: data.contactPhone,
                contactEmail: data.contactEmail,
                address: data.address,
                businessHours: data.businessHours,
            });
            SetLogoImage(data?.logo || '');
            setWechatImage(data?.wechatQr || '');
        }
    };

    useEffect(() => {
        document.title = id ? '编辑机构信息' : '新增机构信息';
        fetchInstitutionInfo();
    }, []);

    // 返回详情页
    const handleBack = () => {
        navigate('/institution/management');
    };

    // 保存数据
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            if (LogoImage == '') {
                message.warning('请上传机构Logo');
                return;
            }
            const submitData: InstitutionInfo = {
                ...values,
                logo: LogoImage,
                wechatQr: WechatImage,
            };

            if (id) {
                await updateInstitutionInfo(id, submitData);
            } else {
                await createInstitutionInfo(submitData);
            }
            message.success('保存成功');
            setTimeout(() => {
                navigate('/institution/management');
            }, 300);
        } catch (error: any) {
            if (error?.errorFields) {
                message.warning('请检查表单填写是否完整');
            } else {
                console.error('保存失败:', error);
                message.error('保存失败');
            }
        } finally {
            setSaving(false);
        }
    };
    return (
        <PageContainer
            breadcrumb={{
                items: [
                    { title: '机构管理' },
                    { title: '机构信息', href: '/institution/management' },
                    { title: id ? '编辑机构信息' : '新增机构信息' },
                ],
            }}
        >
            <div className="editContainer">
                <Row gutter={24}>
                    {/* 左侧表单区 */}
                    <Col xs={24} lg={16}>
                        {/* 基本信息卡片 */}
                        <div className="section-card">
                            <div className="section-header">
                                <span className="section-title">基本信息</span>
                                <span className="section-subtitle">填写机构的基础档案信息</span>
                            </div>
                            <div className="section-body">
                                <Form form={form} layout="vertical">
                                    <Row gutter={[24, 0]}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="name"
                                                label="机构名称"
                                                rules={[{ required: true, message: '请输入机构名称' }]}
                                            >
                                                <Input placeholder="请输入机构名称" maxLength={50} />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item name="slogan" label="机构标语"
                                                rules={[{ required: true, message: '未填写机构标语' }]}>
                                                <Input placeholder="请输入机构标语" maxLength={100} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item name="foundedDate" label="成立日期" rules={[{ required: true, message: '未选择成立日期' }]}>
                                                <DatePicker style={{ width: '100%' }} placeholder="选择成立日期" maxDate={dayjs(dayjs(), 'YYYY-MM-DD')} />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item name="description" label="机构简介" rules={[{ required: true, message: '请输入机构简介' }]}>
                                                <TextArea rows={4} placeholder="请输入机构简介" maxLength={500} showCount />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>

                        {/* 联系方式卡片 */}
                        <div className="section-card">
                            <div className="section-header">
                                <span className="section-title">联系方式</span>
                                <span className="section-subtitle">填写机构的联系渠道</span>
                            </div>
                            <div className="section-body">
                                <Form form={form} layout="vertical">
                                    <Row gutter={[24, 0]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="contactPhone"
                                                label="联系电话"
                                                rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
                                                { required: true, message: '请输入联系电话' }
                                                ]}
                                            >
                                                <Input placeholder="请输入联系电话" maxLength={11} prefix={<PhoneOutlined />} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="contactEmail"
                                                label="电子邮箱"
                                                rules={[{ type: 'email', message: '请输入正确的邮箱地址' }, { required: true, message: '请输入电子邮箱' }]}
                                            >
                                                <Input placeholder="请输入电子邮箱" prefix={<MailOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item name="businessHours" label="营业时间" rules={[{ required: true, message: '请输入营业时间' }]}>
                                                <Input
                                                    placeholder="例如：周一至周日 09:00-21:00"
                                                    prefix={<ClockCircleOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item name="address" label="详细地址" rules={[{ required: true, message: '请输入详细地址' }]}>
                                                <TextArea rows={2} placeholder="请输入详细地址" maxLength={200} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </Col>

                    {/* 右侧辅助信息区 */}
                    <Col xs={24} lg={8}>
                        {/* 品牌形象上传卡片 */}
                        <div className="section-card">
                            <div className="section-header">
                                <span className="section-title">品牌形象</span>
                            </div>
                            <div className="section-body">
                                <Row gutter={[50, 0]}>
                                    <Col xs={24} sm={12}>
                                        <div className="upload-section">
                                            <div className="upload-label">机构Logo</div>
                                            <ImageUpload
                                                value={LogoImage}
                                                onChange={handleLogoImageChange}
                                                text="上传图片"
                                                module='institutionInfo'
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={24} sm={12}>
                                        <div className="upload-section" >
                                            <div className="upload-label">微信二维码</div>
                                            <ImageUpload
                                                value={WechatImage}
                                                onChange={handleWechatImageChange}
                                                text="上传二维码"
                                                module='institutionInfo'
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {/* 填写须知卡片 */}
                        <div className="section-card">
                            <div className="section-header">
                                <span className="section-title">填写须知</span>
                            </div>
                            <div className="section-body">
                                <div className="info-card">
                                    <div className="info-icon">&#128161;</div>
                                    <div className="info-title">提示信息</div>
                                    <div className="info-desc">
                                        标有 <span style={{ color: '#ff4d4f' }}>*</span> 的为必填项，请准确填写机构信息。
                                        <br />
                                        <br />
                                        <strong>机构Logo：</strong>建议使用正方形图片，展示效果更佳
                                        <br />
                                        <br />
                                        <strong>微信二维码：</strong>用于学员扫码添加公众号或客服
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* 底部固定操作栏 */}
                <div className="form-footer">
                    <Button onClick={handleBack} size="large">
                        取消
                    </Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSave}
                        loading={saving}
                        size="large"
                    >
                        保存
                    </Button>
                </div>
            </div>
        </PageContainer >
    );
};

export default InstitutionEdit;
