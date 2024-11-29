import { CreateAttribute, CreateDocumentType, UserRegister } from 'src/types';

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
