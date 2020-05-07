import { store } from '../redux/store';

export default {
  accessAdminUser: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'SUPER_ADMIN_ROLE'
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

  rejectCreateOrganization: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'ORGANIZATION_ADMIN_ROLE';
  },

  rejectDeleteOrganizaton: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'ORGANIZATION_ADMIN_ROLE';
  },
} as any; 
