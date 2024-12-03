import { Badge } from '@components/UI';
import { CellContext } from '@tanstack/react-table';
import { ChangeDocumentType } from 'src/types/index';

export const AttributeCell = <T, Value>(cellContext: CellContext<T, Value>) => {
  const value = cellContext.getValue() as number[] | null;

  const docTypes = cellContext.table.options.meta
    ?.relatedData as ChangeDocumentType[];

  const docTypesNames = docTypes
    ?.filter((docType) => (value ? value : []).includes(docType.id))
    .map((docType) => docType.name);

  return (
    <>
      {docTypesNames?.map((name) => (
        <Badge key={name} variant="outline" className="m-1">
          {name}
        </Badge>
      ))}
    </>
  );
};
