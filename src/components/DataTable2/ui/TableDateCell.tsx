import { CellContext } from '@tanstack/react-table';
import { format, isValid, parseISO } from 'date-fns';

export const TableDateCell = <T, Value>(cellContext: CellContext<T, Value>) => {
  const value = cellContext.getValue() as string;
  return (
    value && (
      <p className="text-nowrap">
        {isValid(parseISO(value)) &&
          format(parseISO(value), 'dd.MM.yyyy | H:mm:ss')}
      </p>
    )
  );
};
