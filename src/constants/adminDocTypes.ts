import { ChangeDocumentType } from '@/types';
import { getAdminAlertDialogCellContext } from '@components/AdminAlertDialog/AdminAlertDialogCellContext';
import { getAdminDialogCellContext } from '@components/AdminDialog/AdminDialogCellContext';

import { ColumnDef } from '@tanstack/react-table';

export const TYPES_TABLE_COLUMNS: ColumnDef<ChangeDocumentType>[] = [
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
    btnTriggerText: 'Редактировать',
  },
};

export const EMPTY_DOC_TYPE = {
  name: '',
  description: '',
  attributeIds: [],
};
