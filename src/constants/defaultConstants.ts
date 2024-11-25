import { DocumentState, RecordStateInfo } from '@/types/state';
import { Theme } from '@components/ThemeProvider/types';

export const BUTTONS_NAMES = {
  edit: 'Редактировать',
};

export const KEY_THEME_LS = 'theme';

export const THEME_CONFIG: {
  title: string;
  value: Theme;
}[] = [
  {
    title: 'Светлая',
    value: 'light',
  },
  {
    title: 'Тёмная',
    value: 'dark',
  },
  {
    title: 'Системная',
    value: 'system',
  },
];

export const DOCUMENT_STATE: RecordStateInfo<DocumentState> = {
  [DocumentState.DRAFT]: {
    title: 'Черновик',
    className: 'bg-gray-500 text-white',
  },
  [DocumentState.AUTHOR_SIGNED]: {
    title: 'Подписан автором',
    className: 'bg-red-700 text-white',
  },
  [DocumentState.PENDING_AUTHOR_SIGN]: {
    title: 'Ожидает подписи автора',
    className: 'bg-blue-500 text-white',
  },
  [DocumentState.PENDING_CONTRACTOR_SIGN]: {
    title: 'Ожидает подписи контрагентом',
    className: 'bg-blue-500 text-white',
  },
  [DocumentState.DELETED]: {
    title: 'Удален',
    className: 'bg-red-700 text-white',
  },
  [DocumentState.REJECTED]: {
    title: 'Отклонен',
    className: 'bg-red-700 text-white',
  },
  [DocumentState.APPROVED]: {
    title: 'Одобрен',
    className: 'bg-green-500 text-white',
  },
  [DocumentState.REWORK_REQUIRED]: {
    title: 'Требуется переработка',
    className: 'bg-yellow-500 text-white',
  },
  [DocumentState.IN_VOTING]: {
    title: 'Голосование',
    className: 'bg-blue-500 text-white',
  },
};
