import React from 'react';
import { Drawer, Descriptions, Tag, Image } from 'antd';
import type { Banner } from '@/services/home';

interface CarouselDetailProps {
    visible: boolean;
    record: Banner | null;
    onClose: () => void;
}

// 链接类型映射
const linkTypeMap: Record<number, string> = { 1: '无链接', 2: '内部页面', 3: '外部链接' };
const linkTypeColorMap: Record<number, string> = { 1: 'default', 2: 'blue', 3: 'green' };
const statusMap: Record<number, { text: string; color: string }> = {
    1: { text: '隐藏', color: 'default' },
    2: { text: '显示', color: 'green' },
};

const CarouselDetail: React.FC<CarouselDetailProps> = ({ visible, record, onClose }) => {
    return (
        <Drawer
            title="轮播图详情"
            placement="right"
            width={520}
            onClose={onClose}
            open={visible}
        >
            {record && (
                <Descriptions column={1} labelStyle={{ width: 100 }}>
                    <Descriptions.Item label="封面图片">
                        {record.image ? (
                            <Image src={record.image} width={200} style={{ borderRadius: 4 }} />
                        ) : (
                            '-'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="标题">{record.title || '-'}</Descriptions.Item>
                    <Descriptions.Item label="副标题">{record.subtitle || '-'}</Descriptions.Item>
                    <Descriptions.Item label="链接类型">
                        <Tag color={linkTypeColorMap[record.linkType] || 'default'}>
                            {linkTypeMap[record.linkType] || '-'}
                        </Tag>
                    </Descriptions.Item>
                    {record.linkType === 2 && (
                        <Descriptions.Item label="内部页面">{record.linkPage || '-'}</Descriptions.Item>
                    )}
                    {record.linkType === 3 && (
                        <Descriptions.Item label="外部链接">
                            <span style={{ wordBreak: 'break-all' }}>{record.linkUrl || '-'}</span>
                        </Descriptions.Item>
                    )}
                    <Descriptions.Item label="状态">
                        <Tag color={statusMap[record.status]?.color || 'default'}>
                            {statusMap[record.status]?.text || '-'}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Drawer>
    );
};

export default CarouselDetail;
