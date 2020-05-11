import { store } from '../redux/store';

export default {
  // access list permission
  accessAdminUser: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'SUPER_ADMIN_ROLE';
  },

  accessOrganization: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return (
      adminUserRole === 'SUPER_ADMIN_ROLE' ||
      adminUserRole === 'ORGANIZATION_ADMIN_ROLE'
    );
  },

  accessPrefecture: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return (
      adminUserRole === 'SUPER_ADMIN_ROLE' ||
      adminUserRole === 'PREFECTURE_ADMIN_ROLE'
    );
  },

  // user's role
  isOrganizationAdmin: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'ORGANIZATION_ADMIN_ROLE';
  },

  isPrefectureAdmin: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'PREFECTURE_ADMIN_ROLE';
  },
  isAdminUser: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'SUPER_ADMIN_ROLE';
  }
} as any;
