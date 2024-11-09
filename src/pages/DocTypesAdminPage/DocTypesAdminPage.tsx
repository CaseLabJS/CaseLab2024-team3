import { documentTypesStore } from '@/stores';
import { AdminDialog } from '@components/AdminDialog/AdminDialog';
import { DataTable } from '@components/DataTable/DataTable';
import { Spinner } from '@components/UI';
import {
  DIALOGS_VALUES,
  EMPTY_DOC_TYPE,
  TYPES_TABLE_COLUMNS,
} from '@constants/adminDocTypes';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const DocTypesAdminPage = observer(() => {
  const {
    documentAttributes,
    documentTypes,
    fetchDocTypesAndAttributes,
    createDocumentType,
    deleteDocumentType,
    updateDocumentType,
    isLoading,
  } = documentTypesStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] gap-4 overflow-y-auto">
      {documentTypes && documentTypes.length > 0 ? (
        <>
          <AdminDialog
            dialogTexts={DIALOGS_VALUES.docTypesCreate}
            data={EMPTY_DOC_TYPE}
            onSave={createDocumentType}
            relatedData={documentAttributes}
          />
          <div>
            <DataTable
              columns={TYPES_TABLE_COLUMNS}
              data={documentTypes}
              onDelete={deleteDocumentType}
              relatedData={documentAttributes}
              onEdit={updateDocumentType}
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

export default DocTypesAdminPage;
