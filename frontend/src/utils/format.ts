// 格式化日期
export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD') => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
};

// 格式化金额
export const formatMoney = (amount: number): string => {
  if (amount === null || amount === undefined) return '0.00';
  return amount.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  });
};

// 格式化电话号码
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 11) {
    return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
  }
  return phone;
};
