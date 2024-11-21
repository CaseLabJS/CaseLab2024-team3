import { format, isValid, parseISO } from 'date-fns';
interface DocumentDateProps {
  date: number | string;
}

export const DocumentDate: React.FC<DocumentDateProps> = ({ date }) => {
  const newDate =
    typeof date === 'number' ? new Date(date * 1000).toISOString() : date;

  return (
    <p className="text-xs italic text-gray-500">
      Создан{' '}
      {isValid(parseISO(newDate)) &&
        format(parseISO(newDate), 'dd.MM.yyyy | H:mm')}
    </p>
  );
};
