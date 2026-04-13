declare namespace MockData {
  interface Student {
    id: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    age: number;
    phone: string;
    level: string;
    status: string;
    direction: string;
    joinDate: string;
    birthDate: string;
    emergencyContact: string;
    emergencyContactName: string;
    address: string;
    school: string;
    height: number;
    weight: number;
    remark: string;
    createTime: string;
    updateTime: string;
  }
}

export { MockData };
