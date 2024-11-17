import {
  AdminDialogData,
  ChangeUser,
  CreateAttribute,
  CreateDocumentType,
  UserRegister,
} from 'src/types';
import { getAdminAlertDialogCellContext } from 'src/components/AdminAlertDialog/AdminAlertDialogCellContext';
import { getAdminDialogCellContext } from 'src/components/AdminDialog/AdminDialogCellContext';
import { ColumnDef } from '@tanstack/react-table';
import { BUTTONS_NAMES } from './defaultConstants';
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
type Role = {
  id: number;
  name: string;
};
export const TYPES_TABLE_COLUMNS: ColumnDef<AdminDialogData>[] = [
  {
    accessorKey: 'name',
    header: 'Имя',
    minSize: 200,
    maxSize: 700,
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    minSize: 300,
    maxSize: 700,
  },
  {
    accessorKey: 'attributeIds',
    header: 'Атрибуты',
    size: 1000,
  },
  {
    accessorKey: 'edit',
    header: '',
    cell: getAdminDialogCellContext,
  },
  {
    accessorKey: 'delete',
    header: '',
    cell: getAdminAlertDialogCellContext,
  },
];

export const ATTRIBUTES_TABLE_COLUMNS: ColumnDef<AdminDialogData>[] = [
  {
    accessorKey: 'name',
    header: 'Имя',
    minSize: 200,
    maxSize: 700,
  },
  {
    accessorKey: 'dataType',
    header: 'Тип данных',
    minSize: 200,
    maxSize: 700,
  },
  {
    accessorKey: 'documentTypeIds',
    header: 'Связанные типы документов',
    size: 1000,
  },
  {
    accessorKey: 'required',
    header: 'Обязательный',
    size: 100,
  },
  {
    accessorKey: 'edit',
    header: '',
    cell: getAdminDialogCellContext,
  },
  {
    accessorKey: 'delete',
    header: '',
    cell: getAdminAlertDialogCellContext,
  },
];
export const USERS_TABLE_COLUMNS: ColumnDef<
  UserRegister | ChangeUser | AdminDialogData
>[] = [
  {
    accessorKey: 'sequenceNumber',
    header: '№',
    size: 80,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
    size: 150,
  },
  {
    accessorKey: 'firstName',
    header: 'Имя',
    size: 150,
  },
  {
    accessorKey: 'patronymic',
    header: 'Отчество',
    size: 150,
  },
  {
    accessorKey: 'email',
    header: 'Электронная почта',
    size: 150,
  },
  {
    accessorKey: 'login',
    header: 'Логин',
    size: 150,
  },

  {
    accessorKey: 'roles',
    header: 'Роль',
    size: 100,
    cell: ({ row }) => {
      const data = row.original as UserRegister;
      if (Array.isArray(data.roles)) {
        return data.roles.map((role) => role.name).join(', ');
      }
      return 'Нет роли';
    },
  },

  {
    accessorKey: 'edit',
    header: '',
    cell: getAdminDialogCellContext,
  },
  {
    accessorKey: 'delete',
    header: '',
    cell: getAdminAlertDialogCellContext,
  },
];

export const DIALOGS_VALUES = {
  docTypesCreate: {
    dialogTitleText: 'Создание типа документа',
    dialogDescriptionText:
      'Для создания типа документа необходимо заполнить поля ниже.',
    btnTriggerText: 'Создать тип документа',
  },
  docTypesEdit: {
    dialogTitleText: 'Редактирование типа документа',
    dialogDescriptionText:
      "Здесь можно изменить тип документа. После внесения изменений нажмите 'сохранить'.",
    btnTriggerText: BUTTONS_NAMES.edit,
  },

  docAttributesCreate: {
    dialogTitleText: 'Создание атрибута документа',
    dialogDescriptionText:
      'Для создания атрибута документа необходимо заполнить поля ниже.',
    btnTriggerText: 'Создать атрибут документа',
  },
  docAttributesEdit: {
    dialogTitleText: 'Редактирование атрибута документа',
    dialogDescriptionText:
      "Здесь можно изменить атрибута документа. После внесения изменений нажмите 'сохранить'.",
    btnTriggerText: BUTTONS_NAMES.edit,
  },

  userCreate: {
    dialogTitleText: 'Создание нового пользователя',
    dialogDescriptionText:
      'Для создания нового пользователя необходимо заполнить поля ниже:',
    btnTriggerText: 'Создать пользователя',
  },
  userEdit: {
    dialogTitleText: 'Редактирование пользователя',
    dialogDescriptionText:
      "Здесь можно изменить пользователя. После внесения изменений нажмите 'Cохранить'.",
    btnTriggerText: BUTTONS_NAMES.edit,
  },
};

export const EMPTY_DOC_TYPE: CreateDocumentType = {
  name: '',
  description: '',
  attributeIds: [],
};

export const EMPTY_DOC_ATTRIBUTE: CreateAttribute = {
  name: '',
  dataType: '',
  documentTypeIds: [],
  required: true,
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
