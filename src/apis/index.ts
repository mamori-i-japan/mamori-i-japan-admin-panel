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
  const docRef = db.collection("prefectureMessages").doc("SF");
  const getOptions: any = {
    source: 'server'
  };

  try {
    const doc = await docRef.get(getOptions);

    console.log(doc.data());

    return doc.data();
  } catch (error) {
    return error;
  }
};

export const postMessaage = () => {


};

// todo: 陽性判定者一覧
export const getPositives = () => {

};

// todo: 濃厚接触者一覧
export const getClosedContacts = () => {

};
