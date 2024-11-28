import { documentsStore } from '@/stores';
import { Spinner } from '@components/UI';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { DataTable2 } from '@components/DataTable2';
import { TABLE_USER_COLUMN_VISIBLE } from '@constants/userDocument';
import { useNavigate } from 'react-router-dom';
import { NumberParam, useQueryParams } from 'use-query-params';
import { TABLE_SENT_FOR_USER_DOCUMENTS_CONFIG } from '@constants/sentForUserDocument';

const UserSignedDocuments = observer(() => {
  const navigate = useNavigate();
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    documentsAfterSign,
    loading,
    paginationDocumentsAfterSign,
    fetchDocumentsForSign,
  } = documentsStore;

  useEffect(() => {
    void fetchDocumentsForSign(
      query.page ?? 0,
      query.limit ?? 20,
      'after_signer'
    );
  }, [query.limit, query.page]);

  useEffect(() => {
    fetchDocumentsForSign(0, 100, 'after_signer');
  }, []);

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
          data={documentsAfterSign}
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
              totalPages: paginationDocumentsAfterSign?.totalPages,
            },
            actionItem: ({ row }) => {
              const to = row?.getValue('id') as string;
              return {
                onClick: () => navigate(to),
                href: `${"/app/after-sign/" + to}`,
              };
            },
          }}
        />
      </section>
    </div>
  );
});

export default UserSignedDocuments;
