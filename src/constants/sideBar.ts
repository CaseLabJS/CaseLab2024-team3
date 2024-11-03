import { ROUTE_CONSTANTS } from '@constants/routes';
import { Users, FileStack, Calendar } from 'lucide-react';

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
