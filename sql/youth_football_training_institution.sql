-- ========================================================
-- 足球青训机构管理系统数据库设计
-- 数据库: OceanBase MySQL模式兼容
-- 设计原则: 规范化、可扩展、性能优化
-- ========================================================

-- 设置字符集
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ========================================================
-- 1. 系统管理模块
-- ========================================================

-- 管理员账户表
CREATE TABLE IF NOT EXISTS `sys_user` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名',
    `password` VARCHAR(255) NOT NULL COMMENT '加密密码',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    `role` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '角色:1管理员 2超级管理员',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0禁用 1启用',
    `last_login_time` DATETIME DEFAULT NULL COMMENT '最后登录时间',
    `last_login_ip` VARCHAR(50) DEFAULT NULL COMMENT '最后登录IP',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间(软删除)',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    KEY `idx_status` (`status`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员账户表';

-- 系统配置表
CREATE TABLE IF NOT EXISTS `sys_config` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `config_key` VARCHAR(100) NOT NULL COMMENT '配置键',
    `config_value` TEXT COMMENT '配置值',
    `config_desc` VARCHAR(255) DEFAULT NULL COMMENT '配置描述',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- 操作日志表
CREATE TABLE IF NOT EXISTS `sys_operation_log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `user_id` BIGINT UNSIGNED NOT NULL COMMENT '操作用户ID',
    `username` VARCHAR(50) NOT NULL COMMENT '操作用户名',
    `module` VARCHAR(50) NOT NULL COMMENT '操作模块',
    `action` VARCHAR(100) NOT NULL COMMENT '操作动作',
    `request_method` VARCHAR(10) DEFAULT NULL COMMENT '请求方法',
    `request_url` VARCHAR(500) DEFAULT NULL COMMENT '请求URL',
    `request_params` JSON DEFAULT NULL COMMENT '请求参数',
    `response_data` JSON DEFAULT NULL COMMENT '响应数据',
    `ip` VARCHAR(50) DEFAULT NULL COMMENT '操作IP',
    `user_agent` VARCHAR(500) DEFAULT NULL COMMENT '浏览器UA',
    `execute_time` INT UNSIGNED DEFAULT 0 COMMENT '执行时长(ms)',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0失败 1成功',
    `error_msg` TEXT COMMENT '错误信息',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_module` (`module`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- ========================================================
-- 2. 机构信息管理模块
-- ========================================================

-- 机构基本信息表
CREATE TABLE IF NOT EXISTS `institution_info` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(100) NOT NULL COMMENT '机构名称',
    `slogan` VARCHAR(255) DEFAULT NULL COMMENT '机构标语/理念',
    `logo` VARCHAR(255) DEFAULT NULL COMMENT '机构Logo',
    `description` TEXT COMMENT '机构简介',
    `founded_date` DATE DEFAULT NULL COMMENT '成立日期',
    `contact_phone` VARCHAR(20) DEFAULT NULL COMMENT '联系电话',
    `contact_email` VARCHAR(100) DEFAULT NULL COMMENT '联系邮箱',
    `address` VARCHAR(255) DEFAULT NULL COMMENT '机构地址',
    `business_hours` VARCHAR(100) DEFAULT NULL COMMENT '营业时间',
    `wechat_qr` VARCHAR(255) DEFAULT NULL COMMENT '微信公众号二维码',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='机构基本信息表';

-- 机构发展历程表(时间轴)
CREATE TABLE IF NOT EXISTS `institution_milestone` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `title` VARCHAR(100) NOT NULL COMMENT '里程碑标题',
    `content` TEXT COMMENT '详细内容',
    `milestone_date` DATE NOT NULL COMMENT '里程碑日期',
    `image` VARCHAR(255) DEFAULT NULL COMMENT '配图',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='机构发展历程表';

-- 场地设施表
CREATE TABLE IF NOT EXISTS `institution_facility` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(100) NOT NULL COMMENT '设施名称',
    `description` TEXT COMMENT '设施描述',
    `images` JSON COMMENT '设施图片数组',
    `features` JSON COMMENT '设施特点标签数组',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='场地设施表';

-- 荣誉奖项表
CREATE TABLE IF NOT EXISTS `institution_honor` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `title` VARCHAR(100) NOT NULL COMMENT '荣誉标题',
    `description` TEXT COMMENT '荣誉描述',
    `award_date` DATE DEFAULT NULL COMMENT '获奖日期',
    `award_org` VARCHAR(100) DEFAULT NULL COMMENT '颁发机构',
    `image` VARCHAR(255) DEFAULT NULL COMMENT '荣誉图片',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='荣誉奖项表';

-- ========================================================
-- 3. 教练团队管理模块
-- ========================================================

-- 教练信息表
CREATE TABLE IF NOT EXISTS `coach` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '教练姓名',
    `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像',
    `gender` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '性别:1男 2女',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '联系电话',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    `birth_date` DATE DEFAULT NULL COMMENT '出生日期',
    `work_years` INT UNSIGNED DEFAULT 0 COMMENT '执教年限',
    `bio` TEXT COMMENT '个人简介',
    `career_history` JSON COMMENT '执教履历',
    `certificates` JSON COMMENT '资质证书',
    `specialties` JSON COMMENT '专项擅长:启蒙/体能/战术/门将等',
    `age_groups` JSON COMMENT '适合年龄段:U6/U8/U10/U12等',
    `teaching_features` TEXT COMMENT '教学特色',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0禁用 1启用',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='教练信息表';

-- ========================================================
-- 4. 课程体系管理模块
-- ========================================================

-- 课程分类表
CREATE TABLE IF NOT EXISTS `course_category` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '分类名称',
    `code` VARCHAR(50) DEFAULT NULL COMMENT '分类编码',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '分类描述',
    `parent_id` BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID,0为顶级',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0禁用 1启用',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_parent_id` (`parent_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程分类表';

-- 课程信息表
CREATE TABLE IF NOT EXISTS `course` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `category_id` BIGINT UNSIGNED NOT NULL COMMENT '分类ID',
    `name` VARCHAR(100) NOT NULL COMMENT '课程名称',
    `code` VARCHAR(50) DEFAULT NULL COMMENT '课程编码',
    `cover_image` VARCHAR(255) DEFAULT NULL COMMENT '课程封面图',
    `images` JSON COMMENT '课程图片集',
    `suitable_age_min` INT UNSIGNED DEFAULT 6 COMMENT '适合最小年龄',
    `suitable_age_max` INT UNSIGNED DEFAULT 16 COMMENT '适合最大年龄',
    `age_group_tag` VARCHAR(20) DEFAULT NULL COMMENT '年龄段标签:U6/U8/U10/U12/U14/U16',
    `course_hours` INT UNSIGNED DEFAULT 0 COMMENT '总课时数',
    `class_duration` INT UNSIGNED DEFAULT 90 COMMENT '单次课时(分钟)',
    `class_size_min` INT UNSIGNED DEFAULT 1 COMMENT '最少开班人数',
    `class_size_max` INT UNSIGNED DEFAULT 20 COMMENT '最多容纳人数',
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '课程价格',
    `price_unit` VARCHAR(20) DEFAULT 'course' COMMENT '计价单位:course期/hour课时',
    `description` TEXT COMMENT '课程简介',
    `outline` JSON COMMENT '课程大纲',
    `objectives` JSON COMMENT '教学目标',
    `features` JSON COMMENT '课程特色',
    `requirements` TEXT COMMENT '报名要求',
    `equipment` TEXT COMMENT '所需装备',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0下架 1上架',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间',
    PRIMARY KEY (`id`),
    KEY `idx_category_id` (`category_id`),
    KEY `idx_status` (`status`),
    KEY `idx_age_group` (`age_group_tag`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='课程信息表';

-- 班级表(课程的具体开班)
CREATE TABLE IF NOT EXISTS `course_class` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `course_id` BIGINT UNSIGNED NOT NULL COMMENT '课程ID',
    `name` VARCHAR(100) NOT NULL COMMENT '班级名称',
    `code` VARCHAR(50) DEFAULT NULL COMMENT '班级编码',
    `coach_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '主教练ID',
    `assistant_coach_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '助教ID',
    `venue` VARCHAR(255) DEFAULT NULL COMMENT '上课场地',
    `schedule_desc` VARCHAR(255) DEFAULT NULL COMMENT '上课时间描述',
    `start_date` DATE DEFAULT NULL COMMENT '开课日期',
    `end_date` DATE DEFAULT NULL COMMENT '结课日期',
    `max_students` INT UNSIGNED NOT NULL DEFAULT 20 COMMENT '最大学员数',
    `current_students` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前学员数',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0已结课 1招生中 2开课中',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_course_id` (`course_id`),
    KEY `idx_coach_id` (`coach_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班级表';

-- 班级排课表(具体上课时间)
CREATE TABLE IF NOT EXISTS `class_schedule` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `class_id` BIGINT UNSIGNED NOT NULL COMMENT '班级ID',
    `weekday` TINYINT UNSIGNED NOT NULL COMMENT '星期几:1-7',
    `start_time` TIME NOT NULL COMMENT '开始时间',
    `end_time` TIME NOT NULL COMMENT '结束时间',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0停用 1启用',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_class_id` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班级排课表';

-- ========================================================
-- 5. 学员管理模块
-- ========================================================

-- 学员信息表
CREATE TABLE IF NOT EXISTS `student` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `student_no` VARCHAR(50) NOT NULL COMMENT '学员编号',
    `name` VARCHAR(50) NOT NULL COMMENT '学员姓名',
    `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像',
    `gender` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '性别:1男 2女',
    `birth_date` DATE NOT NULL COMMENT '出生日期',
    `age` INT UNSIGNED DEFAULT NULL COMMENT '年龄(由应用层计算)',
    `id_card` VARCHAR(18) DEFAULT NULL COMMENT '身份证号',
    `school` VARCHAR(100) DEFAULT NULL COMMENT '就读学校',
    `grade` VARCHAR(20) DEFAULT NULL COMMENT '年级',
    `emergency_contact` VARCHAR(50) NOT NULL COMMENT '紧急联系人',
    `emergency_phone` VARCHAR(20) NOT NULL COMMENT '紧急联系电话',
    `relation` VARCHAR(20) DEFAULT NULL COMMENT '与学员关系',
    `address` VARCHAR(255) DEFAULT NULL COMMENT '家庭住址',
    `position` VARCHAR(255) DEFAULT NULL COMMENT '培养方向',
    `medical_notes` TEXT COMMENT '医疗注意事项',
    `foot_size` DECIMAL(5,2) DEFAULT NULL COMMENT '鞋码',
    `height` DECIMAL(5,2) DEFAULT NULL COMMENT '身高(cm)',
    `weight` DECIMAL(5,2) DEFAULT NULL COMMENT '体重(kg)',
    `join_date` DATE NOT NULL COMMENT '入训日期',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1在读 2结业 3休学 4退学',
    `remarks` TEXT COMMENT '备注',
    `phone` VARCHAR(20) NOT NULL COMMENT '联系电话',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `deleted_at` DATETIME DEFAULT NULL COMMENT '删除时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_student_no` (`student_no`),
    KEY `idx_name` (`name`),
    KEY `idx_status` (`status`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学员信息表';

-- 学员报班记录表
CREATE TABLE IF NOT EXISTS `student_enrollment` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `student_id` BIGINT UNSIGNED NOT NULL COMMENT '学员ID',
    `course_id` BIGINT UNSIGNED NOT NULL COMMENT '课程ID',
    `class_id` BIGINT UNSIGNED NOT NULL COMMENT '班级ID',
    `enroll_date` DATE NOT NULL COMMENT '报名日期',
    `expire_date` DATE DEFAULT NULL COMMENT '到期日期',
    `total_hours` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '总课时',
    `remaining_hours` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '剩余课时',
    `amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '缴费金额',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1有效 2已转班 3已退班 4已结业',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学员报班记录表';

-- 学员考勤记录表
CREATE TABLE IF NOT EXISTS `student_attendance` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `student_id` BIGINT UNSIGNED NOT NULL COMMENT '学员ID',
    `class_id` BIGINT UNSIGNED NOT NULL COMMENT '班级ID',
    `schedule_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '排课ID',
    `attendance_date` DATE NOT NULL COMMENT '考勤日期',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1出勤 2请假 3缺勤 4迟到',
    `check_in_time` DATETIME DEFAULT NULL COMMENT '签到时间',
    `check_out_time` DATETIME DEFAULT NULL COMMENT '签退时间',
    `notes` VARCHAR(255) DEFAULT NULL COMMENT '备注',
    `created_by` BIGINT UNSIGNED NOT NULL COMMENT '记录人ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_student_class_date` (`student_id`, `class_id`, `attendance_date`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_class_id` (`class_id`),
    KEY `idx_attendance_date` (`attendance_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学员考勤记录表';

-- 学员成长档案表
CREATE TABLE IF NOT EXISTS `student_growth_record` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `student_id` BIGINT UNSIGNED NOT NULL COMMENT '学员ID',
    `record_type` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '记录类型:1训练表现 2比赛记录 3体测数据 4获奖记录 5其他',
    `title` VARCHAR(100) NOT NULL COMMENT '记录标题',
    `content` TEXT COMMENT '详细内容',
    `images` JSON COMMENT '相关图片',
    `videos` JSON COMMENT '相关视频',
    `record_date` DATE NOT NULL COMMENT '记录日期',
    `coach_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '记录教练ID',
    `tags` JSON COMMENT '标签',
    `is_highlight` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否精选:0否 1是',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_record_type` (`record_type`),
    KEY `idx_record_date` (`record_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学员成长档案表';

-- 学员体测数据表
CREATE TABLE IF NOT EXISTS `student_fitness_test` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `student_id` BIGINT UNSIGNED NOT NULL COMMENT '学员ID',
    `test_date` DATE NOT NULL COMMENT '测试日期',
    `height` DECIMAL(5,2) DEFAULT NULL COMMENT '身高(cm)',
    `weight` DECIMAL(5,2) DEFAULT NULL COMMENT '体重(kg)',
    `bmi` DECIMAL(4,2) DEFAULT NULL COMMENT 'BMI指数(由应用层计算)',
    `vital_capacity` INT UNSIGNED DEFAULT NULL COMMENT '肺活量(ml)',
    `sprint_five_hundred` DECIMAL(5,2) DEFAULT NULL COMMENT '50米跑(秒)',
    `sit_and_reach` DECIMAL(5,2) DEFAULT NULL COMMENT '坐位体前屈(cm)',
    `standing_long_jump` DECIMAL(5,2) DEFAULT NULL COMMENT '立定跳远(cm)',
    `sit_ups` INT UNSIGNED DEFAULT NULL COMMENT '仰卧起坐(次/分钟)',
    `endurance_run` VARCHAR(20) DEFAULT NULL COMMENT '耐力跑成绩',
    `dribbling` DECIMAL(5,2) DEFAULT NULL COMMENT '带球绕桩(秒)',
    `passing_accuracy` DECIMAL(5,2) DEFAULT NULL COMMENT '传球准确率(%)',
    `shooting_accuracy` DECIMAL(5,2) DEFAULT NULL COMMENT '射门准确率(%)',
    `coach_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '测试教练ID',
    `remarks` TEXT COMMENT '备注',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_student_id` (`student_id`),
    KEY `idx_test_date` (`test_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学员体测数据表';

-- ========================================================
-- 6. 报名咨询管理模块
-- ========================================================

-- 报名表
CREATE TABLE IF NOT EXISTS `registration` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `registration_no` VARCHAR(50) NOT NULL COMMENT '报名编号',
    `student_name` VARCHAR(50) NOT NULL COMMENT '学员姓名',
    `gender` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '性别:1男 2女',
    `birth_date` DATE NOT NULL COMMENT '出生日期',
    `parent_name` VARCHAR(50) NOT NULL COMMENT '家长姓名',
    `parent_phone` VARCHAR(20) NOT NULL COMMENT '家长电话',
    `wechat` VARCHAR(50) DEFAULT NULL COMMENT '微信号',
    `intended_course_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '意向课程ID',
    `intended_age_group` VARCHAR(20) DEFAULT NULL COMMENT '意向年龄段',
    `experience` TEXT COMMENT '足球经历',
    `expectations` TEXT COMMENT '培训期望',
    `source` VARCHAR(50) DEFAULT NULL COMMENT '了解渠道',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1未处理 2已联系 3已报名 4已拒绝',
    `remarks` TEXT COMMENT '备注',
    `handled_by` BIGINT UNSIGNED DEFAULT NULL COMMENT '处理人ID',
    `handled_at` DATETIME DEFAULT NULL COMMENT '处理时间',
    `student_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '转为正式学员后的ID',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_registration_no` (`registration_no`),
    KEY `idx_status` (`status`),
    KEY `idx_parent_phone` (`parent_phone`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='报名表';

-- ========================================================
-- 7. 反馈信息管理模块
-- ========================================================

-- 反馈信息表
CREATE TABLE IF NOT EXISTS `feedback` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `feedback_type` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '反馈类型:1咨询 2建议 3投诉 4其他',
    `contact_name` VARCHAR(50) DEFAULT NULL COMMENT '联系人姓名',
    `contact_phone` VARCHAR(20) DEFAULT NULL COMMENT '联系人电话',
    `content` TEXT NOT NULL COMMENT '反馈内容',
    `images` JSON COMMENT '相关图片',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:1未读 2已读 3已回复 4已解决',
    `reply_content` TEXT COMMENT '回复内容',
    `replied_by` BIGINT UNSIGNED DEFAULT NULL COMMENT '回复人ID',
    `replied_at` DATETIME DEFAULT NULL COMMENT '回复时间',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_feedback_type` (`feedback_type`),
    KEY `idx_status` (`status`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='反馈信息表';

-- ========================================================
-- 8. 首页管理模块
-- ========================================================

-- 轮播图表
CREATE TABLE IF NOT EXISTS `banner` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `title` VARCHAR(100) DEFAULT NULL COMMENT '标题',
    `subtitle` VARCHAR(255) DEFAULT NULL COMMENT '副标题',
    `image` VARCHAR(255) NOT NULL COMMENT '图片URL',
    `link_type` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '链接类型:1无链接 2内部页面 3外部链接',
    `link_url` VARCHAR(500) DEFAULT NULL COMMENT '链接地址',
    `link_page` VARCHAR(100) DEFAULT NULL COMMENT '内部页面标识',
    `target` VARCHAR(20) DEFAULT '_self' COMMENT '打开方式:_self/_blank',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `start_time` DATETIME DEFAULT NULL COMMENT '开始时间',
    `end_time` DATETIME DEFAULT NULL COMMENT '结束时间',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';

-- 核心优势表
CREATE TABLE IF NOT EXISTS `core_advantage` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `title` VARCHAR(100) NOT NULL COMMENT '优势标题',
    `description` TEXT COMMENT '详细描述',
    `icon` VARCHAR(100) DEFAULT NULL COMMENT '图标类名或URL',
    `image` VARCHAR(255) DEFAULT NULL COMMENT '配图',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='核心优势表';

-- 快速入口表
CREATE TABLE IF NOT EXISTS `quick_entry` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(50) NOT NULL COMMENT '入口名称',
    `icon` VARCHAR(100) DEFAULT NULL COMMENT '图标',
    `link_type` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '链接类型:1内部页面 2外部链接',
    `link_url` VARCHAR(500) DEFAULT NULL COMMENT '链接地址',
    `link_page` VARCHAR(100) DEFAULT NULL COMMENT '内部页面标识',
    `sort_order` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序号',
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态:0隐藏 1显示',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_status` (`status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='快速入口表';

SET FOREIGN_KEY_CHECKS = 1;
