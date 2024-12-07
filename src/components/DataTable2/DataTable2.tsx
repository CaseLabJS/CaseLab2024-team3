import { cn } from '@/lib';
import { Table as TableComp } from '@components/UI';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  InitialTableState as InitialTableStateLib,
  OnChangeFn,
  PaginationState,
  SortingState,
  Table,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { SORTING_STATE } from '@constants/sorting';
import { StringParam, useQueryParams } from 'use-query-params';
import { TableBody, TableFooter, TableHeader } from './ui';
import { DEFAULT_PAGE_SIZE } from '@constants/defaultConstants';
import { useLocation } from 'react-router-dom';

type InitialTableState = Omit<InitialTableStateLib, 'pagination'> & {
  page?: PaginationState['pageIndex'];
  limit?: PaginationState['pageSize'];
};

interface DataTable2Props<TData, TValue>
  extends Partial<Omit<Table<TData>, 'initialState'>> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: unknown;
  meta?: TableMeta<TData> | undefined;
  className?: string;
  initialState?: InitialTableState;
  handlers?: {
    onPaginationChange: OnChangeFn<PaginationState>;
  };
}

export const DataTable2 = observer(
  <TData, TValue>({
    data,
    columns,
    meta,
    className,
    initialState: _initialState,
    handlers,
  }: DataTable2Props<TData, TValue>) => {
    const { page, limit, ...initialState } = _initialState as InitialTableState;
    const [columnSizing, setColumnSizing] = useState(
      initialState?.columnSizing ?? {}
    );
    const [columnVisibility, setColumnVisibility] = useState(
      initialState?.columnVisibility ?? {}
    );
    const [sorting, setSorting] = useState<SortingState>(
      initialState?.sorting ?? []
    );
    const pagination = {
      pageIndex: page ?? 0,
      pageSize: limit ?? DEFAULT_PAGE_SIZE,
    };
    const [, setQuery] = useQueryParams({
      sort: StringParam,
    });
    const { pathname } = useLocation();
    const isClientSideSort = ['admin'].some((str) => pathname.includes(str));

    const table = useReactTable({
      data,
      columns,
      meta,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onSortingChange: setSorting,
      onColumnSizingChange: setColumnSizing,
      autoResetPageIndex: false,
      columnResizeMode: 'onChange',
      manualSorting: isClientSideSort ? false : true,
      state: {
        sorting,
        columnSizing,
        columnPinning: {
          right: ['actionMore'],
        },
        ...initialState,
        columnVisibility: columnVisibility,
        pagination,
      },
      ...handlers,
    });

    useEffect(() => {
      if (sorting.length) {
        const key = `${sorting[0].id}${sorting[0].desc ? 'Desc' : 'Asc'}`;
        const sort = SORTING_STATE[key as keyof typeof SORTING_STATE];

        setQuery({
          sort,
        });
      } else {
        setQuery({ sort: SORTING_STATE.without });
      }
    }, [setQuery, sorting]);

    return (
      <div
        className={cn('overflow-auto flex flex-col flex-grow gap-4', className)}
      >
        <TableComp className="rounded-md mb-3">
          <TableHeader table={table} />
          <TableBody table={table} />
        </TableComp>
        <TableFooter table={table} />
      </div>
    );
  }
);
