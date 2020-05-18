import { HOST } from '../../constants';

export default [
  {
    name: 'adminUser',
    path: HOST,
    permission: 'accessAdminUser'
  },
  {
    name: 'prefectureMessage',
    path: HOST + 'prefectures',
    permission: 'accessPrefecture'
  },
];
