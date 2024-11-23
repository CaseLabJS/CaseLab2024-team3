import { cn } from '@/lib';
import { Header } from '@tanstack/react-table';

interface TableResizeProps<TData> {
  header: Header<TData, unknown>;
}

export const TableResize = <TData,>({ header }: TableResizeProps<TData>) => {
  return (
    !(header.column.columnDef.enableResizing === false) && (
      <div
        {...{
          onDoubleClick: () => header.column.resetSize(),
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: cn(
            `cursor-col-resize h-[98%] absolute touch-none select-none w-0.5 right-0 bottom-0 bg-border`,
            header.column.getIsResizing() ? 'bg-indigo-700' : ''
          ),
        }}
      />
    )
  );
};
