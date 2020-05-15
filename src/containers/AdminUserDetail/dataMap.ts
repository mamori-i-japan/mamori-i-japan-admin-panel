import Validation from '../../constants/Validation';
import { prefectureList } from '../../constants/Prefecture'
import { AdminRoleString } from '../../constants/AdminRole';

type RoleOption = {
  id: string;
  name: string;
  role?: AdminRoleString;
  organizationId?: string;
}

type FormItem = {
  name: string;
  type: string;
  label: string;
  selectOptions?: RoleOption[];
  rules: any[];
  onChange?: () => void;
  loading?: boolean;
  withCreateItem?: boolean;
  autoFocus?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: '0',
    name: 'Super Admin',
    role: 'SUPER_ADMIN_ROLE',
  },
  // {
  //   id: '1',
  //   name: 'National Admin',
  //   role: 'NATIONAL_ADMIN_ROLE',
  // },
  {
    id: '2',
    name: 'Prefecture Admin',
    role: 'PREFECTURE_ADMIN_ROLE',
  },
  // {
  //   id: '3',
  //   name: 'Organization Admin',
  //   role: 'ORGANIZATION_ADMIN_ROLE',
  // },
];

const dataMap: FormItem[] = [
  {
    name: 'email',
    type: 'input',
    label: 'email',
    rules: [Validation.required, Validation.email],
    autoFocus: true,
  },
  {
    name: 'role',
    type: 'select',
    label: 'permission',
    selectOptions: roleOptions,
    rules: [Validation.required],
  },
];

const prefectureForm = {
  name: 'prefecture',
  type: 'select',
  label: 'prefecture',
  selectOptions: prefectureList.map((prefecture, index) => ({
    id: index.toString(),
    name: prefecture.name,
  })),
  rules: [Validation.required],
};

const organizationForm = (organizationOptions: RoleOption[], isLoading: boolean): FormItem => ({
  name: 'organization',
  type: 'select',
  label: 'organization',
  selectOptions: organizationOptions,
  rules: [Validation.required],
  loading: isLoading,
  withCreateItem: true,
});

export { prefectureForm, organizationForm, roleOptions };
export type { RoleOption, FormItem };
export default dataMap;
