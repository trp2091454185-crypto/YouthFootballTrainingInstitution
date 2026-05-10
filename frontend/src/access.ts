export default (initialState: any) => {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 2,
    canManage: currentUser && currentUser && [1, 2].includes(currentUser.role),
    canCoach: currentUser && [1, 2].includes(currentUser.role),
    canFinance: currentUser && currentUser.role === 2,
    hasPermission: (permission: string) => {
      if (!currentUser) return false;
      return Array.isArray(currentUser.permissions) && currentUser.permissions.includes(permission);
    },
  };
};
