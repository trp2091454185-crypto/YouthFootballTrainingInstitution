/*
 Navicat Premium Dump SQL

 Source Server         : 虚拟机Oceanbase
 Source Server Type    : OceanBase
 Source Server Version : 50799 (OceanBase 5.7.25-OceanBase_CE-v4.5.0.0)
 Source Host           : 192.168.227.128:2881
 Source Schema         : soccer

 Target Server Type    : OceanBase
 Target Server Version : 50799 (OceanBase 5.7.25-OceanBase_CE-v4.5.0.0)
 File Encoding         : 65001

 Date: 28/04/2026 11:21:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '副标题',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片URL',
  `link_type` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '链接类型:1无链接 2内部页面 3外部链接',
  `link_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链接地址',
  `link_page` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '内部页面标识',
  `target` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '_self' COMMENT '打开方式:_self/_blank',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '轮播图表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for class_schedule
-- ----------------------------
DROP TABLE IF EXISTS `class_schedule`;
CREATE TABLE `class_schedule`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `class_id` bigint(20) UNSIGNED NOT NULL COMMENT '班级ID',
  `weekday` tinyint(3) UNSIGNED NOT NULL COMMENT '星期几:1-7',
  `start_time` time NOT NULL COMMENT '开始时间',
  `end_time` time NOT NULL COMMENT '结束时间',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1停用 2启用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_class_id`(`class_id`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '班级排课表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for coach
-- ----------------------------
DROP TABLE IF EXISTS `coach`;
CREATE TABLE `coach`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '教练姓名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `gender` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '性别:1男 2女',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `birth_date` date NULL DEFAULT NULL COMMENT '出生日期',
  `work_years` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '执教年限',
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '个人简介',
  `career_history` json NULL COMMENT '执教履历',
  `certificates` json NULL COMMENT '资质证书',
  `specialties` json NULL COMMENT '专项擅长:启蒙/体能/战术/门将等',
  `age_groups` json NULL COMMENT '适合年龄段:U6/U8/U10/U12等',
  `teaching_features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '教学特色',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '教练信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for core_advantage
-- ----------------------------
DROP TABLE IF EXISTS `core_advantage`;
CREATE TABLE `core_advantage`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '优势标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '详细描述',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标类名或URL',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '配图',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '核心优势表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id` bigint(20) UNSIGNED NOT NULL COMMENT '分类ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程编码',
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '课程封面图',
  `images` json NULL COMMENT '课程图片集',
  `suitable_age_min` int(10) UNSIGNED NULL DEFAULT 6 COMMENT '适合最小年龄',
  `suitable_age_max` int(10) UNSIGNED NULL DEFAULT 16 COMMENT '适合最大年龄',
  `age_group_tag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '年龄段标签:U6/U8/U10/U12/U14/U16',
  `course_hours` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '总课时数',
  `class_duration` int(10) UNSIGNED NULL DEFAULT 90 COMMENT '单次课时(分钟)',
  `class_size_min` int(10) UNSIGNED NULL DEFAULT 1 COMMENT '最少开班人数',
  `class_size_max` int(10) UNSIGNED NULL DEFAULT 20 COMMENT '最多容纳人数',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '课程价格',
  `price_unit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'course' COMMENT '计价单位:course期/hour课时',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '课程简介',
  `outline` json NULL COMMENT '课程大纲',
  `objectives` json NULL COMMENT '教学目标',
  `features` json NULL COMMENT '课程特色',
  `requirements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '报名要求',
  `equipment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '所需装备',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_category_id`(`category_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_age_group`(`age_group_tag`) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '课程信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for course_category
-- ----------------------------
DROP TABLE IF EXISTS `course_category`;
CREATE TABLE `course_category`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类编码',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述',
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID,0为顶级',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:0禁用 1启用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '课程分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for course_class
-- ----------------------------
DROP TABLE IF EXISTS `course_class`;
CREATE TABLE `course_class`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `course_id` bigint(20) UNSIGNED NOT NULL COMMENT '课程ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '班级名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '班级编码',
  `coach_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '主教练ID',
  `assistant_coach_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '助教ID',
  `venue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上课场地',
  `schedule_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上课时间描述',
  `start_date` date NULL DEFAULT NULL COMMENT '开课日期',
  `end_date` date NULL DEFAULT NULL COMMENT '结课日期',
  `max_students` int(10) UNSIGNED NOT NULL DEFAULT 20 COMMENT '最大学员数',
  `current_students` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前学员数',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0已结课 1招生中 2开课中',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_course_id`(`course_id`) USING BTREE,
  INDEX `idx_coach_id`(`coach_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '班级表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `feedback_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '反馈类型:1咨询 2建议 3投诉 4其他',
  `contact_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人电话',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '反馈内容',
  `images` json NULL COMMENT '相关图片',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1未读 2已读 3已回复 4已解决',
  `reply_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '回复内容',
  `replied_by` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '回复人ID',
  `replied_at` datetime NULL DEFAULT NULL COMMENT '回复时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_feedback_type`(`feedback_type`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_created_at`(`created_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '反馈信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for institution_facility
-- ----------------------------
DROP TABLE IF EXISTS `institution_facility`;
CREATE TABLE `institution_facility`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设施名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '设施描述',
  `images` json NULL COMMENT '设施图片数组',
  `features` json NULL COMMENT '设施特点标签数组',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `cover_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '设施封面图',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '场地设施表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for institution_honor
-- ----------------------------
DROP TABLE IF EXISTS `institution_honor`;
CREATE TABLE `institution_honor`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '荣誉标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '荣誉描述',
  `award_date` date NULL DEFAULT NULL COMMENT '获奖日期',
  `award_org` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '颁发机构',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '荣誉图片',
  `sort_order` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态:1隐藏 2显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '荣誉奖项表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for institution_info
-- ----------------------------
DROP TABLE IF EXISTS `institution_info`;
CREATE TABLE `institution_info`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构名称',
  `slogan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构标语/理念',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构Logo',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '机构简介',
  `founded_date` date NULL DEFAULT NULL COMMENT '成立日期',
  `contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `contact_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系邮箱',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '机构地址',
  `business_hours` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '营业时间',
  `wechat_qr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信公众号二维码',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '机构基本信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for institution_milestone
-- ----------------------------
DROP TABLE IF EXISTS `institution_milestone`;
CREATE TABLE `institution_milestone`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '里程碑标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '详细内容',
  `milestone_date` date NOT NULL COMMENT '里程碑日期',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '配图',
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_sort_order`(`sort_order`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '机构发展历程表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `student_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学员编号',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '学员姓名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `gender` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '性别:1男 2女',
  `birth_date` date NOT NULL COMMENT '出生日期',
  `age` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '年龄(由应用层计算)',
  `id_card` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证号',
  `school` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '就读学校',
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '年级',
  `emergency_contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '紧急联系人',
  `emergency_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '紧急联系电话',
  `relation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '与学员关系',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '家庭住址',
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '培养方向',
  `medical_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '医疗注意事项',
  `foot_size` decimal(5, 2) NULL DEFAULT NULL COMMENT '鞋码',
  `height` decimal(5, 2) NULL DEFAULT NULL COMMENT '身高(cm)',
  `weight` decimal(5, 2) NULL DEFAULT NULL COMMENT '体重(kg)',
  `join_date` date NOT NULL COMMENT '入训日期',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1在读 2结业 3休学 4退学',
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系电话',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_student_no`(`student_no`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学员信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for student_attendance
-- ----------------------------
DROP TABLE IF EXISTS `student_attendance`;
CREATE TABLE `student_attendance`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `student_id` bigint(20) UNSIGNED NOT NULL COMMENT '学员ID',
  `class_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '班级ID',
  `schedule_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '排课ID',
  `attendance_date` date NOT NULL COMMENT '考勤日期',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1出勤 2请假 3缺勤 4迟到',
  `check_in_time` datetime NULL DEFAULT NULL COMMENT '签到时间',
  `check_out_time` datetime NULL DEFAULT NULL COMMENT '签退时间',
  `notes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `created_by` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '记录人ID',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_student_class_date`(`student_id`, `class_id`, `attendance_date`) USING BTREE,
  INDEX `idx_student_id`(`student_id`) USING BTREE,
  INDEX `idx_class_id`(`class_id`) USING BTREE,
  INDEX `idx_attendance_date`(`attendance_date`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学员考勤记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for student_enrollment
-- ----------------------------
DROP TABLE IF EXISTS `student_enrollment`;
CREATE TABLE `student_enrollment`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `student_id` bigint(20) UNSIGNED NOT NULL COMMENT '学员ID',
  `course_id` bigint(20) UNSIGNED NOT NULL COMMENT '课程ID',
  `class_id` bigint(20) UNSIGNED NOT NULL COMMENT '班级ID',
  `enroll_date` date NOT NULL COMMENT '报名日期',
  `expire_date` date NULL DEFAULT NULL COMMENT '到期日期',
  `total_hours` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '总课时',
  `remaining_hours` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '剩余课时',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '缴费金额',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1有效 2已转班 3已退班 4已结业',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_student_id`(`student_id`) USING BTREE,
  INDEX `idx_class_id`(`class_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学员报班记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for student_fitness_test
-- ----------------------------
DROP TABLE IF EXISTS `student_fitness_test`;
CREATE TABLE `student_fitness_test`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `student_id` bigint(20) UNSIGNED NOT NULL COMMENT '学员ID',
  `test_date` date NOT NULL COMMENT '测试日期',
  `height` decimal(5, 2) NULL DEFAULT NULL COMMENT '身高(cm)',
  `weight` decimal(5, 2) NULL DEFAULT NULL COMMENT '体重(kg)',
  `bmi` decimal(4, 2) NULL DEFAULT NULL COMMENT 'BMI指数(由应用层计算)',
  `vital_capacity` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '肺活量(ml)',
  `sprint_five_hundred` decimal(5, 2) NULL DEFAULT NULL COMMENT '50米跑(秒)',
  `sit_and_reach` decimal(5, 2) NULL DEFAULT NULL COMMENT '坐位体前屈(cm)',
  `standing_long_jump` decimal(5, 2) NULL DEFAULT NULL COMMENT '立定跳远(cm)',
  `sit_ups` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '仰卧起坐(次/分钟)',
  `endurance_run` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '耐力跑成绩',
  `dribbling` decimal(5, 2) NULL DEFAULT NULL COMMENT '带球绕桩(秒)',
  `passing_accuracy` decimal(5, 2) NULL DEFAULT NULL COMMENT '传球准确率(%)',
  `shooting_accuracy` decimal(5, 2) NULL DEFAULT NULL COMMENT '射门准确率(%)',
  `coach_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '测试教练ID',
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_student_id`(`student_id`) USING BTREE,
  INDEX `idx_test_date`(`test_date`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学员体测数据表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for student_growth_record
-- ----------------------------
DROP TABLE IF EXISTS `student_growth_record`;
CREATE TABLE `student_growth_record`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `student_id` bigint(20) UNSIGNED NOT NULL COMMENT '学员ID',
  `record_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '记录类型:1训练表现 2比赛记录 3体测数据 4获奖记录 5其他',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '记录标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '详细内容',
  `images` json NULL COMMENT '相关图片',
  `videos` json NULL COMMENT '相关视频',
  `record_date` date NOT NULL COMMENT '记录日期',
  `coach_id` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '记录教练ID',
  `tags` json NULL COMMENT '标签',
  `is_highlight` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否精选:0否 1是',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_student_id`(`student_id`) USING BTREE,
  INDEX `idx_record_type`(`record_type`) USING BTREE,
  INDEX `idx_record_date`(`record_date`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学员成长档案表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置键',
  `config_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '配置值',
  `config_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '配置描述',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_config_key`(`config_key`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统配置表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sys_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation_log`;
CREATE TABLE `sys_operation_log`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT '操作用户ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作用户名',
  `module` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作模块',
  `action` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作动作',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求方法',
  `request_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求URL',
  `request_params` json NULL COMMENT '请求参数',
  `response_data` json NULL COMMENT '响应数据',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作IP',
  `user_agent` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '浏览器UA',
  `execute_time` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '执行时长(ms)',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0失败 1成功',
  `error_msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '错误信息',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_module`(`module`) USING BTREE,
  INDEX `idx_created_at`(`created_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '操作日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '加密密码',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `role` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '角色:1管理员 2超级管理员',
  `status` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0禁用 1启用',
  `last_login_time` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '最后登录IP',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间(软删除)',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_username`(`username`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at`) USING BTREE
) ENGINE = oceanbase CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员账户表' ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
