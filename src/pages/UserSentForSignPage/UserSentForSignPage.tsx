import { prepareSortingState } from '@/lib';
import { documentsStore, documentTypesStore } from '@/stores';
import { DataTable2 } from '@components/DataTable2';
import { Spinner } from '@components/UI';
import { DEFAULT_PAGE_SIZE } from '@constants/defaultConstants';
import { userMenuItems } from '@constants/sideBar';
import { SORTING_STATE } from '@constants/sorting';
import {
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

const UserSentForSignPage = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
    sort: withDefault(StringParam, SORTING_STATE.without),
  });

  const {
    documentsSentForSign,
    loading,
    paginationDocumentsSentForSign,
    fetchDocumentsForSign,
  } = documentsStore;

  useEffect(() => {
    // Если query.page и query.limit не определены, устанавливаем дефолтные значения
    if (query.page === undefined || query.limit === undefined) {
      setQuery({
        page: 0,
        limit: DEFAULT_PAGE_SIZE,
      });
    } else {
      void fetchDocumentsForSign(
        query.page ?? 0,
        query.limit ?? DEFAULT_PAGE_SIZE,
        'owner',
        'before_signer',
        query.sort
      );
    }
  }, [query.limit, query.page, query.sort]);

  const { fetchDocTypesAndAttributes, isLoading } = documentTypesStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 100);
    fetchDocumentsForSign(0, DEFAULT_PAGE_SIZE, 'owner', 'before_signer');
  }, []);

  if (loading || isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  return (
    <div className="w-full p-4 flex flex-col h-[calc(100vh-130px)] overflow-y-auto">
      <section className="flex-grow flex-col overflow-auto flex py-5">
        <h1 className="self-start text-2xl md:text-4xl pb-5">
          {userMenuItems[1].title}
        </h1>
        <DataTable2
          columns={TABLE_USER_DOCUMENTS_CONFIG}
          data={documentsSentForSign}
          initialState={{
            columnVisibility: TABLE_USER_COLUMN_VISIBLE,
            page: query.page!,
            limit: query.limit!,
            sorting: prepareSortingState(query.sort),
          }}
          handlers={{
            onPaginationChange: (updater) => {
              const newSortingValue =
                updater instanceof Function
                  ? updater({
                      pageIndex: query.page ?? 0,
                      pageSize: query.limit ?? DEFAULT_PAGE_SIZE,
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
              totalPages: paginationDocumentsSentForSign?.totalPages,
            },
            actionItem: ({ row }) => {
              const to = row?.getValue('id') as string;
              return {
                onClick: () => navigate(to),
                href: `${'/app/sent-for-sign/' + to}`,
              };
            },
            isOptionsMore: () => {
              return false;
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserSentForSignPage;
