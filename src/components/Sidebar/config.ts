import { HOST } from '../../constants';

export default [
  {
    name: 'message',
    path: HOST,
    children: [],
  },
  {
    name: 'organization',
    path: HOST + 'organizations',
  },
  // {
  //   name: 'positive',
  //   path: HOST + 'positives',
  //   children: [],
  // },
  // {
  //   name: 'contact',
  //   path: HOST + 'contacts',
  //   children: [],
  // },
  {
    name: 'adminUser',
    path: HOST + 'users',
    children: [],
  }
];
