import { documentsStore, documentTypesStore, usersStore } from '@/stores';
import { CreateDocumentForm } from '@components/CreateDocument/CreateDocument';
import { Spinner } from '@components/UI';
import { DIALOGS_VALUES, EMPTY_DOC } from '@constants/createDocument';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActionDelete, ActionEdit, ActionSendForSign, ActionSignByAuthor } from '@components/Action';
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
import { DocumentState } from '@/types/state';

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
    paginationDocuments,
    deleteDocument,
    updateDocument,
    fetchDocuments,
    createDocument,
    signDocumentById,
    sendForSignDocumentById,
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

  const {
    user,
    users,
    fetchUsers,
  } = usersStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 1000);
    fetchDocuments(0, 1000);
    fetchUsers(0, 1000);
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

  const onSignByAuthor = async (id: number, status: DocumentState) => {
    if (status === DocumentState.DRAFT) {
      if (user?.id){
        await documentsStore.sendForSignDocumentById(id, user.id);
      }
    }

    await signDocumentById(id, DocumentState.APPROVED);
    await fetchDocuments(
      (query.page ?? 0),
      query.limit ?? 20
    )
  };

  return (
    <div className="w-full p-10 flex flex-col h-layout overflow-y-auto">
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
              totalPages: paginationDocuments?.totalPages,
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
              onSignByAuthor: (props) => (
                <ActionSignByAuthor
                  onSignByAuthor={onSignByAuthor}
                  {...props}
                />
              ),
              onSendForSign: (props) => (
                <ActionSendForSign
                  onSendForSign={sendForSignDocumentById}
                  currentUser={user}
                  users={users}
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
