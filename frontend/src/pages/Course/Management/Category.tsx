import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Tree,
  Spin,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Dropdown,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import {
  PlusOutlined,
  ReloadOutlined,
  FolderOutlined,
  FileOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { CourseCategory } from '@/services/course';
import {
  getCourseCategoryList,
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from '@/services/course';
import './index.less'

export interface ClassificationProps {
  /** 当前选中的分类ID */
  selectedCategoryId?: string;
  /** 选中分类变化时的回调 */
  onSelect?: (categoryId: string) => void;
  /** 是否显示新建按钮 */
  showCreate?: boolean;
  /** 卡片标题 */
  title?: string;
  /** 自定义样式 */
  className?: string;
}

const Category: React.FC<ClassificationProps> = ({
  selectedCategoryId,
  onSelect,
  showCreate = true,
  title = '课程分类',
}) => {
  const [categoryTree, setCategoryTree] = useState<DataNode[]>([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [internalSelectedId, setInternalSelectedId] = useState<string>('');

  // Modal 状态
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // 实际使用的选中ID（优先使用受控值）
  const actualSelectedId = selectedCategoryId !== undefined ? selectedCategoryId : internalSelectedId;

  // 获取课程分类树
  const fetchCategoryTree = useCallback(async () => {
    setTreeLoading(true);
    try {
      const res = await getCourseCategoryList();
      if (res.success) {
        const treeData = buildTreeData(res.data.list);
        setCategoryTree(treeData);
      }
    } catch (error) {
      console.error('获取分类树失败:', error);
      message.error('获取分类列表失败');
    } finally {
      setTreeLoading(false);
    }
  }, []);

  // 处理删除分类
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await deleteCourseCategory(id);
      if (res.success) {
        message.success('分类删除成功');
        fetchCategoryTree(); // 刷新树
        // 如果删除的是当前选中的分类，清空选中
        if (id === actualSelectedId) {
          if (selectedCategoryId === undefined) {
            setInternalSelectedId('');
          }
          onSelect?.('');
        }
      } else {
        message.error(res.errorMessage || '删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 构建树形数据
  const buildTreeData = (categories: CourseCategory[]): DataNode[] => {
    const convertToTree = (list: CourseCategory[]): DataNode[] => {
      return list.map((item) => ({
        key: item.id!,
        title: (
          <span className="tree-node-title">
            <span className="node-name">{item.name}</span>
            <span className="node-actions">
              <Dropdown
                menu={{
                  items: [
                    ...(item.parentId == '0' ? [
                      {
                        key: 'add',
                        label: '新建子分类',
                        icon: <PlusOutlined style={{ color: '#3A5F8A' }} />,
                        onClick: () => handleOpenModalWithParent(item.id!),
                      },
                    ] : []),
                    {
                      key: 'edit',
                      label: '编辑',
                      icon: <EditOutlined style={{ color: '#6b7280' }} />,
                      onClick: () => handleOpenEditModal(item),
                    },
                    {
                      type: 'divider',
                    },
                    {
                      key: 'delete',
                      label: <span style={{ color: '#ff4d4f' }}>删除</span>,
                      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
                      onClick: () => {
                        Modal.confirm({
                          title: '确认删除',
                          content: `确定要删除分类 "${item.name}" 吗？`,
                          okText: '确定',
                          cancelText: '取消',
                          okButtonProps: { danger: true },
                          onOk: () => handleDeleteCategory(item.id!),
                        });
                      },
                    },
                  ],
                }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  size="small"
                  icon={<EllipsisOutlined />}
                  className="action-btn more-btn"
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </span>
          </span>
        ),
        icon: item.parentId == '0' ? <FolderOutlined /> : <FileOutlined />,
        children: item.children && item.children.length > 0 ? convertToTree(item.children) : undefined,
      }));
    };

    const tree = convertToTree(categories);
    return tree;
  };

  // 初始加载
  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  // 处理树节点点击
  const handleTreeSelect = (selectedKeys: React.Key[]) => {
    // 如果 selectedKeys 为空（再次点击已选中节点），不取消选中
    if (selectedKeys.length === 0) {
      return;
    }

    const key = selectedKeys[0] as string;
    const categoryId = key || '';

    if (selectedCategoryId === undefined) {
      setInternalSelectedId(categoryId);
    }

    onSelect?.(categoryId);
  };

  // 打开新建 Modal
  const handleOpenModal = () => {
    setModalMode('create');
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({
      parentId: 0,
    });
    setModalVisible(true);
  };

  // 打开新建 Modal（指定父分类）
  const handleOpenModalWithParent = (parentId: string) => {
    setModalMode('create');
    setEditingCategory(null);
    form.resetFields();
    form.setFieldsValue({
      parentId: parentId,
    });
    setModalVisible(true);
  };

  // 打开编辑 Modal
  const handleOpenEditModal = (category: CourseCategory) => {
    setModalMode('edit');
    setEditingCategory(category);
    form.resetFields();
    form.setFieldsValue({
      code: category.code,
      name: category.name,
      description: category.description,
      parentId: category.parentId,
    });
    setModalVisible(true);
  };

  // 关闭 Modal
  const handleCloseModal = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingCategory(null);
    setModalMode('create');
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      if (modalMode === 'edit' && editingCategory?.id) {
        // 编辑模式
        const res = await updateCourseCategory(editingCategory.id, values as CourseCategory);
        if (res.success) {
          message.success('分类更新成功');
          handleCloseModal();
          fetchCategoryTree(); // 刷新树
        } else {
          message.error(res.errorMessage || '更新失败');
        }
      } else {
        // 新建模式
        console.log('res', values);
        const res = await createCourseCategory(values as CourseCategory);

        if (res.success) {
          message.success('分类创建成功');
          handleCloseModal();
          fetchCategoryTree(); // 刷新树
        } else {
          message.error(res.errorMessage || '创建失败');
        }
      }
    } catch (error) {
      message.error(modalMode === 'edit' ? '更新失败' : '创建失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card
        title={title}
        size="small"
        className='course-sidebar'
        extra={
          <Space size={4}>
            {showCreate && (
              <Button
                type="link"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleOpenModal}
              >
                新建
              </Button>
            )}
            <Button
              type="link"
              size="small"
              icon={<ReloadOutlined />}
              onClick={fetchCategoryTree}
            >
              刷新
            </Button>
          </Space>
        }
      >
        <Spin spinning={treeLoading}>
          <Tree
            treeData={categoryTree}
            selectedKeys={[actualSelectedId]}
            onSelect={handleTreeSelect}
            showIcon
            defaultExpandAll
            className="category-tree"
          />
        </Spin>
      </Card>

      {/* 分类 Modal（新建/编辑共用） */}
      <Modal
        title={modalMode === 'edit' ? '编辑课程分类' : '新建课程分类'}
        open={modalVisible}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
        confirmLoading={submitting}
        width={520}
        afterClose={() => {
          form.resetFields();
          setEditingCategory(null);
          setModalMode('create');
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="parentId"
            label="父节点"
            hidden
          >
          </Form.Item>
          <Form.Item
            name="code"
            label="分类编码"
            rules={[{ required: true, message: '请输入分类编码' }]}
          >
            <Input placeholder="请输入分类编码，如：BASIC" maxLength={20} showCount disabled={modalMode === 'edit'} />
          </Form.Item>
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称，如：足球基础" maxLength={50} showCount />
          </Form.Item>
          <Form.Item
            name="description"
            label="分类描述"
          >
            <Input.TextArea
              placeholder="请输入分类描述"
              rows={3}
              maxLength={200}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
