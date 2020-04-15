import Validations from '../../constants/Validation';

export default [
  {
    name: 'status',
    type: 'radio',
    label: '',
    labelJa: '状況',
    rules: [],
  },
  {
    name: 'phone',
    type: 'input',
    label: '',
    labelJa: '電話番号',
    rules: [],
  },
  {
    name: 'uuid',
    type: 'input',
    label: '年齢',
    labelJa: 'UUID',
    rules: [],
  },
  {
    name: 'age',
    type: 'inputNumber',
    label: '',
    labelJa: '年齢',
    min: 0,
    max: 150,
    rules: [],
  },
  {
    name: 'address',
    type: 'input',
    label: '',
    labelJa: '都道府県',
    rules: [],
  },
  {
    readOnly: true,
    name: 'createdDate',
    type: 'input',
    label: '',
    labelJa: '登録日',
    rules: [],
  },
  {
    readOnly: true,
    name: 'agreed',
    type: 'input',
    label: '',
    labelJa: '情報提供への同意',
    rules: [],
  }
];
