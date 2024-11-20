import { format, isValid, parseISO } from 'date-fns';

interface DocumentDateProps {
  date: string;
}

export const DocumentDate: React.FC<DocumentDateProps> = ({ date }) => {
  return (
    <p className="text-xs italic text-gray-500">
      Создан{' '}
      {isValid(parseISO(date)) && format(parseISO(date), 'dd.MM.yyyy | H:mm')}
    </p>
  );
};
