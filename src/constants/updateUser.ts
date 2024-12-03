import { DialogTexts, UserRegister } from '@/types/index';
import { BUTTONS_NAMES } from './defaultConstants';
type Role = {
  id: number;
  name: string;
};

export const DIALOGS_VALUES = {
  docTypesCreate: {
    dialogTitleText: 'Редактирование данных пользователя',
    dialogDescriptionText:
      'Для изменения данных пользователя необходимо заполнить поля ниже.',
    btnTriggerText: 'Редактировать пользователя',
  },
};

export const fieldLabels: Record<string, { label: string; hidden: boolean }> = {
  lastName: { label: 'Фамилия', hidden: false },
  firstName: { label: 'Имя', hidden: false },
  patronymic: { label: 'Отчество', hidden: false },
  email: { label: 'Электронная почта', hidden: false },
  login: { label: 'Логин', hidden: false },
  password: { label: 'Пароль', hidden: false }, // Может быть скрыто для безопасности
  roles: { label: 'Роли пользователя', hidden: false },
};

export const DIALOGS_USER: Record<string, DialogTexts> = {
  EDIT: {
    dialogTitleText: 'Редактирование пользователя',
    dialogDescriptionText:
      'Здесь можно изменить данные пользователя. После внесения изменений нажмите "Сохранить".',
    btnTriggerText: BUTTONS_NAMES.edit,
  },
  CREATE: {
    dialogTitleText: 'Создание нового пользователя',
    dialogDescriptionText:
      'Для создания нового пользователя необходимо заполнить поля ниже:',
    btnTriggerText: 'Создать пользователя',
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
