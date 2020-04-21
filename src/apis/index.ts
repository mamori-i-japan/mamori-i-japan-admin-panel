import http from '../utils/http';

export const login = (data: { email: string }) => {
  return http.post('auth/admin/login', data);
};

export const postPositive = (data: { phoneNumber: string }) => {
  return http.post('admin/positives', data);
};

export const getAdminUserList = () => {
  return http.get('admins/users');
};

export const postAdminUser = (data: { email: string }) => {
  return http.post('/admins/users', data);
};
