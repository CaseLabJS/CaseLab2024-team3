import { AdminAlertDialog } from '@components/AdminAlertDialog/AdminAlertDialog';
import { DIALOGS_VALUES } from '@constants/adminDocTypes';
import { CellContext } from '@tanstack/react-table';
import { ChangeDocumentType } from 'src/types/index';

export const getAdminAlertDialogCellContext = (
  cellContext: CellContext<ChangeDocumentType, unknown>
) => {
  return (
    <AdminAlertDialog
      data={cellContext.row.original}
      dialogTexts={DIALOGS_VALUES.docTypesEdit}
      onDelete={cellContext.table.options.meta?.onDelete}
      id={cellContext.row.original.id}
    />
  );
};
