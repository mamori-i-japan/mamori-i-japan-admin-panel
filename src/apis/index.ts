import http from '../utils/http';
import { db } from '../utils/firebase';
import {
  CreateOrganizationRequestDto,
  UpdateOrganizationRequestDto,
} from './types';

import Firebase from 'firebase';
import { AdminRoleString } from '../constants/AdminRole';

export const login = () => {
  return http.post('auth/admin/login');
};

export const postAdminUser = (data: {
  email: string,
  adminRole: AdminRoleString,
  organizationId: string,
  prefectureId: string,
}) => {
  return http.post('/admins/users', data);
};

export const getAdminUsers = () => {
  return http.get('admins/users');
};

// export const postPositive = (data: { phoneNumber: string }) => {
//   return http.post('admins/positives', data);
// };

export const getMessages = async () => {
  // // generate default documents
  // Array.apply(null, new Array(48)).map((value, index) => {
  //   const id = index ? index.toString() : 'default';
  //   const documentId = index > 9 ? index.toString() : index !== 0 ? `0${index}` : 'default';

  //   db.collection('prefectureMessages')
  //     .doc(documentId)
  //     .set({ id, url: `http://www.${id}.temp` });
  // });

  try {
    const querySnapshot = await db.collection('prefectureMessages').get();
    const data: Firebase.firestore.DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      data.push(item);
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const postMessaage = async ({
  id,
  url,
}: {
  id: string;
  url: string;
}) => {
  const documentId = parseInt(id, 10) > 9 ? id : `0${id}`;
  try {
    const res = await db
      .collection('prefectureMessages')
      .doc(documentId)
      .update({
        url,
      });

    return res;
  } catch (error) {
    return error;
  }
};

export const getOrganizations = () => {
  return http.get('admins/organizations');
};

// TODO:
// {
//   name: string;
//   message: string;
//   adminRole?: AdminRoleString;
//   organizationId?: string;
//   prefectureId?: string;
// }

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
  return http.delete('admins/organizations', { data: { id } });
};

export const getOrganization = ({ id }: { id: string }) => {
  return http.get(`admins/organizations/${id}`);
};
