import http from '../utils/http';


export const login = (data: any) => {
  return http.post('auth/admin/login', data)
};
