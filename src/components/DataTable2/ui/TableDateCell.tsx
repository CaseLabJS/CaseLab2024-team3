import { CellContext } from '@tanstack/react-table';
import { format, isValid, parseISO } from 'date-fns';

export const TableDateCell = <T, Value>(cellContext: CellContext<T, Value>) => {
  const value = cellContext.getValue() as string;
  const newDate =
    typeof value === 'number' ? new Date(value * 1000).toISOString() : value;

  return (
    value && (
      <p className="text-nowrap">
        {isValid(parseISO(newDate)) &&
          format(parseISO(newDate), 'dd.MM.yyyy | H:mm:ss')}
      </p>
    )
  );
};
