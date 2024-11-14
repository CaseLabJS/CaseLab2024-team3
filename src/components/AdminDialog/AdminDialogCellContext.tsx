import { AdminDialog } from '@components/AdminDialog/AdminDialog';
import { DIALOGS_VALUES } from '@constants/admin';
import { CellContext } from '@tanstack/react-table';
import { AdminDialogData } from 'src/types/index';

export const getAdminDialogCellContext = (
  cellContext: CellContext<AdminDialogData, unknown>
) => {
  return (
    <AdminDialog
      data={cellContext.row.original}
      dialogTexts={DIALOGS_VALUES.docAttributesEdit}
      relatedData={cellContext.table.options.meta?.relatedData}
      onSave={cellContext.table.options.meta?.onEdit}
    />
  );
};
