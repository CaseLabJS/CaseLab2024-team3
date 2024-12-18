import {
  ChangeDocument,
  DialogTexts,
  DocumentState,
  GetDocument,
} from '@/types';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { BUTTONS_NAMES, DOCUMENT_STATE } from './defaultConstants';
import {
  actionMoreColumn,
  defaultColumn,
  idColumn,
  stateColumn,
  timeColumn,
} from './defaultTableColumns';

const CONTENT_URL = 'contentUrl';

export const TABLE_USER_DOCUMENTS_CONFIG: ColumnDef<GetDocument>[] = [
  idColumn(),
  defaultColumn({
    accessorKey: 'documentName',
    enableSorting: true,
    header: 'Название документа',
  }),
  defaultColumn({
    accessorKey: 'author',
    header: 'Автор',
    enableSorting: true,
  }),
  stateColumn({
    accessorKey: 'state',
    header: 'Статус',
    state: DOCUMENT_STATE,
  }),
  defaultColumn({ accessorKey: CONTENT_URL, header: 'КонтентURL' }),
  timeColumn({
    accessorKey: 'createdAt',
    enableSorting: true,
    header: 'Создан',
  }),
  actionMoreColumn(),
];

export const TABLE_USER_DOCUMENTS_COLUMN_VISIBLE = {
  [CONTENT_URL]: false,
};

export const TABLE_USER_COLUMN_VISIBLE = {
  [CONTENT_URL]: false,
};

export const CONFIG_FIELDS_USER_EDIT: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'id',
      disabled: true,
      type: FieldTypes.Input,
      label: 'ID',
    },
  },
  {
    baseFieldProps: {
      name: 'documentName',
      type: FieldTypes.Input,
      label: 'Название документа',
    },
  },
];

export const mapSubmitPayloadUserEdit = <NewData>(
  payload: ChangeDocument
): NewData => {
  return {
    name: payload.name,
  } as NewData;
};

export const formSchemaValidate = z.object({
  documentName: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
});

export const DIALOGS_USER: Record<string, DialogTexts> = {
  EDIT: {
    dialogTitleText: 'Редактирование документа',
    dialogDescriptionText:
      'Здесь можно изменить документ. После внесения изменений нажмите "Сохранить". Поля с * обязательны.',
    btnTriggerText: BUTTONS_NAMES.edit,
  },
};

// статусы для документов, которые можно удалять
export const deleteValidStates: DocumentState[] = [
  DocumentState.DRAFT,
  DocumentState.APPROVED,
  DocumentState.REJECTED,
  DocumentState.REWORK_REQUIRED,
];
