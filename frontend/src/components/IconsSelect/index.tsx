import React, { useState, useMemo } from 'react';
import { Modal, Input, Row, Col } from 'antd';
import { SearchOutlined,
  // 方向
  ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, ArrowDownOutlined,
  UpOutlined, DownOutlined, LeftOutlined, RightOutlined,
  UpCircleOutlined, DownCircleOutlined, LeftCircleOutlined, RightCircleOutlined,
  DoubleLeftOutlined, DoubleRightOutlined, CaretUpOutlined, CaretDownOutlined,
  CaretLeftOutlined, CaretRightOutlined, SwapOutlined, RetweetOutlined,
  FullscreenOutlined, FullscreenExitOutlined, ExpandAltOutlined, CompressOutlined,
  AimOutlined,
  // 操作
  PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined,
  EditOutlined, DeleteOutlined, CopyOutlined, ScissorOutlined,
  UndoOutlined, RedoOutlined, ReloadOutlined, SyncOutlined,
  ClearOutlined, StopOutlined, PoweroffOutlined, WarningOutlined,
  QuestionCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined,
  PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined,
  // 数据
  BarChartOutlined, LineChartOutlined, PieChartOutlined, AreaChartOutlined,
  DotChartOutlined, FundOutlined, DashboardOutlined, StockOutlined,
  RiseOutlined, FallOutlined,
  // 文件
  FileOutlined, FileTextOutlined, FileImageOutlined, FilePdfOutlined,
  FileExcelOutlined, FileWordOutlined, FilePptOutlined, FileZipOutlined,
  FileAddOutlined, FolderOutlined, FolderOpenOutlined, FolderAddOutlined,
  PaperClipOutlined, Html5Outlined, CodeOutlined, FileMarkdownOutlined,
  // 媒体
  PlayCircleOutlined, PauseCircleOutlined, SoundOutlined, VideoCameraOutlined,
  CameraOutlined, PictureOutlined, EyeOutlined, EyeInvisibleOutlined,
  ZoomInOutlined, ZoomOutOutlined, ShrinkOutlined, EnvironmentOutlined,
  GlobalOutlined, WifiOutlined, UsbOutlined,
  // 社交
  UserOutlined, UsergroupAddOutlined, TeamOutlined, SolutionOutlined,
  PhoneOutlined, MailOutlined, MessageOutlined, QqOutlined,
  WechatOutlined, AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined,
  GoogleOutlined, FacebookOutlined, TwitterOutlined, GithubOutlined,
  // 状态
  LoadingOutlined, Loading3QuartersOutlined, HourglassOutlined,
  CheckCircleOutlined, ExclamationOutlined, ClockCircleOutlined,
  HeartOutlined, StarOutlined, LikeOutlined, DislikeOutlined,
  FireOutlined, ThunderboltOutlined, BulbOutlined, ExperimentOutlined,
  FlagOutlined, TrophyOutlined, GiftOutlined,
  // 工具
  ToolOutlined, SettingOutlined, AppstoreOutlined, UnorderedListOutlined,
  OrderedListOutlined, MenuOutlined, MoreOutlined, EllipsisOutlined,
  FilterOutlined, SortAscendingOutlined, SortDescendingOutlined,
  PrinterOutlined, DownloadOutlined, UploadOutlined,
  ShareAltOutlined, LinkOutlined, LockOutlined, UnlockOutlined,
  // 业务
  HomeOutlined, BankOutlined, ShopOutlined, CarOutlined,
  CalendarOutlined, ScheduleOutlined, ReadOutlined, BookOutlined,
  WalletOutlined, MoneyCollectOutlined, PayCircleOutlined,
  IdcardOutlined, ProfileOutlined, AuditOutlined,
  FormOutlined, SnippetsOutlined, ProjectOutlined,
} from '@ant-design/icons';
import './index.less';

// 静态图标映射表（使用函数包装，避免直接存组件类型导致类型问题）
const ICON_MAP: Record<string, () => JSX.Element> = {
  // 方向
  ArrowLeftOutlined: () => <ArrowLeftOutlined style={{ fontSize: 22 }} />,
  ArrowRightOutlined: () => <ArrowRightOutlined style={{ fontSize: 22 }} />,
  ArrowUpOutlined: () => <ArrowUpOutlined style={{ fontSize: 22 }} />,
  ArrowDownOutlined: () => <ArrowDownOutlined style={{ fontSize: 22 }} />,
  UpOutlined: () => <UpOutlined style={{ fontSize: 22 }} />,
  DownOutlined: () => <DownOutlined style={{ fontSize: 22 }} />,
  LeftOutlined: () => <LeftOutlined style={{ fontSize: 22 }} />,
  RightOutlined: () => <RightOutlined style={{ fontSize: 22 }} />,
  UpCircleOutlined: () => <UpCircleOutlined style={{ fontSize: 22 }} />,
  DownCircleOutlined: () => <DownCircleOutlined style={{ fontSize: 22 }} />,
  LeftCircleOutlined: () => <LeftCircleOutlined style={{ fontSize: 22 }} />,
  RightCircleOutlined: () => <RightCircleOutlined style={{ fontSize: 22 }} />,
  DoubleLeftOutlined: () => <DoubleLeftOutlined style={{ fontSize: 22 }} />,
  DoubleRightOutlined: () => <DoubleRightOutlined style={{ fontSize: 22 }} />,
  CaretUpOutlined: () => <CaretUpOutlined style={{ fontSize: 22 }} />,
  CaretDownOutlined: () => <CaretDownOutlined style={{ fontSize: 22 }} />,
  CaretLeftOutlined: () => <CaretLeftOutlined style={{ fontSize: 22 }} />,
  CaretRightOutlined: () => <CaretRightOutlined style={{ fontSize: 22 }} />,
  SwapOutlined: () => <SwapOutlined style={{ fontSize: 22 }} />,
  RetweetOutlined: () => <RetweetOutlined style={{ fontSize: 22 }} />,
  FullscreenOutlined: () => <FullscreenOutlined style={{ fontSize: 22 }} />,
  FullscreenExitOutlined: () => <FullscreenExitOutlined style={{ fontSize: 22 }} />,
  ExpandAltOutlined: () => <ExpandAltOutlined style={{ fontSize: 22 }} />,
  CompressOutlined: () => <CompressOutlined style={{ fontSize: 22 }} />,
  AimOutlined: () => <AimOutlined style={{ fontSize: 22 }} />,
  // 操作
  PlusOutlined: () => <PlusOutlined style={{ fontSize: 22 }} />,
  MinusOutlined: () => <MinusOutlined style={{ fontSize: 22 }} />,
  CloseOutlined: () => <CloseOutlined style={{ fontSize: 22 }} />,
  CheckOutlined: () => <CheckOutlined style={{ fontSize: 22 }} />,
  EditOutlined: () => <EditOutlined style={{ fontSize: 22 }} />,
  DeleteOutlined: () => <DeleteOutlined style={{ fontSize: 22 }} />,
  CopyOutlined: () => <CopyOutlined style={{ fontSize: 22 }} />,
  ScissorOutlined: () => <ScissorOutlined style={{ fontSize: 22 }} />,
  UndoOutlined: () => <UndoOutlined style={{ fontSize: 22 }} />,
  RedoOutlined: () => <RedoOutlined style={{ fontSize: 22 }} />,
  ReloadOutlined: () => <ReloadOutlined style={{ fontSize: 22 }} />,
  SyncOutlined: () => <SyncOutlined style={{ fontSize: 22 }} />,
  ClearOutlined: () => <ClearOutlined style={{ fontSize: 22 }} />,
  StopOutlined: () => <StopOutlined style={{ fontSize: 22 }} />,
  PoweroffOutlined: () => <PoweroffOutlined style={{ fontSize: 22 }} />,
  WarningOutlined: () => <WarningOutlined style={{ fontSize: 22 }} />,
  QuestionCircleOutlined: () => <QuestionCircleOutlined style={{ fontSize: 22 }} />,
  InfoCircleOutlined: () => <InfoCircleOutlined style={{ fontSize: 22 }} />,
  ExclamationCircleOutlined: () => <ExclamationCircleOutlined style={{ fontSize: 22 }} />,
  PlusCircleOutlined: () => <PlusCircleOutlined style={{ fontSize: 22 }} />,
  MinusCircleOutlined: () => <MinusCircleOutlined style={{ fontSize: 22 }} />,
  CloseCircleOutlined: () => <CloseCircleOutlined style={{ fontSize: 22 }} />,
  // 数据
  BarChartOutlined: () => <BarChartOutlined style={{ fontSize: 22 }} />,
  LineChartOutlined: () => <LineChartOutlined style={{ fontSize: 22 }} />,
  PieChartOutlined: () => <PieChartOutlined style={{ fontSize: 22 }} />,
  AreaChartOutlined: () => <AreaChartOutlined style={{ fontSize: 22 }} />,
  DotChartOutlined: () => <DotChartOutlined style={{ fontSize: 22 }} />,
  FundOutlined: () => <FundOutlined style={{ fontSize: 22 }} />,
  DashboardOutlined: () => <DashboardOutlined style={{ fontSize: 22 }} />,
  StockOutlined: () => <StockOutlined style={{ fontSize: 22 }} />,
  RiseOutlined: () => <RiseOutlined style={{ fontSize: 22 }} />,
  FallOutlined: () => <FallOutlined style={{ fontSize: 22 }} />,
  // 文件
  FileOutlined: () => <FileOutlined style={{ fontSize: 22 }} />,
  FileTextOutlined: () => <FileTextOutlined style={{ fontSize: 22 }} />,
  FileImageOutlined: () => <FileImageOutlined style={{ fontSize: 22 }} />,
  FilePdfOutlined: () => <FilePdfOutlined style={{ fontSize: 22 }} />,
  FileExcelOutlined: () => <FileExcelOutlined style={{ fontSize: 22 }} />,
  FileWordOutlined: () => <FileWordOutlined style={{ fontSize: 22 }} />,
  FilePptOutlined: () => <FilePptOutlined style={{ fontSize: 22 }} />,
  FileZipOutlined: () => <FileZipOutlined style={{ fontSize: 22 }} />,
  FileAddOutlined: () => <FileAddOutlined style={{ fontSize: 22 }} />,
  FolderOutlined: () => <FolderOutlined style={{ fontSize: 22 }} />,
  FolderOpenOutlined: () => <FolderOpenOutlined style={{ fontSize: 22 }} />,
  FolderAddOutlined: () => <FolderAddOutlined style={{ fontSize: 22 }} />,
  PaperClipOutlined: () => <PaperClipOutlined style={{ fontSize: 22 }} />,
  Html5Outlined: () => <Html5Outlined style={{ fontSize: 22 }} />,
  CodeOutlined: () => <CodeOutlined style={{ fontSize: 22 }} />,
  FileMarkdownOutlined: () => <FileMarkdownOutlined style={{ fontSize: 22 }} />,
  // 媒体
  PlayCircleOutlined: () => <PlayCircleOutlined style={{ fontSize: 22 }} />,
  PauseCircleOutlined: () => <PauseCircleOutlined style={{ fontSize: 22 }} />,
  SoundOutlined: () => <SoundOutlined style={{ fontSize: 22 }} />,
  VideoCameraOutlined: () => <VideoCameraOutlined style={{ fontSize: 22 }} />,
  CameraOutlined: () => <CameraOutlined style={{ fontSize: 22 }} />,
  PictureOutlined: () => <PictureOutlined style={{ fontSize: 22 }} />,
  EyeOutlined: () => <EyeOutlined style={{ fontSize: 22 }} />,
  EyeInvisibleOutlined: () => <EyeInvisibleOutlined style={{ fontSize: 22 }} />,
  ZoomInOutlined: () => <ZoomInOutlined style={{ fontSize: 22 }} />,
  ZoomOutOutlined: () => <ZoomOutOutlined style={{ fontSize: 22 }} />,
  ShrinkOutlined: () => <ShrinkOutlined style={{ fontSize: 22 }} />,
  EnvironmentOutlined: () => <EnvironmentOutlined style={{ fontSize: 22 }} />,
  GlobalOutlined: () => <GlobalOutlined style={{ fontSize: 22 }} />,
  WifiOutlined: () => <WifiOutlined style={{ fontSize: 22 }} />,
  UsbOutlined: () => <UsbOutlined style={{ fontSize: 22 }} />,
  // 社交
  UserOutlined: () => <UserOutlined style={{ fontSize: 22 }} />,
  UsergroupAddOutlined: () => <UsergroupAddOutlined style={{ fontSize: 22 }} />,
  TeamOutlined: () => <TeamOutlined style={{ fontSize: 22 }} />,
  SolutionOutlined: () => <SolutionOutlined style={{ fontSize: 22 }} />,
  PhoneOutlined: () => <PhoneOutlined style={{ fontSize: 22 }} />,
  MailOutlined: () => <MailOutlined style={{ fontSize: 22 }} />,
  MessageOutlined: () => <MessageOutlined style={{ fontSize: 22 }} />,
  QqOutlined: () => <QqOutlined style={{ fontSize: 22 }} />,
  WechatOutlined: () => <WechatOutlined style={{ fontSize: 22 }} />,
  AlipayCircleOutlined: () => <AlipayCircleOutlined style={{ fontSize: 22 }} />,
  TaobaoCircleOutlined: () => <TaobaoCircleOutlined style={{ fontSize: 22 }} />,
  WeiboCircleOutlined: () => <WeiboCircleOutlined style={{ fontSize: 22 }} />,
  GoogleOutlined: () => <GoogleOutlined style={{ fontSize: 22 }} />,
  FacebookOutlined: () => <FacebookOutlined style={{ fontSize: 22 }} />,
  TwitterOutlined: () => <TwitterOutlined style={{ fontSize: 22 }} />,
  GithubOutlined: () => <GithubOutlined style={{ fontSize: 22 }} />,
  // 状态
  LoadingOutlined: () => <LoadingOutlined style={{ fontSize: 22 }} />,
  Loading3QuartersOutlined: () => <Loading3QuartersOutlined style={{ fontSize: 22 }} />,
  HourglassOutlined: () => <HourglassOutlined style={{ fontSize: 22 }} />,
  CheckCircleOutlined: () => <CheckCircleOutlined style={{ fontSize: 22 }} />,
  ExclamationOutlined: () => <ExclamationOutlined style={{ fontSize: 22 }} />,
  ClockCircleOutlined: () => <ClockCircleOutlined style={{ fontSize: 22 }} />,
  HeartOutlined: () => <HeartOutlined style={{ fontSize: 22 }} />,
  StarOutlined: () => <StarOutlined style={{ fontSize: 22 }} />,
  LikeOutlined: () => <LikeOutlined style={{ fontSize: 22 }} />,
  DislikeOutlined: () => <DislikeOutlined style={{ fontSize: 22 }} />,
  FireOutlined: () => <FireOutlined style={{ fontSize: 22 }} />,
  ThunderboltOutlined: () => <ThunderboltOutlined style={{ fontSize: 22 }} />,
  BulbOutlined: () => <BulbOutlined style={{ fontSize: 22 }} />,
  ExperimentOutlined: () => <ExperimentOutlined style={{ fontSize: 22 }} />,
  FlagOutlined: () => <FlagOutlined style={{ fontSize: 22 }} />,
  TrophyOutlined: () => <TrophyOutlined style={{ fontSize: 22 }} />,
  GiftOutlined: () => <GiftOutlined style={{ fontSize: 22 }} />,
  // 工具
  ToolOutlined: () => <ToolOutlined style={{ fontSize: 22 }} />,
  SettingOutlined: () => <SettingOutlined style={{ fontSize: 22 }} />,
  AppstoreOutlined: () => <AppstoreOutlined style={{ fontSize: 22 }} />,
  UnorderedListOutlined: () => <UnorderedListOutlined style={{ fontSize: 22 }} />,
  OrderedListOutlined: () => <OrderedListOutlined style={{ fontSize: 22 }} />,
  MenuOutlined: () => <MenuOutlined style={{ fontSize: 22 }} />,
  MoreOutlined: () => <MoreOutlined style={{ fontSize: 22 }} />,
  EllipsisOutlined: () => <EllipsisOutlined style={{ fontSize: 22 }} />,
  FilterOutlined: () => <FilterOutlined style={{ fontSize: 22 }} />,
  SortAscendingOutlined: () => <SortAscendingOutlined style={{ fontSize: 22 }} />,
  SortDescendingOutlined: () => <SortDescendingOutlined style={{ fontSize: 22 }} />,
  PrinterOutlined: () => <PrinterOutlined style={{ fontSize: 22 }} />,
  DownloadOutlined: () => <DownloadOutlined style={{ fontSize: 22 }} />,
  UploadOutlined: () => <UploadOutlined style={{ fontSize: 22 }} />,
  ShareAltOutlined: () => <ShareAltOutlined style={{ fontSize: 22 }} />,
  LinkOutlined: () => <LinkOutlined style={{ fontSize: 22 }} />,
  LockOutlined: () => <LockOutlined style={{ fontSize: 22 }} />,
  UnlockOutlined: () => <UnlockOutlined style={{ fontSize: 22 }} />,
  // 业务
  HomeOutlined: () => <HomeOutlined style={{ fontSize: 22 }} />,
  BankOutlined: () => <BankOutlined style={{ fontSize: 22 }} />,
  ShopOutlined: () => <ShopOutlined style={{ fontSize: 22 }} />,
  CarOutlined: () => <CarOutlined style={{ fontSize: 22 }} />,
  CalendarOutlined: () => <CalendarOutlined style={{ fontSize: 22 }} />,
  ScheduleOutlined: () => <ScheduleOutlined style={{ fontSize: 22 }} />,
  ReadOutlined: () => <ReadOutlined style={{ fontSize: 22 }} />,
  BookOutlined: () => <BookOutlined style={{ fontSize: 22 }} />,
  WalletOutlined: () => <WalletOutlined style={{ fontSize: 22 }} />,
  MoneyCollectOutlined: () => <MoneyCollectOutlined style={{ fontSize: 22 }} />,
  PayCircleOutlined: () => <PayCircleOutlined style={{ fontSize: 22 }} />,
  IdcardOutlined: () => <IdcardOutlined style={{ fontSize: 22 }} />,
  ProfileOutlined: () => <ProfileOutlined style={{ fontSize: 22 }} />,
  AuditOutlined: () => <AuditOutlined style={{ fontSize: 22 }} />,
  FormOutlined: () => <FormOutlined style={{ fontSize: 22 }} />,
  SnippetsOutlined: () => <SnippetsOutlined style={{ fontSize: 22 }} />,
  ProjectOutlined: () => <ProjectOutlined style={{ fontSize: 22 }} />,
};

// 常用图标列表（按分类组织，与映射表保持一致）
const ICON_CATEGORIES = {
  '方向': [
    'ArrowLeftOutlined', 'ArrowRightOutlined', 'ArrowUpOutlined', 'ArrowDownOutlined',
    'UpOutlined', 'DownOutlined', 'LeftOutlined', 'RightOutlined',
    'UpCircleOutlined', 'DownCircleOutlined', 'LeftCircleOutlined', 'RightCircleOutlined',
    'DoubleLeftOutlined', 'DoubleRightOutlined', 'CaretUpOutlined', 'CaretDownOutlined',
    'CaretLeftOutlined', 'CaretRightOutlined', 'SwapOutlined', 'RetweetOutlined',
    'FullscreenOutlined', 'FullscreenExitOutlined', 'ExpandAltOutlined', 'CompressOutlined',
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
    'RiseOutlined', 'FallOutlined',
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
    'GlobalOutlined', 'WifiOutlined', 'UsbOutlined',
  ],
  '社交': [
    'UserOutlined', 'UsergroupAddOutlined', 'TeamOutlined', 'SolutionOutlined',
    'PhoneOutlined', 'MailOutlined', 'MessageOutlined', 'QqOutlined',
    'WechatOutlined', 'AlipayCircleOutlined', 'TaobaoCircleOutlined', 'WeiboCircleOutlined',
    'GoogleOutlined', 'FacebookOutlined', 'TwitterOutlined', 'GithubOutlined',
  ],
  '状态': [
    'LoadingOutlined', 'Loading3QuartersOutlined', 'HourglassOutlined',
    'CheckCircleOutlined', 'ExclamationOutlined', 'ClockCircleOutlined',
    'HeartOutlined', 'StarOutlined', 'LikeOutlined', 'DislikeOutlined',
    'FireOutlined', 'ThunderboltOutlined', 'BulbOutlined', 'ExperimentOutlined',
    'FlagOutlined', 'TrophyOutlined', 'GiftOutlined',
  ],
  '工具': [
    'ToolOutlined', 'SettingOutlined', 'AppstoreOutlined', 'UnorderedListOutlined',
    'OrderedListOutlined', 'MenuOutlined', 'MoreOutlined', 'EllipsisOutlined',
    'FilterOutlined', 'SortAscendingOutlined', 'SortDescendingOutlined',
    'PrinterOutlined', 'DownloadOutlined', 'UploadOutlined',
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

  // 通过静态映射渲染图标
  const renderIcon = (iconName: string) => {
    const renderer = ICON_MAP[iconName];
    if (!renderer) return null;
    return renderer();
  };

  const handleSelect = (iconName: string) => {
    onChange?.(iconName);
    setModalVisible(false);
  };

  return (
    <>
      {/* 触发区域 */}
      <div className="icon-select-trigger" onClick={() => setModalVisible(true)}>
        {value ? (
          <span>{renderIcon(value)}</span>
        ) : (
          <span className="icon-select-placeholder">点击选择图标</span>
        )}
        <span className="icon-select-hint">选择 Ant Design 图标</span>
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
        <div className="icon-grid-container">
          {Object.entries(filteredCategories).map(([category, icons]) => (
            <div key={category} style={{ marginBottom: 16 }}>
              <div className="icon-category-title">
                {category}<span className="count">（{icons.length}）</span>
              </div>
              <Row gutter={[12, 12]}>
                {icons.map((iconName) => {
                  const isSelected = value === iconName;
                  return (
                    <Col key={iconName} span={4}>
                      <div
                        className={`icon-item${isSelected ? ' icon-item-selected' : ''}`}
                        onClick={() => handleSelect(iconName)}
                      >
                        {renderIcon(iconName)}
                        <span className="icon-item-name">
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
            <div className="icon-empty">未找到匹配的图标</div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default IconSelect;
export { ICON_MAP };
