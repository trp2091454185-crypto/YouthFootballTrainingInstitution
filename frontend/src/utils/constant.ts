// 性别枚举
export const GENDER = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
] as const;

export const RELATIONSHIP = [
  { label: '父子', value: "father" },
  { label: '母子', value: "mother" },
  { label: '兄弟', value: "brother" },
  { label: '姐妹', value: "sister" },
] as const;

// 球员位置枚举
export const POSITION = [
  { label: '门将', value: 'GK' },
  { label: '中后卫', value: 'CB' },
  { label: '左后卫', value: 'LB' },
  { label: '右后卫', value: 'RB' },
  { label: '左翼卫', value: 'LWB' },
  { label: '右翼卫', value: 'RWB' },
  { label: '防守型后腰', value: 'CDM' },
  { label: '中前卫', value: 'CM' },
  { label: '攻击型中场', value: 'CAM' },
  { label: '左前卫', value: 'LM' },
  { label: '右前卫', value: 'RM' },
  { label: '左边锋', value: 'LW' },
  { label: '右边锋', value: 'RW' },
  { label: '中锋', value: 'ST' },
  { label: '影锋', value: 'CF' },
] as const;

export const SCHOOLSTATUS = [
  { label: '在读', value: 1 },
  { label: '结业', value: 2 },
  { label: '休学', value: 3 },
  { label: '退学', value: 4 },
] as const;


export const SPECIALTY_OPTIONS = [
  { label: '启蒙', value: '启蒙' },
  { label: '体能', value: '体能' },
  { label: '战术', value: '战术' },
  { label: '门将', value: '门将' },
  { label: '进攻', value: '进攻' },
  { label: '防守', value: '防守' },
  { label: '传控', value: '传控' },
  { label: '射门', value: '射门' },
  { label: '盘带', value: '盘带' },
  { label: '头球', value: '头球' },
  { label: '定位球', value: '定位球' },
  { label: '速度训练', value: '速度训练' },
  { label: '力量训练', value: '力量训练' },
  { label: '敏捷性', value: '敏捷性' },
  { label: '协调性', value: '协调性' },
  { label: '心理辅导', value: '心理辅导' },
] as const;

export const AGE_GROUP_OPTIONS = [
  { label: 'U5', value: 'U5' },
  { label: 'U6', value: 'U6' },
  { label: 'U7', value: 'U7' },
  { label: 'U8', value: 'U8' },
  { label: 'U9', value: 'U9' },
  { label: 'U10', value: 'U10' },
  { label: 'U11', value: 'U11' },
  { label: 'U12', value: 'U12' },
  { label: 'U13', value: 'U13' },
  { label: 'U14', value: 'U14' },
  { label: 'U15', value: 'U15' },
  { label: 'U16', value: 'U16' },
  { label: 'U17', value: 'U17' },
  { label: 'U18', value: 'U18' },
  { label: 'U19', value: 'U19' },
] as const;

// 了解渠道枚举
export const CHANNEL = [
  { label: '朋友推荐', value: 'friendReferral' },
  { label: '网络搜索', value: 'searchEngine' },
  { label: '社交媒体', value: 'socialMedia' },
  { label: '线下广告', value: 'offlineAd' },
  { label: '学校宣传', value: 'schoolPromo' },
  { label: '赛事活动', value: 'event' },
  { label: '其他', value: 'other' },
] as const;


