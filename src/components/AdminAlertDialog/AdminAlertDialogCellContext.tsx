import { AdminAlertDialog } from '@components/AdminAlertDialog/AdminAlertDialog';
import { DIALOGS_VALUES } from '@constants/admin';
import { CellContext } from '@tanstack/react-table';
import { AdminDialogData } from 'src/types/index';

export const getAdminAlertDialogCellContext = (
  cellContext: CellContext<AdminDialogData, unknown>
) => {
  return (
    <AdminAlertDialog
      data={cellContext.row.original}
      dialogTexts={DIALOGS_VALUES.docTypesEdit}
      onDelete={cellContext.table.options.meta?.onDelete ?? (() => {})}
      id={
        'id' in cellContext.row.original
          ? cellContext.row.original.id
          : undefined
      }
    />
  );
};
