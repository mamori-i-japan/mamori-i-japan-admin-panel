import { HOST } from '../../constants';

export default [
  {
    name: 'adminUser',
    path: HOST + 'users',
    children: [],
  },
  {
    name: 'organization',
    path: HOST + 'organizations',
  },
  {
    name: 'prefetureMessage',
    path: HOST,
    children: [],
  },
];
