import React, { useState, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from '@umijs/max';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    FormOutlined,
    ApartmentOutlined,
    SolutionOutlined,
    BookOutlined,
    EditOutlined,
    CommentOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import logo from '@/assets/logo.png';
import routes from '@/config/routes';
import './index.less';
import { clearAuth, getUserInfo } from '@/utils/auth';

const { Sider, Content } = Layout;

// Icon 映射表
const iconMapping: Record<string, React.ReactNode> = {
    form: <FormOutlined />,
    home: <HomeOutlined />,
    apartment: <ApartmentOutlined />,
    student: <SolutionOutlined />,
    team: <TeamOutlined />,
    course: <BookOutlined />,
    registration: <EditOutlined />,
    feedback: <CommentOutlined />,
    system: <SettingOutlined />
};

// 路由配置转换为菜单项
const convertRoutesToMenuItems = (routes: any[]): MenuProps['items'] => {
    return routes.filter((route) => !route.hideInMenu).map((route) => {
        const item: any = {
            key: route.path,
            icon: route.icon ? iconMapping[route.icon] : null,
            label: route.name,
        };

        if (route.routes && route.routes.length > 0) {
            item.children = convertRoutesToMenuItems(route.routes);
        }

        return item;
    });
};

const CustomLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = getUserInfo();


    // 从路由配置生成菜单项
    const menuItems = useMemo(() => {
        const layoutRoute = routes.find((r) => r.path === '/');
        return layoutRoute?.routes ? convertRoutesToMenuItems(layoutRoute.routes) : [];
    }, []);

    // 当前选中的菜单
    const selectedKeys = [location.pathname];

    // 下拉菜单项
    const userMenuItems = [
        {
            key: 'logout',
            label: '退出登录',
            icon: <LogoutOutlined />,
        },
    ];

    // 用户下拉菜单点击
    const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            // 清除本地认证信息
            clearAuth();
            navigate('/');
        }
    };


    return (
        <Layout className="custom-layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                trigger={null}
                className="sider"
                theme="light"
                width={240}
                collapsedWidth={64}
            >
                <div className="logo-container">
                    <div className="logo">
                        <img src={logo} alt="⚽️" />
                    </div>
                    {!collapsed && <span className="logo-text">绿茵青训机构</span>}
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    onClick={({ key }) => navigate(key as string)}
                />
                <Dropdown
                    menu={{
                        items: userMenuItems,
                        onClick: handleUserMenuClick
                    }}
                    placement="bottomRight"
                >
                    <div className="user-info">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="user-name">{currentUser?.roleName || '管理员'}</span>
                    </div>
                </Dropdown>
            </Sider>

            <Layout className={`outer-layout ${collapsed ? 'collapsed' : ''}`}>
                <Content className="content">
                    <div key={location.pathname} className="page-transition">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};

export default CustomLayout;
