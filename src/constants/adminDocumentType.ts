import { ChangeDocumentType, CreateDocumentType, DialogTexts } from '@/types';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { ColumnDef } from '@tanstack/react-table';
import { BUTTONS_NAMES } from './defaultConstants';
import {
  actionMoreColumn,
  attributeColumn,
  defaultColumn,
  idColumn,
} from './defaultTableColumns';
import { z } from 'zod';

export const TABLE_DOCUMENT_TYPES_CONFIG: ColumnDef<ChangeDocumentType>[] = [
  idColumn(),
  defaultColumn({
    accessorKey: 'name',
    header: 'Имя',
    enableSorting: true,
  }),
  defaultColumn({
    accessorKey: 'description',
    header: 'Описание',
    enableSorting: true,
  }),
  attributeColumn({
    accessorKey: 'attributeIds',
    header: 'Атрибуты',
    size: 700,
    minSize: 700,
    maxSize: 1000,
  }),
  actionMoreColumn(),
];

export const CONFIG_FIELDS_DOC_TYPE_CREATE: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'name',
      type: FieldTypes.Input,
      label: 'Имя*',
    },
  },
  {
    baseFieldProps: {
      name: 'description',
      type: FieldTypes.Input,
      label: 'Описание',
    },
  },
  {
    baseFieldProps: {
      name: 'attributeIds',
      type: FieldTypes.Select,
      label: 'Атрибуты',
    },
    selectFieldProps: {
      placeholder: 'Выберите значение',
      isMulti: true,
      className: 'basic-multi-select',
      classNamePrefix: 'select',
      defaultValue: [],
      options: [],
    },
  },
];

export const CONFIG_FIELDS_DOC_TYPE_EDIT: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'id',
      disabled: true,
      type: FieldTypes.Input,
      label: 'ID',
    },
  },
  ...CONFIG_FIELDS_DOC_TYPE_CREATE,
];

export const mapSubmitPayloadDocType = <NewData>(
  payload: ChangeDocumentType
): NewData => {
  return {
    name: payload.name,
    description: payload.description,
    attributeIds: payload.attributeIds,
  } as NewData;
};

export const docTypesFormSchemaValidate = z.object({
  name: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
  description: z.string(),
});

export const DIALOGS_DOCTYPE: Record<string, DialogTexts> = {
  EDIT: {
    dialogTitleText: 'Редактирование типа документа',
    dialogDescriptionText:
      "Здесь можно изменить тип документа. После внесения изменений нажмите 'сохранить'.Поля с * обязательны.",
    btnTriggerText: BUTTONS_NAMES.edit,
  },
  CREATE: {
    dialogTitleText: 'Создание типа документа',
    dialogDescriptionText:
      'Для создания типа документа необходимо заполнить поля ниже.Поля с * обязательны.',
    btnTriggerText: 'Создать тип документа',
  },
};

export const EMPTY_DOC_TYPE: CreateDocumentType = {
  name: '',
  description: '',
  attributeIds: [],
};
