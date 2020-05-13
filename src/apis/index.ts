import http from '../utils/http';
import {
  CreateOrganizationRequestDto,
  UpdateOrganizationRequestDto,
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

export const getOrganizations = () => {
  return http.get('admins/organizations');
};

export const postOrganization = (data: CreateOrganizationRequestDto) => {
  return http.post('admins/organizations', data);
};

export const patchOrganization = ({
  id,
  name,
  message,
}: UpdateOrganizationRequestDto) => {
  return http.patch(`admins/organizations/${id}`, { name, message });
};

export const deleteOrganization = ({ id }: { id: string }) => {
  return http.delete(`admins/organizations/${id}`);
};

export const getOrganization = ({ id }: { id: string }) => {
  return http.get(`admins/organizations/${id}`);
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

