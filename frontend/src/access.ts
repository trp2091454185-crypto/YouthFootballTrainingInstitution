export default (initialState: any) => {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 'admin',
    canManage: currentUser && ['admin', 'manager'].includes(currentUser.role),
    canCoach: currentUser && ['admin', 'manager', 'coach'].includes(currentUser.role),
    canFinance: currentUser && ['admin', 'manager', 'finance'].includes(currentUser.role),
    // 根据权限码判断
    hasPermission: (permission: string) => {
      if (!currentUser || !currentUser.permissions) return false;
      return currentUser.permissions.includes(permission);
    },
  };
};
