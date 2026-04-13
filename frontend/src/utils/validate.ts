// 验证手机号
export const validatePhone = (phone: string): boolean => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
};

// 验证邮箱
export const validateEmail = (email: string): boolean => {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return reg.test(email);
};

// 验证身份证号
export const validateIdCard = (idCard: string): boolean => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idCard);
};

// 验证年龄
export const validateAge = (age: number): boolean => {
  return age > 0 && age < 120;
};

// 验证正整数
export const validatePositiveInteger = (num: number): boolean => {
  return Number.isInteger(num) && num > 0;
};
