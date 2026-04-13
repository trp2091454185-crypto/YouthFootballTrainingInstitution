import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, AccountBookOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="会员总数"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="球队总数"
              value={93}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="球员总数"
              value={456}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="比赛场次"
              value={112}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="财务概况" bordered={false}>
            <Statistic
              title="本月收入"
              value={11280}
              precision={2}
              prefix={<AccountBookOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="近期比赛" bordered={false}>
            <Statistic
              title="本月比赛"
              value={12}
              suffix="场"
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
