import http from '../utils/http';

export const login = () => {
  return http.post('auth/admin/login');
};

export const postPositive = (data: { phoneNumber: string }) => {
  return http.post('admins/positives', data);
};

export const getAdminUserList = () => {
  return http.get('admins/users');
};

export const postAdminUser = (data: { email: string }) => {
  return http.post('/admins/users', data);
};
