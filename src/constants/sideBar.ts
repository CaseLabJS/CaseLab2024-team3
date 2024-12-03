import { ROUTE_CONSTANTS } from '@constants/routes';
import {
  Calendar,
  FileInput,
  FileOutput,
  FileStack,
  PencilLine,
  Users,
} from 'lucide-react';

export const adminMenuItems = [
  {
    title: 'Пользователи',
    url: ROUTE_CONSTANTS.USERS,
    icon: Users,
  },
  {
    title: 'Типы документов',
    url: ROUTE_CONSTANTS.DOC_TYPES_ADMIN,
    icon: FileStack,
  },
  {
    title: 'Атрибуты документов',
    url: ROUTE_CONSTANTS.DOC_ATTRIBUTES_ADMIN,
    icon: Calendar,
  },
];

export const userMenuItems = [
  {
    title: 'Мои документы',
    url: ROUTE_CONSTANTS.USER_DOCUMENTS,
    icon: FileStack,
    id: 1,
  },
  {
    title: 'Отправленные на подпись',
    url: ROUTE_CONSTANTS.USER_SENT_FOR_SIGN,
    icon: FileOutput,
    id: 2,
  },
  {
    title: 'Ожидают подписания',
    url: ROUTE_CONSTANTS.USER_AWAITING_SIGN,
    icon: FileInput,
    id: 3,
  },
  {
    title: 'Подписанные документы',
    url: ROUTE_CONSTANTS.USER_AFTER_SIGN,
    icon: PencilLine,
    id: 4,
  },
];
