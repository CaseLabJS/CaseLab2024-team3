import { UserRegister } from 'src/types';
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

export const EMPTY_USER_ATTRIBUTE: UserRegister = {
  lastName: '',
  firstName: '',
  patronymic: '',
  email: '',
  login: '',
  password: '',
  roles: [] as Role[],
};
