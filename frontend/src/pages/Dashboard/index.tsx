import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  BellOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import './index.less'

interface StatCardProps {
  title: string;
  value: number;
  gradient: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  gradient,
  suffix = '',
}) => (
  <div className="stat-card" style={{ background: gradient }}>
    <div className="stat-card__content">
      <span className="stat-card__title">{title}</span>
      <span className="stat-card__value">
        {value.toLocaleString()}
        {suffix}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = '工作台';
  }, []);

  const statsData: StatCardProps[] = [
    {
      title: '学员总数',
      value: 1286,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      suffix: ' 人',
    },
    {
      title: '教练总数',
      value: 36,
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      suffix: ' 人',
    },
    {
      title: '课程总数',
      value: 48,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      suffix: ' 门',
    },
    {
      title: '待处理报名',
      value: 23,
      gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
      suffix: ' 条',
    },
  ];

  return (
    <PageContainer className="dashboard-container">
      <Row gutter={[24, 24]}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-card__header">
            <h3>运营概览</h3>
            <span className="summary-card__badge">实时</span>
          </div>
          <div className="summary-card__body">
            <div className="summary-item">
              <span className="summary-item__label">本月新增学员</span>
              <span className="summary-item__value highlight">+86</span>
            </div>
            <div className="summary-item">
              <span className="summary-item__label">本月完成课程</span>
              <span className="summary-item__value">328 节</span>
            </div>
            <div className="summary-item">
              <span className="summary-item__label">学员出勤率</span>
              <span className="summary-item__value">94.2%</span>
            </div>
            <div className="summary-item">
              <span className="summary-item__label">家长满意度</span>
              <span className="summary-item__value">4.8 / 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
