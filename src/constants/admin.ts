import {
  AdminDialogData,
  CreateAttribute,
  CreateDocumentType,
} from 'src/types';
import { getAdminAlertDialogCellContext } from 'src/components/AdminAlertDialog/AdminAlertDialogCellContext';
import { getAdminDialogCellContext } from 'src/components/AdminDialog/AdminDialogCellContext';
import { ColumnDef } from '@tanstack/react-table';

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

const BUTTONS_NAMES = {
  edit: 'Редактировать',
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
