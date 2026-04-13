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
