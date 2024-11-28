import { documentsStore } from '@/stores';
import { Spinner } from '@components/UI';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActionSign } from '@components/Action';
import { DataTable2 } from '@components/DataTable2';
import { PenTool, X, NotebookPen } from 'lucide-react';
import {
  TABLE_USER_COLUMN_VISIBLE,
  TABLE_SENT_FOR_USER_DOCUMENTS_CONFIG,
} from '@constants/sentForUserDocument';
import { useNavigate } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';
import { DocumentState } from '@/types/state';


const UserAwaitingSignPage = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });
  
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    documentsForSign,
    loading,
    paginationDocumentsForSign,
    signDocumentById,
  } = documentsStore;

  useEffect(() => {
    void documentsStore.fetchDocumentsForSign(
      (query.page ?? 0),
      query.limit ?? 20
    );
  }, [query.limit, query.page]);

  if (loading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] overflow-y-auto">
      <section className="flex-grow overflow-auto flex py-5">
        <DataTable2
          columns={TABLE_SENT_FOR_USER_DOCUMENTS_CONFIG}
          data={documentsForSign}
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
              totalPages: paginationDocumentsForSign?.totalPages,
            },
            actionItem: ({ row }) => {
              const to = row?.getValue('id') as string;
              return {
                onClick: () => navigate(to),
                href: `${"/app/awaiting-sign/" + to}`,
              };
            },
            actionMore: {
              onSign: (props) => (
                <ActionSign
                  onSign={signDocumentById}
                  action_text={'Подписать'}
                  action_color={'bg-green-600 hover:bg-green-600'}
                  description={'Вы собираетесь подписать этот документ.'}
                  status={DocumentState.APPROVED}
                  {...props}>
                  <PenTool />
                </ActionSign>
              ),
              onReject: (props) => (
                <ActionSign
                  onSign={signDocumentById}
                  action_text={'Отклонить'}
                  action_color={'bg-orange-600 hover:bg-orange-600'}
                  description={'Вы собираетесь отклонить этот документ.'}
                  status={DocumentState.REJECTED}
                  {...props}>
                    <X />
                </ActionSign>
              ),onReworkRequired: (props) => (
                <ActionSign
                  onSign={signDocumentById}
                  action_text={'Требуется доработка'}
                  action_color={'bg-orange-600 hover:bg-orange-600'}
                  description={'Вы собираетесь отправить на доработку этот документ.'}
                  status={DocumentState.REWORK_REQUIRED}
                  {...props}>
                    <NotebookPen />
                </ActionSign>
              ),
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserAwaitingSignPage;
