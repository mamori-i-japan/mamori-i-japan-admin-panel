import http from '../utils/http';

export const login = () => {
  return http.post('auth/admin/login');
};

export const postAdminUser = (data: { email: string }) => {
  return http.post('/admins/users', data);
};

export const getAdminUserList = () => {
  return http.get('admins/users');
};

export const postPositive = (data: { phoneNumber: string }) => {
  return http.post('admins/positives', data);
};

// todo: 陽性判定者一覧
export const getPositives = () => {

};

// todo: 濃厚接触者一覧
export const getClosedContacts = () => {

};

// todo: お知らせ一覧
export const getMessages = () => {

};

// todo: お知らせを変更
export const postMessaage = () => {

}
