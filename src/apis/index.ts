import http from '../utils/http';
import { db } from '../utils/firebase';

export const login = () => {
  return http.post('auth/admin/login');
};

export const postAdminUser = (data: { email: string }) => {
  return http.post('/admins/users', data);
};

export const getAdminUsers = () => {
  return http.get('admins/users');
};

export const postPositive = (data: { phoneNumber: string }) => {
  return http.post('admins/positives', data);
};

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
    const data: any = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
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
    const res = await db.collection('prefectureMessages').doc(documentId).update({
      url,
    });

    return res;
  } catch (error) {
    return error;
  }
};
