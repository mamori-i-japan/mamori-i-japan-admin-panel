import http from '../utils/http';
import {
  UpdatePrefectureRequestDto
} from './types';

import { AdminRoleString } from '../constants/AdminRole';

export const login = () => {
  return http.post('auth/admin/login');
};

export const postAdminUser = (data: {
  email: string,
  adminRole: AdminRoleString,
  organizationId: string,
  prefectureId: number,
}) => {
  return http.post('/admins/users', data);
};

export const getAdminUsers = () => {
  return http.get('admins/users');
};

export const deleteAdminUser = ({ id }: { id: string }) => {
  return http.delete(`admins/users/${id}`);
};

export const getPrefectures = () => {
  return http.get(`admins/prefectures`);
}


export const patchPrefecture = ({
  id,
  message,
}: UpdatePrefectureRequestDto) => {
  return http.patch(`admins/prefectures/${id}`, { message });
}

