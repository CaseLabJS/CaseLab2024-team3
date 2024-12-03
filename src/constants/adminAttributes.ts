import { ChangeAttribute, CreateAttribute, DialogTexts } from '@/types';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { ColumnDef } from '@tanstack/react-table';
import { BUTTONS_NAMES } from './defaultConstants';
import {
  actionMoreColumn,
  defaultColumn,
  DocTypeColumn,
  idColumn,
} from './defaultTableColumns';
import { z } from 'zod';

export const TABLE_ATTRIBUTES_CONFIG: ColumnDef<ChangeAttribute>[] = [
  idColumn(),
  defaultColumn({
    accessorKey: 'name',
    header: 'Имя',
    enableSorting: true,
  }),
  defaultColumn({
    accessorKey: 'dataType',
    header: 'Тип данных',
    enableSorting: true,
  }),
  DocTypeColumn({
    accessorKey: 'documentTypeIds',
    header: 'Связанные типы документов',
    size: 700,
    minSize: 700,
    maxSize: 1000,
  }),
  defaultColumn({
    accessorKey: 'required',
    header: 'Обязательный',
    minSize: 100,
    maxSize: 200,
    cell: (props) => {
      return props.getValue() ? 'да' : 'нет';
    },
  }),
  actionMoreColumn(),
];

export const CONFIG_FIELDS_ATTRIBUTES_CREATE: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'name',
      type: FieldTypes.Input,
      label: 'Имя',
    },
  },
  {
    baseFieldProps: {
      name: 'dataType',
      type: FieldTypes.Input,
      label: 'Тип данных',
    },
  },
  {
    baseFieldProps: {
      name: 'documentTypeIds',
      type: FieldTypes.Select,
      label: 'Связанные типы документов',
    },
    selectFieldProps: {
      placeholder: 'Выберите значение',
      isMulti: true,
      className: 'basic-multi-select pt-2',
      classNamePrefix: 'select',
      defaultValue: [],
      options: [],
    },
  },
  {
    baseFieldProps: {
      name: 'required',
      type: FieldTypes.Checkbox,
      label: 'Обязательный',
    },
    checkboxFieldProps: {
      checked: true,
      onChange: () => {},
    },
  },
];

export const CONFIG_FIELDS_ATTRIBUTES_EDIT: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'id',
      disabled: true,
      type: FieldTypes.Input,
      label: 'ID',
    },
  },
  ...CONFIG_FIELDS_ATTRIBUTES_CREATE,
];

export const mapSubmitPayloadAttributes = <NewData>(
  payload: ChangeAttribute
): NewData => {
  return {
    name: payload.name,
    dataType: payload.dataType,
    documentTypeIds: payload.documentTypeIds,
    required: payload.required,
  } as NewData;
};

export const attributesFormSchemaValidate = z.object({
  name: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
  dataType: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
});

export const DIALOGS_ATTRIBUTES: Record<string, DialogTexts> = {
  EDIT: {
    dialogTitleText: 'Редактирование атрибута документа',
    dialogDescriptionText:
      "Здесь можно изменить атрибута документа. После внесения изменений нажмите 'сохранить'.",
    btnTriggerText: BUTTONS_NAMES.edit,
  },
  CREATE: {
    dialogTitleText: 'Создание атрибута документа',
    dialogDescriptionText:
      'Для создания атрибута документа необходимо заполнить поля ниже.',
    btnTriggerText: 'Создать атрибут документа',
  },
};

export const EMPTY_DOC_ATTRIBUTE: CreateAttribute = {
  name: '',
  dataType: '',
  documentTypeIds: [],
  required: true,
};
