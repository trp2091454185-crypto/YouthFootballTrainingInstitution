import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from '@umijs/max';
import { Layout, Menu, Avatar } from 'antd';
import {
    HomeOutlined,
    ApartmentOutlined,
    TeamOutlined,
    BookOutlined,
    EditOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import logo from '@/assets/logo.png';
import './FrontendLayout.less';

const { Header, Content } = Layout;

// 菜单项配置
const menuItems: MenuProps['items'] = [
    {
        key: '/frontend',
        icon: <HomeOutlined />,
        label: '首页',
    },
    {
        key: '/frontend/about',
        icon: <ApartmentOutlined />,
        label: '机构介绍',
    },
    {
        key: '/frontend/coaches',
        icon: <TeamOutlined />,
        label: '教练团队',
    },
    {
        key: '/frontend/courses',
        icon: <BookOutlined />,
        label: '课程体系',
    },
    {
        key: '/frontend/registration',
        icon: <EditOutlined />,
        label: '报名咨询',
    },
    {
        key: '/frontend/feedback',
        icon: <CommentOutlined />,
        label: '反馈留言',
    },
];

const FrontendLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 当前选中的菜单
    const selectedKeys = [location.pathname === '/frontend' ? '/frontend' : location.pathname];

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key as string);
    };

    return (
        <Layout className="frontend-layout">
            <Header className="frontend-header">
                <div className="header-left">
                    <div className="logo-container">
                        <img src={logo} alt="绿茵青训" className="logo-img" />
                        <span className="logo-text">绿茵青训机构</span>
                    </div>
                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="header-menu"
                />
                <div className="header-right">
                    <Avatar size={32} icon={<HomeOutlined />} className="header-avatar"
                        onClick={() => navigate('/login')} />
                </div>
            </Header>
            <Content className="frontend-content">
                <div key={location.pathname} className="page-transition">
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};

export default FrontendLayout;
