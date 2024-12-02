import { UserRegister } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { actionMoreColumn, defaultColumn } from './defaultTableColumns';

import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';

export const FIELD_LABELS: { [key: string]: string } = {
  id: 'Ид. номер',
  name: 'Имя',
  description: 'Описание',
  attributeIds: 'Атрибуты',
  documentTypeIds: 'Св-е типы документов',
  required: 'Обязательный',
  dataType: 'Тип данных',
  roles: 'Роли',
  lastName: 'Фамилия',
  firstName: 'Имя',
  patronymic: 'Отчество',
  email: 'Электронная почта',
  login: 'Логин',
  password: 'Пароль',
};

export const ROLES = [
  {
    id: 'USER',
    name: 'USER',
  },
  {
    id: 'ADMIN',
    name: 'ADMIN',
  },
];

const USER_LOGIN = `login`;
const USER_EMAIL = `email`;
const USER_ROLES = `roles`;

export const TABLE_USERS_LIST_CONFIG: ColumnDef<UserRegister>[] = [
  defaultColumn({
    accessorKey: 'sequenceNumber',
    header: '№',
    cell: ({ row }) => row.index + 1,
  }),
  defaultColumn({
    accessorKey: 'lastName',
    header: 'Фамилия',
  }),
  defaultColumn({
    accessorKey: 'firstName',
    header: 'Имя',
  }),
  defaultColumn({
    accessorKey: 'patronymic',
    header: 'Отчество',
  }),
  defaultColumn({
    accessorKey: USER_EMAIL,
    header: 'Эл-ая почта',
  }),
  defaultColumn({
    accessorKey: USER_LOGIN,
    header: 'Логин',
  }),
  defaultColumn({
    accessorKey: USER_ROLES,
    header: 'Роль',
    cell: ({ row }) => {
      const data = row.original;
      if (Array.isArray(data.roles)) {
        return data.roles.map((role) => role.name).join(', ');
      }
      return 'Нет роли';
    },
  }),
  actionMoreColumn(),
];

export const CONFIG_FIELDS_USER_EDIT: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'id',
      type: FieldTypes.Input,
      disabled: true,
      label: 'Ид. номер',
    },
  },
  {
    baseFieldProps: {
      name: 'lastName',
      type: FieldTypes.Input,
      label: 'Фамилия',
    },
  },
  {
    baseFieldProps: {
      name: 'firstName',
      type: FieldTypes.Input,
      label: 'Имя',
    },
  },
  {
    baseFieldProps: {
      name: 'patronymic',
      type: FieldTypes.Input,
      label: 'Отчество',
    },
  },
  {
    baseFieldProps: {
      name: USER_EMAIL,
      type: FieldTypes.Input,
      label: 'Эл-ая почта',
    },
  },
  {
    baseFieldProps: {
      name: USER_LOGIN,
      type: FieldTypes.Input,
      label: 'Логин',
    },
  },
  {
    baseFieldProps: {
      name: USER_ROLES,
      type: FieldTypes.Select,
      label: 'Роли',
    },
  },
];

export const TABLE_USER_COLUMN_VISIBLE = {
  [USER_EMAIL]: false,
  [USER_LOGIN]: false,
  [USER_ROLES]: false,
};

export const mapSubmitPayloadUserEdit = <NewData>(
  payload: UserRegister
): NewData => {
  return {
    login: payload.login,
    email: payload.email,
    password: payload.password,
    firstName: payload.firstName,
    lastName: payload.lastName,
    patronymic: payload.patronymic,
    roles: payload.roles,
  } as NewData;
};

export const EMPTY_USER_ATTRIBUTE: UserRegister = {
  lastName: '',
  firstName: '',
  patronymic: '',
  email: '',
  login: '',
  password: '',
  roles: [] as Role[],
};

type Role = {
  id: number;
  name: string;
};
