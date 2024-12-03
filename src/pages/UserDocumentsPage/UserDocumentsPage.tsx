import { documentsStore, documentTypesStore, usersStore } from '@/stores';
import { DocumentState } from '@/types/state';
import {
  ActionDelete,
  ActionSendForSign,
  ActionSignByAuthor,
} from '@components/Action';
import { CreateDocumentForm } from '@components/CreateDocument/CreateDocument';
import { DataTable2 } from '@components/DataTable2';
import { Spinner } from '@components/UI';
import { DIALOGS_VALUES, EMPTY_DOC } from '@constants/createDocument';
import { userMenuItems } from '@constants/sideBar';
import {
  TABLE_USER_COLUMN_VISIBLE,
  TABLE_USER_DOCUMENTS_CONFIG,
} from '@constants/userDocument';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';

const UserDocumentsPage = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });

  const {
    documents,
    loading,
    paginationDocuments,
    deleteDocument,
    fetchDocuments,
    createDocument,
    signDocumentById,
    sendForSignDocumentById,
  } = documentsStore;

  useEffect(() => {
    void documentsStore.fetchDocuments(query.page ?? 0, query.limit ?? 20);
  }, [query.limit, query.page]);

  const {
    documentTypes,
    documentAttributes,
    fetchDocTypesAndAttributes,
    isLoading,
  } = documentTypesStore;

  const { user, users, fetchUsers } = usersStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 100);
    fetchDocuments(query.page ?? 0, query.limit ?? 20);
    fetchUsers(0, 100);
  }, []);

  if (loading || isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const refreshTableData = () => {
    documentsStore.fetchDocuments();
  };

  const onSignByAuthor = async (id: number, status: DocumentState) => {
    if (status === DocumentState.DRAFT) {
      if (user?.id) {
        await documentsStore.sendForSignDocumentById(id, user.id);
      }
    }

    await signDocumentById(id, DocumentState.APPROVED);
    await fetchDocuments(query.page ?? 0, query.limit ?? 20);
  };

  return (
    <div className="w-full p-4 flex items-center flex-col h-layout overflow-y-auto">
      <section className="flex-grow flex-col overflow-auto flex py-5">
        <h1 className="self-start text-4xl pb-5">{userMenuItems[0].title}</h1>
        <div className="self-start pb-5">
          <CreateDocumentForm
            dialogTexts={DIALOGS_VALUES.docTypesCreate}
            data={EMPTY_DOC}
            onSave={createDocument}
            documentTypes={documentTypes}
            documentAttributes={documentAttributes}
            updateTableData={refreshTableData}
          />
        </div>
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
                <ActionDelete
                  onDeleteWithNumberId={deleteDocument}
                  {...props}
                />
              ),
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserDocumentsPage;
