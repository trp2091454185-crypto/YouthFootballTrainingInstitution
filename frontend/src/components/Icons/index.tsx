import React, { useState, useMemo } from 'react';
import { Modal, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// 常用图标列表（按分类组织）
const ICON_CATEGORIES = {
  '方向': [
    'ArrowLeftOutlined', 'ArrowRightOutlined', 'ArrowUpOutlined', 'ArrowDownOutlined',
    'UpOutlined', 'DownOutlined', 'LeftOutlined', 'RightOutlined',
    'UpCircleOutlined', 'DownCircleOutlined', 'LeftCircleOutlined', 'RightCircleOutlined',
    'DoubleLeftOutlined', 'DoubleRightOutlined', 'CaretUpOutlined', 'CaretDownOutlined',
    'CaretLeftOutlined', 'CaretRightOutlined', 'SwapOutlined', 'RetweetOutlined',
    'FullscreenOutlined', 'FullscreenExitOutlined', 'ExpandAltOutlined', 'CompressAltOutlined',
    'AimOutlined',
  ],
  '操作': [
    'PlusOutlined', 'MinusOutlined', 'CloseOutlined', 'CheckOutlined',
    'EditOutlined', 'DeleteOutlined', 'CopyOutlined', 'ScissorOutlined',
    'UndoOutlined', 'RedoOutlined', 'ReloadOutlined', 'SyncOutlined',
    'ClearOutlined', 'StopOutlined', 'PoweroffOutlined', 'WarningOutlined',
    'QuestionCircleOutlined', 'InfoCircleOutlined', 'ExclamationCircleOutlined',
    'PlusCircleOutlined', 'MinusCircleOutlined', 'CloseCircleOutlined',
  ],
  '数据': [
    'BarChartOutlined', 'LineChartOutlined', 'PieChartOutlined', 'AreaChartOutlined',
    'DotChartOutlined', 'FundOutlined', 'DashboardOutlined', 'StockOutlined',
    'RiseOutlined', 'FallOutlined', 'TrendingUpOutlined', 'TrendingDownOutlined',
  ],
  '文件': [
    'FileOutlined', 'FileTextOutlined', 'FileImageOutlined', 'FilePdfOutlined',
    'FileExcelOutlined', 'FileWordOutlined', 'FilePptOutlined', 'FileZipOutlined',
    'FileAddOutlined', 'FolderOutlined', 'FolderOpenOutlined', 'FolderAddOutlined',
    'PaperClipOutlined', 'Html5Outlined', 'CodeOutlined', 'FileMarkdownOutlined',
  ],
  '媒体': [
    'PlayCircleOutlined', 'PauseCircleOutlined', 'SoundOutlined', 'VideoCameraOutlined',
    'CameraOutlined', 'PictureOutlined', 'EyeOutlined', 'EyeInvisibleOutlined',
    'ZoomInOutlined', 'ZoomOutOutlined', 'ShrinkOutlined', 'EnvironmentOutlined',
    'GlobalOutlined', 'WifiOutlined', 'BluetoothOutlined', 'UsbOutlined',
  ],
  '社交': [
    'UserOutlined', 'UsergroupAddOutlined', 'TeamOutlined', 'SolutionOutlined',
    'PhoneOutlined', 'MailOutlined', 'MessageOutlined', 'QqOutlined',
    'WechatOutlined', 'AlipayCircleOutlined', 'TaobaoCircleOutlined', 'WeiboCircleOutlined',
    'GoogleCircleOutlined', 'FacebookOutlined', 'TwitterOutlined', 'GithubOutlined',
  ],
  '状态': [
    'LoadingOutlined', 'Loading3QuartersOutlined', 'HourglassOutlined',
    'CheckCircleOutlined', 'ExclamationOutlined', 'ClockCircleOutlined',
    'HeartOutlined', 'StarOutlined', 'LikeOutlined', 'DislikeOutlined',
    'FireOutlined', 'ThunderboltOutlined', 'BulbOutlined', 'ExperimentOutlined',
    'FlagOutlined', 'TrophyOutlined', 'MedalOutlined', 'GiftOutlined',
  ],
  '工具': [
    'ToolOutlined', 'SettingOutlined', 'AppstoreOutlined', 'UnorderedListOutlined',
    'OrderedListOutlined', 'MenuOutlined', 'MoreOutlined', 'EllipsisOutlined',
    'FilterOutlined', 'SortAscendingOutlined', 'SortDescendingOutlined',
    'SearchOutlined', 'PrinterOutlined', 'DownloadOutlined', 'UploadOutlined',
    'ShareAltOutlined', 'LinkOutlined', 'LockOutlined', 'UnlockOutlined',
  ],
  '业务': [
    'HomeOutlined', 'BankOutlined', 'ShopOutlined', 'CarOutlined',
    'CalendarOutlined', 'ScheduleOutlined', 'ReadOutlined', 'BookOutlined',
    'WalletOutlined', 'MoneyCollectOutlined', 'PayCircleOutlined',
    'IdcardOutlined', 'ProfileOutlined', 'AuditOutlined',
    'FormOutlined', 'SnippetsOutlined', 'ProjectOutlined',
  ],
};

// 展平所有图标名
const ALL_ICONS = Object.values(ICON_CATEGORIES).flat();

interface IconSelectProps {
  /** 当前选中的图标名称 */
  value?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
}

const IconSelect: React.FC<IconSelectProps> = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 搜索过滤
  const filteredIcons = useMemo(() => {
    if (!searchKeyword.trim()) return ALL_ICONS;
    const keyword = searchKeyword.toLowerCase();
    return ALL_ICONS.filter((name) => name.toLowerCase().includes(keyword));
  }, [searchKeyword]);

  // 按分类过滤后的结果
  const filteredCategories = useMemo(() => {
    if (!searchKeyword.trim()) return ICON_CATEGORIES;
    // 有搜索时，按原始分类归类
    const result: Record<string, string[]> = {};
    for (const [category, icons] of Object.entries(ICON_CATEGORIES)) {
      const matched = icons.filter((name) =>
        name.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
      if (matched.length > 0) {
        result[category] = matched;
      }
    }
    return Object.keys(result).length > 0 ? result : { '搜索结果': filteredIcons };
  }, [searchKeyword, filteredIcons]);

  // 动态渲染单个图标
  const renderIcon = (iconName: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const IconComponent = require(`@ant-design/icons`)[iconName];
      if (!IconComponent) return null;
      return <IconComponent style={{ fontSize: 22 }} />;
    } catch {
      return null;
    }
  };

  const handleSelect = (iconName: string) => {
    onChange?.(iconName);
    setModalVisible(false);
  };

  return (
    <>
      {/* 触发区域 */}
      <div
        onClick={() => setModalVisible(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 11px',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          cursor: 'pointer',
          background: '#fff',
          minHeight: 32,
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#1677ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#d9d9d9';
        }}
      >
        {value ? (
          <span>{renderIcon(value)}</span>
        ) : (
          <span style={{ color: '#bfbfbf' }}>点击选择图标</span>
        )}
        <span style={{ marginLeft: 'auto', color: '#bfbfbf', fontSize: 12 }}>
          选择 Ant Design 图标
        </span>
      </div>

      {/* 图标选择弹窗 */}
      <Modal
        title="选择图标"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={680}
        destroyOnClose
      >
        {/* 搜索框 */}
        <Input
          placeholder="搜索图标名称..."
          prefix={<SearchOutlined />}
          allowClear
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {/* 图标网格 */}
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {Object.entries(filteredCategories).map(([category, icons]) => (
            <div key={category} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#8c8c8c',
                marginBottom: 8,
                paddingLeft: 4,
              }}>
                {category}（{icons.length}）
              </div>
              <Row gutter={[12, 12]}>
                {icons.map((iconName) => {
                  const isSelected = value === iconName;
                  return (
                    <Col key={iconName} span={4}>
                      <div
                        onClick={() => handleSelect(iconName)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 4,
                          padding: '10px 4px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          border: `1.5px solid ${isSelected ? '#1677ff' : 'transparent'}`,
                          background: isSelected ? '#e6f4ff' : 'transparent',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = '#fafafa';
                            e.currentTarget.style.borderColor = '#d9d9d9';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                          }
                        }}
                      >
                        {renderIcon(iconName)}
                        <span style={{
                          fontSize: 10,
                          color: '#8c8c8c',
                          textAlign: 'center',
                          lineHeight: 1.3,
                          maxWidth: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {iconName.replace('Outlined', '')}
                        </span>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          ))}
          {filteredIcons.length === 0 && (
            <div style={{ textAlign: 'center', color: '#bfbfbf', padding: 40 }}>
              未找到匹配的图标
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default IconSelect;
