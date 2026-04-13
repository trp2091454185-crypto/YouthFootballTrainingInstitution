import React from 'react';
import { Drawer, Tag } from 'antd';
import {
    UserOutlined,
    IdcardOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    FileTextOutlined,
    ManOutlined,
    WomanOutlined,
    ArrowUpOutlined,
    DashboardOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';
import type { Student } from '@/services/student';
import { POSITION, SCHOOLSTATUS } from '@/utils/constant';
import './index.less';
import dayjs from 'dayjs';

interface StudentDetailProps {
    visible: boolean;
    record: Student | null;
    onClose: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({
    visible,
    record,
    onClose,
}) => {
    // 获取状态样式
    const getStatusStyle = (status?: number) => {
        const styleMap: Record<number, { class: string; indicator: string }> = {
            1: { class: 'status-tag-active', indicator: 'status-active' },
            2: { class: 'status-tag-training', indicator: 'status-training' },
            3: { class: 'status-tag-rest', indicator: 'status-rest' },
            4: { class: 'status-tag-inactive', indicator: 'status-inactive' },
        };
        return styleMap[status || 1] || { class: '', indicator: '' };
    };

    // 获取姓名首字母
    const getInitial = (name?: string) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    // 渲染信息项
    const InfoItem = ({ label, value, fullWidth }: { label: string; value: React.ReactNode; fullWidth?: boolean }) => (
        <div className={`info-item ${fullWidth ? 'full-width' : ''}`}>
            <span className="info-label">{label}</span>
            <span className={`info-value ${!value || value === '-' ? 'empty' : ''}`}>{value || '-'}</span>
        </div>
    );

    // 渲染区块标题
    const SectionHeader = ({ icon, title, iconBg }: { icon: React.ReactNode; title: string; iconBg: string }) => (
        <div className="section-header">
            <div className="section-icon" style={{ background: iconBg }}>{icon}</div>
            <span className="section-title">{title}</span>
        </div>
    );

    if (!record) return null;

    const statusStyle = getStatusStyle(record.status);
    const statusLabel = SCHOOLSTATUS.find((s) => s.value === record.status)?.label || '-';

    return (
        <Drawer
            className="student-detail-drawer"
            title="学员详情"
            placement="right"
            width={700}
            onClose={onClose}
            open={visible}
        >
            {/* 头部信息卡 */}
            <div className="detail-header">
                <div className="avatar-wrapper">
                    <div className="detail-avatar">{getInitial(record.name)}</div>
                    <div className={`status-indicator ${statusStyle.indicator}`} />
                </div>
                <div className="header-info">
                    <div className="student-name">
                        {record.name}
                        {record.status && <Tag className={`status-tag ${statusStyle.class}`}>{statusLabel}</Tag>}
                    </div>
                    <div className="student-meta">
                        <span className="meta-item">
                            <IdcardOutlined className="meta-icon" />
                            {record.studentNo}
                        </span>
                        <span className="meta-item">
                            {record.gender === 1 ? <ManOutlined className="meta-icon" /> : <WomanOutlined className="meta-icon" />}
                            {record.gender === 1 ? '男' : record.gender === 2 ? '女' : '-'}
                        </span>
                    </div>
                </div>
            </div>

            {/* 身体数据 */}
            <div className="detail-section">
                <SectionHeader
                    icon={<DashboardOutlined style={{ color: '#667eea' }} />}
                    title="身体数据"
                    iconBg="rgba(102, 126, 234, 0.1)"
                />
                <div className="section-content">
                    <div className="physical-stats">
                        <div className="stat-card height-card">
                            <div className="stat-icon"><ArrowUpOutlined /></div>
                            <div className="stat-content">
                                <div className="stat-value">{record.height || '--'}<span style={{ fontSize: '14px', marginLeft: '4px' }}>cm</span></div>
                                <div className="stat-label">身高</div>
                            </div>
                        </div>
                        <div className="stat-card weight-card">
                            <div className="stat-icon"><DashboardOutlined /></div>
                            <div className="stat-content">
                                <div className="stat-value">{record.weight || '--'}<span style={{ fontSize: '14px', marginLeft: '4px' }}>kg</span></div>
                                <div className="stat-label">体重</div>
                            </div>
                        </div>
                        <div className="stat-card age-card">
                            <div className="stat-icon"><FieldTimeOutlined /></div>
                            <div className="stat-content">
                                <div className="stat-value">{record.age || '--'}<span style={{ fontSize: '14px', marginLeft: '4px' }}>岁</span></div>
                                <div className="stat-label">年龄</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 基本信息 */}
            <div className="detail-section">
                <SectionHeader
                    icon={<UserOutlined style={{ color: '#1890ff' }} />}
                    title="基本信息"
                    iconBg="rgba(24, 144, 255, 0.1)"
                />
                <div className="section-content">
                    <div className="info-grid">
                        <InfoItem label="出生日期" value={dayjs(record.birthDate).format('YYYY-MM-DD')} />
                        <InfoItem label="联系电话" value={record.phone} />
                        <InfoItem label="身份证号" value={record.idCard} />
                        <InfoItem label="入训日期" value={dayjs(record.joinDate).format('YYYY-MM-DD')} />
                        <InfoItem label="培训方向" value={POSITION.find((p) => p.value === record.position)?.label} />
                        <InfoItem label="所属学校" value={record.school} />
                    </div>
                </div>
            </div>

            {/* 紧急联系 */}
            <div className="detail-section">
                <SectionHeader
                    icon={<TeamOutlined style={{ color: '#fa8c16' }} />}
                    title="紧急联系人"
                    iconBg="rgba(250, 140, 22, 0.1)"
                />
                <div className="section-content">
                    <div className="info-grid">
                        <InfoItem label="姓名" value={record.emergencyContact} />
                        <InfoItem label="紧急联系电话" value={record.emergencyPhone} />
                    </div>
                </div>
            </div>

            {/* 地址与备注 */}
            <div className="detail-section">
                <SectionHeader
                    icon={<EnvironmentOutlined style={{ color: '#52c41a' }} />}
                    title="地址与备注"
                    iconBg="rgba(82, 196, 26, 0.1)"
                />
                <div className="section-content">
                    <InfoItem label="详细地址" value={record.address} fullWidth />
                    <div className={`remarks-content ${!record.remarks ? 'empty' : ''}`}>
                        <div className="remarks-label">
                            <FileTextOutlined style={{ marginRight: 6, color: '#722ed1' }} />
                            备注信息
                        </div>
                        <div className="remarks-text">{record.remarks || '暂无备注信息'}</div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default StudentDetail;
