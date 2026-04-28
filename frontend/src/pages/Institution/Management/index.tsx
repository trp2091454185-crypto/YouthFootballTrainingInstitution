import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  message,
  Row,
  Col,
  Divider,
  Tooltip,
} from 'antd';
import {
  EditOutlined,
  BankOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  WechatOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { getInstitutionInfo, InstitutionInfo } from '@/services/institution';
import './index.less';

const InstitutionDetail: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [institutionData, setInstitutionData] = useState<InstitutionInfo | null>(null);

  // 加载机构信息
  const fetchInstitutionInfo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInstitutionInfo();
      if (res?.data) {
        const data = res.data?.data as InstitutionInfo;
        setInstitutionData(data);
      }
    } catch (error) {
      console.error('获取机构信息失败:', error);
      message.error('获取机构信息失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = '机构信息管理';
    fetchInstitutionInfo();
  }, [fetchInstitutionInfo]);

  // 跳转到新建页面
  const handleCreate = () => {
    navigate('/institution/management/create');
  };

  // 跳转到编辑页面
  const handleEdit = () => {
    navigate(`/institution/management/edit/${institutionData?.id}`);
  };

  // 渲染空状态
  const renderEmptyState = () => (
    <div className="empty-state">
      <div className="empty-content">
        <div className="empty-icon-wrapper">
          <BankOutlined className="empty-icon" />
        </div>
        <h3 className="empty-title">开始构建您的机构档案</h3>
        <p className="empty-desc">完善机构信息，展现专业形象</p>
        <Button type="primary" icon={<EditOutlined />} onClick={handleCreate} className="create-btn">
          创建机构信息
        </Button>
      </div>
    </div>
  );

  // 渲染左侧内容区
  const renderLeftPanel = () => (
    <div className="left-panel">
      {/* 机构头部名片 */}
      <div className="institution-header">
        <div className="header-bg">
          <div className="header-pattern" />
        </div>
        <div className="header-content">
          {/* <div className="institution-badge">
            <SafetyCertificateOutlined />
            <span>认证机构</span>
          </div> */}
          <h1 className="institution-name">{institutionData?.name || '-'}</h1>
          {institutionData?.slogan && (
            <p className="institution-slogan">"{institutionData.slogan}"</p>
          )}
          {institutionData?.foundedDate && (
            <div className="institution-meta">
              <div className="founded-date-card">
                <div className="date-icon-wrap">
                  <CalendarOutlined />
                </div>
                <div className="date-info">
                  <span className="date-label">成立于</span>
                  <span className="date-value">{dayjs(institutionData.foundedDate).format('YYYY年MM月DD日')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 机构简介卡片 */}
      <div className="info-card card-intro">
        <div className="card-title-bar">
          <InfoCircleOutlined className="card-icon" />
          <span>机构简介</span>
        </div>
        <div className="card-content">
          <p className="intro-text">{institutionData?.description || '暂无简介信息'}</p>
        </div>
      </div>

      {/* 联系与运营卡片（合并） */}
      <div className="info-card card-contact-operation">
        <div className="card-title-bar">
          <PhoneOutlined className="card-icon" />
          <span>联系方式</span>
        </div>
        <div className="card-content">
          <div className="info-grid">
            {/* 联系电话 */}
            <div className="info-item">
              <div className="info-icon-wrap phone">
                <PhoneOutlined />
              </div>
              <div className="info-detail">
                <span className="info-label">联系电话</span>
                <span className="info-value">{institutionData?.contactPhone || '未设置'}</span>
              </div>
            </div>

            {/* 电子邮箱 */}
            <div className="info-item">
              <div className="info-icon-wrap email">
                <MailOutlined />
              </div>
              <div className="info-detail">
                <span className="info-label">电子邮箱</span>
                <span className="info-value">{institutionData?.contactEmail || '未设置'}</span>
              </div>
            </div>

            {/* 详细地址 */}
            <div className="info-item info-item-wide address">
              <div className="info-icon-wrap addr">
                <EnvironmentOutlined />
              </div>
              <div className="info-detail">
                <span className="info-label">详细地址</span>
                <p className="info-value-text">{institutionData?.address || '暂未设置详细地址'}</p>
              </div>
            </div>

            {/* 营业时间 */}
            <div className="info-item info-item-wide operation">
              <div className="info-icon-wrap time">
                <ClockCircleOutlined />
              </div>
              <div className="info-detail">
                <span className="info-label">营业时间</span>
                <span className="info-value">{institutionData?.businessHours || '未设置'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 渲染右侧面板
  const renderRightPanel = () => (
    <div className="right-panel">
      {/* 品牌形象卡片 */}
      <div className="brand-card">
        <div className="brand-card-header">
          <PictureOutlined className="brand-icon" />
          <span>品牌形象</span>
        </div>
        <div className="brand-card-body">
          {/* Logo 与二维码并排展示区 */}
          <div className="brand-showcase-row">
            {/* Logo */}
            <div className="brand-showcase logo-showcase">
              <div className="showcase-label">机构 Logo</div>
              <div className="showcase-image-wrapper">
                {institutionData?.logo ? (
                  <img src={institutionData.logo} alt="机构Logo" className="showcase-image" />
                ) : (
                  <div className="showcase-placeholder">
                    <PictureOutlined className="placeholder-icon" />
                    <span>暂未上传</span>
                  </div>
                )}
              </div>
            </div>

            {/* 二维码 */}
            <div className="brand-showcase qr-showcase">
              <div className="showcase-label">
                <WechatOutlined /> 微信二维码
              </div>
              <div className="showcase-image-wrapper">
                {institutionData?.wechatQr ? (
                  <img src={institutionData.wechatQr} alt="微信二维码" className="showcase-image" />
                ) : (
                  <div className="showcase-placeholder">
                    <WechatOutlined className="placeholder-icon" />
                    <span>暂未上传</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 时间轴信息卡片 */}
      <div className="timeline-card">
        <div className="timeline-card-header">
          <ClockCircleOutlined className="timeline-icon" />
          <span>时间记录</span>
        </div>
        <div className="timeline-card-body">
          <div className="timeline-item">
            <div className="timeline-dot create" />
            <div className="timeline-content">
              <span className="timeline-label">创建时间</span>
              <span className="timeline-value">
                {institutionData?.createdAt ? dayjs(institutionData.createdAt).format('YYYY-MM-DD HH:mm') : '-'}
              </span>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot update" />
            <div className="timeline-content">
              <span className="timeline-label">最后更新</span>
              <span className="timeline-value">
                {institutionData?.updatedAt ? dayjs(institutionData.updatedAt).format('YYYY-MM-DD HH:mm') : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 快捷操作卡片 */}
      <div className="action-card">
        <Tooltip title="编辑机构信息" placement="left">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="edit-action-btn"
            block
            size="large"
          >
            编辑信息
          </Button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <PageContainer
      loading={loading}
      breadcrumb={{
        items: [
          { title: '机构管理' },
          { title: '机构信息' },
        ],
      }}
    >
      {!institutionData && !loading ? (
        renderEmptyState()
      ) : (
        <div className="detailContainer">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={16}>
              {renderLeftPanel()}
            </Col>
            <Col xs={24} xl={8}>
              {renderRightPanel()}
            </Col>
          </Row>
        </div>
      )}
    </PageContainer>
  );
};

export default InstitutionDetail;
