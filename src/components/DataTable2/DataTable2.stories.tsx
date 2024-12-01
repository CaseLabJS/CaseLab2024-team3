import { Meta, StoryObj } from '@storybook/react';
import { DataTable2 } from './DataTable2';
import { ColumnDef } from '@tanstack/react-table';
import {
  defaultColumn,
  idColumn,
  stateColumn,
} from '@constants/defaultTableColumns';
import { DOCUMENT_STATE } from '@constants/defaultConstants';

const meta = {
  tags: ['autodocs'],
  title: 'Component/DataTable',
  component: DataTable2,
} satisfies Meta;

export default meta;
type Story<T = void> = StoryObj<typeof meta & T>;

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: DOCUMENT_STATE.DRAFT,
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: DOCUMENT_STATE.PENDING_AUTHOR_SIGN,
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: DOCUMENT_STATE.DELETED,
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: DOCUMENT_STATE.AUTHOR_SIGNED,
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: DOCUMENT_STATE.APPROVED,
    email: 'carmella@hotmail.com',
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: Record<string, unknown>;
  email: string;
};

const columns: ColumnDef<unknown, unknown>[] = [
  idColumn(),
  defaultColumn({
    accessorKey: 'email',
    enableSorting: true,
    header: 'Email',
  }),
  defaultColumn({
    accessorKey: 'amount',
    enableSorting: true,
    header: 'amount',
  }),
  stateColumn({
    accessorKey: 'status',
    header: 'Статус',
    state: DOCUMENT_STATE,
  }),
];

export const Default: Story = {
  args: {
    columns,
    data,
    initialState: {},
  },
};
