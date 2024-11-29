import { documentsStore, documentTypesStore } from '@/stores';
import { Spinner } from '@components/UI';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { DataTable2 } from '@components/DataTable2';
import {
  TABLE_USER_COLUMN_VISIBLE,
  TABLE_USER_DOCUMENTS_CONFIG,
} from '@constants/userDocument';
import { useNavigate } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';

const UserSentForSignPage = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });

  const { documentsSentForSign, loading, paginationDocuments, fetchDocuments } =
    documentsStore;

  useEffect(() => {
    void documentsStore.fetchDocuments(
      query.page ?? 0, //+ 1
      query.limit ?? 20
    );
  }, [query.limit, query.page]);

  const { fetchDocTypesAndAttributes, isLoading } = documentTypesStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 100);
    fetchDocuments(
      (query.page ?? 0) ,//+ 1
      query.limit ?? 20
    );
  }, []);

  if (loading || isLoading) {
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
          columns={TABLE_USER_DOCUMENTS_CONFIG}
          data={documentsSentForSign}
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
          }}
        />
      </section>
    </div>
  );
});

export default UserSentForSignPage;
