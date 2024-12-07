import { prepareSortingState } from '@/lib/sorting';
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
import { DEFAULT_PAGE_SIZE } from '@constants/defaultConstants';
import { userMenuItems } from '@constants/sideBar';
import { SORTING_STATE } from '@constants/sorting';
import {
  deleteValidStates,
  TABLE_USER_COLUMN_VISIBLE,
  TABLE_USER_DOCUMENTS_CONFIG,
} from '@constants/userDocument';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';

const UserDocumentsPage = observer(() => {
  const navigate = useNavigate();
  const [{ limit, page, sort }, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    limit: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
    sort: withDefault(StringParam, SORTING_STATE.without),
  });

  const {
    documents,
    loading,
    paginationDocuments,
    deleteDocument,
    fetchDocuments,
    fetchDocumentsForSign,
    createDocument,
    signDocumentById,
    sendForSignDocumentById,
  } = documentsStore;

  useEffect(() => {
    // Если query.page и query.limit не определены, устанавливаем дефолтные значения
    if (page === undefined || limit === undefined) {
      setQuery({
        page: 0,
        limit: DEFAULT_PAGE_SIZE,
      });
    } else {
      void documentsStore.fetchDocuments(
        page ?? 0,
        limit ?? DEFAULT_PAGE_SIZE,
        'owner',
        sort
      );
    }
  }, [limit, page, sort, setQuery]);

  const {
    documentTypes,
    documentAttributes,
    fetchDocTypesAndAttributes,
    isLoading,
  } = documentTypesStore;

  const { user, users, fetchUsers } = usersStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 100);
    fetchDocuments(page ?? 0, limit ?? DEFAULT_PAGE_SIZE);
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
    fetchDocuments(page ?? 0, limit ?? DEFAULT_PAGE_SIZE, 'owner', sort);
  };

  const onSignByAuthor = async (id: number, status: DocumentState) => {
    if (status === DocumentState.DRAFT) {
      if (user?.id) {
        await documentsStore.sendForSignDocumentById(id, user.id);
      }
    }

    await signDocumentById(id, DocumentState.APPROVED);
    await fetchDocuments(page ?? 0, limit ?? DEFAULT_PAGE_SIZE, 'owner', sort);
  };

  const onSendForSign = async (documentId: number, userId: string) => {
    await sendForSignDocumentById(documentId, userId);
    fetchDocumentsForSign(0, 20, 'owner', 'before_signer');
  };

  return (
    <div className="w-full p-4 flex flex-col h-layout overflow-y-auto">
      <section className="flex-grow flex-col overflow-auto flex py-5">
        <h1 className="self-start text-2xl md:text-4xl pb-5">
          {userMenuItems[0].title}
        </h1>
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
            page,
            limit,
            sorting: prepareSortingState(sort),
          }}
          handlers={{
            onPaginationChange: (updater) => {
              const newSortingValue =
                updater instanceof Function
                  ? updater({
                      pageIndex: page ?? 0,
                      pageSize: limit ?? DEFAULT_PAGE_SIZE,
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
                href: `/app/${to}`,
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
                  onSendForSign={onSendForSign}
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
            isOptionsMore: ({ row }) => {
              const state = row?.getValue('state');
              return (
                deleteValidStates.includes(state as DocumentState) ||
                state === DocumentState.DRAFT ||
                state === DocumentState.PENDING_AUTHOR_SIGN ||
                state === DocumentState.AUTHOR_SIGNED
              );
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserDocumentsPage;
