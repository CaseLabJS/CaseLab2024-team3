import { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { FieldTypes } from '@components/UI/Form/types';

import { ActionDelete as ActionDeleteTemplate } from './ActionDelete';
import { ActionEdit as ActionEditTemplate } from './ActionEdit';
// import { ActionMore as ActionMoreTemplate } from './ActionMore';
import { ActionSendForSign as ActionSendForSignTemplate } from './ActionSendForSign';
import { DocumentState } from '@/types/state';
import { ActionSign as ActionSignTemplate } from './ActionSign';
import { ActionSignByAuthor as ActionSignByAuthorTemplate } from './ActionSignByAuthor';

const meta = {
  tags: ['autodocs'],
  title: 'Component/Action',
} satisfies Meta;

export default meta;
type Story<T = void> = StoryObj<typeof meta & T>;

const formSchemaValidate = z.object({
  documentName: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
});

const mapSubmitPayloadUserEdit = <NewData,>(payload: unknown): NewData => {
  return {
    payload,
  } as NewData;
};

const DIALOGS = {
  EDIT: {
    dialogTitleText: 'Редактирование документа',
    dialogDescriptionText:
      'Здесь можно изменить документ. После внесения изменений нажмите "Сохранить".',
    btnTriggerText: 'Редактировать',
  },
};

const CONFIG_FIELDS = [
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

export const ActionDelete: Story<typeof ActionDeleteTemplate> = {
  render: ActionDeleteTemplate,
  args: {
    onDeleteWithStringId: async (id) => {
      console.log(id);
      return Promise.resolve();
    },
    onDeleteWithNumberId: async (id) => {
      console.log(id);
      return Promise.resolve();
    },
    data: {
      id: 1,
    } as { id: string | number },
  },
};

export const ActionEdit: Story<typeof ActionEditTemplate> = {
  render: ActionEditTemplate,
  args: {
    formSchemaValidate: formSchemaValidate,
    onUpdate: async (...args) => {
      console.log(...args);
      return Promise.resolve();
    },
    data: {
      id: '1',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      patronymic: 'patronymic',
      login: 'login',
      password: 'password',
      roles: ['USER', 'ADMIN'],
    },
    mapSubmitPayload: mapSubmitPayloadUserEdit,
    dialogTexts: DIALOGS.EDIT,
    configFields: CONFIG_FIELDS,
  },
};

export const ActionSign: Story<typeof ActionSignTemplate> = {
  render: ActionSignTemplate,
  args: {
    onSign: async (...args) => {
      console.log(...args);
      return Promise.resolve();
    },
    data: {
      id: 1,
    },
    action_text: 'Подписать',
    action_color: 'bg-green-600 hover:bg-green-600',
    description: 'Вы собираетесь подписать этот документ.',
    status: DocumentState.APPROVED,
  },
};

export const ActionSignByAuthor: Story<typeof ActionSignByAuthorTemplate> = {
  render: (args) => <ActionSignByAuthorTemplate {...args} />,
  args: {
    onSignByAuthor: async (...args) => {
      console.log(...args);
      return Promise.resolve();
    },
    data: {
      id: 1,
      state: DocumentState.DRAFT,
    },
  },
};

export const ActionSendForSign: Story<typeof ActionSendForSignTemplate> = {
  render: (args) => <ActionSendForSignTemplate {...args} />,
  args: {
    onSendForSign: async (id: number, userId: string) => {
      console.log(id, userId);
      return Promise.resolve();
    },
    data: {
      id: 1,
      state: DocumentState.AUTHOR_SIGNED,
    },
    currentUser: {
      id: 'user-123',
      email: 'john1',
      firstName: 'John111',
      lastName: 'Doe',
      login: 'johndoe',
      password: 'password123',
      roles: [],
      patronymic: 'Ivanovich',
    },
    users: [
      {
        id: 'user-1',
        email: 'john2',
        firstName: 'John222',
        lastName: 'Doe',
        login: 'johndoe',
        roles: [],
        patronymic: 'Ivanovich',
      },
      {
        id: 'user-2',
        email: 'john3',
        firstName: 'John333',
        lastName: 'Doe',
        login: 'johndoe',
        roles: [],
        patronymic: 'Ivanovich',
      },
      {
        id: 'user-3',
        email: 'john4',
        firstName: 'John4444',
        lastName: 'Doe',
        login: 'johndoe',
        roles: [],
        patronymic: 'Ivanovich',
      },
    ],
  },
};

// export const ActionMore: Story<typeof ActionMoreTemplate> = {
//   render: ActionMoreTemplate,
//   args: {
//     row: {
//       original: {
//         id: 1,
//       },
//     },
//     table: {
//       options: {
//         meta: {
//           actionMore: {
//             onEdit: (props) => (
//               <ActionDeleteTemplate
//                 onDelete={async (id) => {
//                   console.log(id);
//                   return Promise.resolve();
//                 }}
//                 {...props}
//               />
//             ),
//           },
//         },
//       },
//     },
//   },
// };
