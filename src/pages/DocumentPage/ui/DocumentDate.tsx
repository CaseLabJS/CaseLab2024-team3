import { CreateDocumentResponse } from '@/types/index';
import { format, isValid, parseISO } from 'date-fns';
interface DocumentDateProps {
  latestDate: number | string;
  documentVersions: CreateDocumentResponse[];
}

export const DocumentDate: React.FC<DocumentDateProps> = ({
  latestDate,
  documentVersions,
}) => {
  const docVersionsDates = documentVersions.map((version) => version.createdAt);
  const initDate = docVersionsDates[docVersionsDates.length - 1];

  const initVersionDate =
    initDate && typeof initDate === 'number'
      ? new Date(initDate * 1000).toISOString()
      : initDate && initDate;

  const newDate =
    typeof latestDate === 'number'
      ? new Date(latestDate * 1000).toISOString()
      : latestDate;

  return (
    <p className="text-xs text-gray-500">
      <strong>
        Создан {'   '}
        {initDate &&
          isValid(parseISO(initVersionDate as string)) &&
          format(parseISO(initVersionDate as string), 'dd.MM.yyyy | H:mm')}{' '}
      </strong>

      {documentVersions && documentVersions?.length > 1 && (
        <span className="italic">
          (Изменен{' '}
          {isValid(parseISO(newDate)) &&
            format(parseISO(newDate), 'dd.MM.yyyy | H:mm')}
          )
        </span>
      )}
    </p>
  );
};
