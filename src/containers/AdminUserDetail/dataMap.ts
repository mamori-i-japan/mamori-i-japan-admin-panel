import Validation from '../../constants/Validation';

type RoleOption = {
  id: string;
  name: string;
}

type FormItem = {
  name: string;
  type: string;
  label: string;
  selectOptions?: RoleOption[];
  rules: any[];
}

const dataMap: FormItem[] = [
  {
    name: 'email',
    type: 'input',
    label: 'email',
    rules: [Validation.required, Validation.email],
  },
  {
    name: 'role',
    type: 'select',
    label: 'role',
    selectOptions: [
      {
        id: '0',
        name: 'Super Admin',
      },
      {
        id: '1',
        name: 'National Admin',
      },
      {
        id: '2',
        name: 'Prefecture Admin',
      },
      {
        id: '3',
        name: 'Organization Admin',
      },
    ],
    rules: [Validation.required],
  },
];

export default dataMap;
