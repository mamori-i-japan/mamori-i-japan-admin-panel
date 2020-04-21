// import Validations from '../../constants/Validation';

export default [
  {
    name: 'status',
    type: 'radio',
    label: 'status',
    options: [
      {
        name: 'positiveStatus',
        value: 'positive',
      },
      {
        name: 'negativeStatus',
        value: 'negative',
      },
    ],
    rules: [],
  },
  {
    name: 'phone',
    type: 'input',
    label: 'phone',
    rules: [],
  },
  // {
  //   name: 'age',
  //   type: 'inputNumber',
  //   label: 'age',
  //   min: 0,
  //   max: 150,
  //   rules: [],
  // },
  // {
  //   name: 'address',
  //   type: 'input',
  //   label: 'address',
  //   rules: [],
  // },
  {
    name: 'createdDate',
    type: 'date',
    label: 'createdDate',
    rules: [],
  },
  // {
  //   readOnly: true,
  //   name: 'agreed',
  //   type: 'input',
  //   label: 'agreed',
  //   rules: [],
  // },
];
