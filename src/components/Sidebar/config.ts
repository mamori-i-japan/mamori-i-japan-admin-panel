import { HOST } from '../../constants';

export default [
  {
    name: 'adminUser',
    path: HOST,
    permission: 'accessAdminUser'
  },
  {
    name: 'organization',
    path: HOST + 'organizations',
    permission: 'accessOrganization'
  },
  {
    name: 'prefectureMessage',
    path: HOST + 'prefectures',
    permission: 'accessPrefecture'
  },
];
