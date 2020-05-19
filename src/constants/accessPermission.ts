import { HOST } from './index';
import { store } from '../redux/store';

const accessPermission = {
  // access list permission
  accessAdminUser: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return adminUserRole === 'SUPER_ADMIN_ROLE';
  },

  accessPrefecture: () => {
    const adminUserRole = store.getState().auth.userAdminRole;

    return (
      adminUserRole === 'SUPER_ADMIN_ROLE' ||
      adminUserRole === 'PREFECTURE_ADMIN_ROLE'
    );
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


export const redirectDefaultPath = () => {
  return accessPermission.accessAdminUser()
    ? HOST
    : HOST + 'prefectures';
};

export default accessPermission;
