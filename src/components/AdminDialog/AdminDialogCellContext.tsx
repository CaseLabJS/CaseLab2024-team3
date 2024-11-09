import { AdminDialog } from '@components/AdminDialog/AdminDialog';
import { DIALOGS_VALUES } from '@constants/adminDocTypes';
import { CellContext } from '@tanstack/react-table';
import { ChangeDocumentType } from 'src/types/index';

export const getAdminDialogCellContext = (
  cellContext: CellContext<ChangeDocumentType, unknown>
) => {
  return (
    <AdminDialog
      data={cellContext.row.original}
      dialogTexts={DIALOGS_VALUES.docTypesEdit}
      relatedData={cellContext.table.options.meta?.relatedData}
      onSave={cellContext.table.options.meta?.onEdit}
    />
  );
};
