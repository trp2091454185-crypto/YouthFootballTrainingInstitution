import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProConfigProvider, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, message, Space, theme, Typography } from 'antd';
import logo from '@/assets/logo.png';
import './index.less';
import { useNavigate } from '@umijs/max';

const { Link } = Typography;

const Page = () => {
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const handleLogin = async (values: Record<string, string>) => {
        // try {
        //     // TODO: 调用实际的登录API
        //     console.log('登录信息:', values);
        //     message.success('登录成功');
        // } catch (error) {
        //     message.error('登录失败，请重试');
        // }
        message.success('登录成功');
        navigate('/dashboard');
    };

    return (
        <div className="loginPage">
            <LoginFormPage
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                logo={logo}
                title="绿茵青训"
                subTitle="绿茵青训后台管理门户"
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 16,
                }}
                submitter={{
                    searchConfig: {
                        submitText: '登录',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                            borderRadius: 8,
                            height: 44,
                            fontSize: 16,
                        },
                    },
                }}
                onFinish={handleLogin}
            >
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: (
                            <UserOutlined
                                style={{ color: token.colorTextSecondary }}
                                className="prefixIcon"
                            />
                        ),
                    }}
                    placeholder="请输入用户名"
                    rules={[
                        { required: true, message: '请输入用户名！' },
                        { min: 3, message: '用户名至少3个字符' },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: (
                            <LockOutlined
                                style={{ color: token.colorTextSecondary }}
                                className="prefixIcon"
                            />
                        ),
                    }}
                    placeholder="请输入密码"
                    rules={[
                        { required: true, message: '请输入密码！' },
                        { min: 6, message: '密码至少6个字符' },
                    ]}
                />

                <div className="loginOptions">
                    <ProFormCheckbox name="autoLogin" noStyle>
                        记住我
                    </ProFormCheckbox>
                    <Link className="forgotPassword">忘记密码？</Link>
                </div>

            </LoginFormPage>
        </div >
    );
};

const LoginPage = () => {
    return (
        <ProConfigProvider dark>
            <Page />
        </ProConfigProvider>
    );
};

export default () => (
    <div>
        <LoginPage />
    </div>
);
