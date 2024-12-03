import { Badge } from '@components/UI';
import { CellContext } from '@tanstack/react-table';
import { ChangeAttribute } from 'src/types/index';

export const DocTypesCell = <T, Value>(cellContext: CellContext<T, Value>) => {
  const value = cellContext.getValue() as number[] | null;

  const attributes = cellContext.table.options.meta
    ?.relatedData as ChangeAttribute[];

  const attributeNames = attributes
    ?.filter((attr) => (value ? value : []).includes(attr.id))
    .map((attr) => attr.name);

  return (
    <>
      {attributeNames?.map((name) => (
        <Badge key={name} variant="outline" className="m-1">
          {name}
        </Badge>
      ))}
    </>
  );
};
