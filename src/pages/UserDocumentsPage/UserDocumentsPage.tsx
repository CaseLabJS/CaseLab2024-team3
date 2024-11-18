import { documentsStore, documentTypesStore } from '@/stores';
import { CreateDocumentForm } from '@components/CreateDocument/CreateDocument';
import { Spinner } from '@components/UI';
import { DIALOGS_VALUES, EMPTY_DOC } from '@constants/createDocument';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActionDelete, ActionEdit } from '@components/Action';
import { DataTable2 } from '@components/DataTable2';
import {
  CONFIG_FIELDS_USER_EDIT,
  DIALOGS_USER,
  formSchemaValidate,
  mapSubmitPayloadUserEdit,
  TABLE_USER_COLUMN_VISIBLE,
  TABLE_USER_DOCUMENTS_CONFIG,
} from '@constants/userDocument';
import { useNavigate } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';

const UserDocumentsPage = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });
  

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    documents,
    loading,
    pagination,
    deleteDocument,
    updateDocument,
    fetchDocuments,
    createDocument,
  } = documentsStore;

  useEffect(() => {
    void documentsStore.fetchDocuments(
      (query.page ?? 0) ,//+ 1
      query.limit ?? 20
    );
  }, [query.limit, query.page]);

  const {
    documentTypes,
    documentAttributes,
    fetchDocTypesAndAttributes,
    isLoading,
  } = documentTypesStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 1000);
    fetchDocuments(0, 1000);
  }, []);

  if (loading || isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const refreshTableData = () => {
    documentsStore.fetchDocuments()
  };

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] overflow-y-auto">
      <div>
        <CreateDocumentForm
          dialogTexts={DIALOGS_VALUES.docTypesCreate}
          data={EMPTY_DOC}
          onSave={createDocument}
          documentTypes={documentTypes}
          documentAttributes={documentAttributes}
          updateTableData={refreshTableData}
        />
      </div>
      <section className="flex-grow overflow-auto flex py-5">
        <DataTable2
          columns={TABLE_USER_DOCUMENTS_CONFIG}
          data={documents}
          initialState={{
            columnVisibility: TABLE_USER_COLUMN_VISIBLE,
            page: query.page!,
            limit: query.limit!,
          }}
          handlers={{
            onPaginationChange: (updater) => {
              const newSortingValue =
                updater instanceof Function
                  ? updater({
                      pageIndex: query.page ?? 0,
                      pageSize: query.limit ?? 20,
                    })
                  : updater;
              setQuery({
                page: newSortingValue.pageIndex,
                limit: newSortingValue.pageSize,
              });
            },
          }}
          meta={{
            pagination: {
              totalPages: pagination?.totalPages,
            },
            actionItem: ({ row }) => {
              const to = row?.getValue('id') as string;
              return {
                onClick: () => navigate(to),
                href: `${to}`,
              };
            },
            actionMore: {
              onEdit: (props) => (
                <ActionEdit
                  formSchemaValidate={formSchemaValidate}
                  onUpdate={updateDocument}
                  mapSubmitPayload={mapSubmitPayloadUserEdit}
                  dialogTexts={DIALOGS_USER.EDIT}
                  configFields={CONFIG_FIELDS_USER_EDIT}
                  {...props}
                />
              ),
              onDelete: (props) => (
                <ActionDelete onDelete={deleteDocument} {...props} />
              ),
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserDocumentsPage;
