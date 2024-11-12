import { docAttributesStore } from '@/stores/DocumentAttributes';
import { AdminDialog } from '@components/AdminDialog/AdminDialog';
import { DataTable } from '@components/DataTable/DataTable';
import { Spinner } from '@components/UI';
import {
  ATTRIBUTES_TABLE_COLUMNS,
  DIALOGS_VALUES,
  EMPTY_DOC_ATTRIBUTE,
} from '@constants/admin';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const DocAttributesAdminPage = observer(() => {
  const {
    fetchDocTypesAndAttributes,
    createAttribute,
    deleteAttribute,
    updateAttribute,
    documentAttributes,
    documentTypes,
    isLoading,
  } = docAttributesStore;

  useEffect(() => {
    void fetchDocTypesAndAttributes(0, 1000);
  }, [fetchDocTypesAndAttributes]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] gap-4 overflow-y-auto">
      {documentAttributes && documentAttributes.length > 0 ? (
        <>
          <AdminDialog
            dialogTexts={DIALOGS_VALUES.docAttributesCreate}
            data={EMPTY_DOC_ATTRIBUTE}
            onSave={createAttribute}
            relatedData={documentTypes}
          />
          <div>
            <DataTable
              columns={ATTRIBUTES_TABLE_COLUMNS}
              data={documentAttributes}
              relatedData={documentTypes}
              onDelete={deleteAttribute}
              onEdit={updateAttribute}
            />
          </div>
        </>
      ) : (
        <div className="flex align-center w-full h-full">
          Данные пока не заполнены.
        </div>
      )}
    </div>
  );
});

export default DocAttributesAdminPage;
