import { HOST } from '../../constants';

export default [
  {
    name: 'adminUser',
    path: HOST + 'users',
    permission: 'accessAdminUser'
  },
  {
    name: 'organization',
    path: HOST + 'organizations',
    permission: 'accessOrganization'
  },
  {
    name: 'prefetureMessage',
    path: HOST + 'prefectures',
    permission: 'accessPrefecture'
  },
];
