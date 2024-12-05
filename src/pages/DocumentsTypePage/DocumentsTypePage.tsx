import { documentTypesStore } from '@/stores';
import { ActionDefaultData, ActionDelete } from '@components/Action';
import { ActionEditDocTypes } from '@components/Action/ActionEditDocTypes';
import { DataTable2 } from '@components/DataTable2';
import { ButtonProps, Spinner } from '@components/UI';
import { FormSwitcherProps } from '@components/UI/Form/types';

import {
  CONFIG_FIELDS_DOC_TYPE_CREATE,
  CONFIG_FIELDS_DOC_TYPE_EDIT,
  DIALOGS_DOCTYPE,
  docTypesFormSchemaValidate,
  EMPTY_DOC_TYPE,
  mapSubmitPayloadDocType,
  TABLE_DOCUMENT_TYPES_CONFIG,
} from '@constants/adminDocumentType';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { ChangeDocumentType } from 'src/types/index';
import { NumberParam, useQueryParams } from 'use-query-params';

interface DocumentsTypePageProps {
  type: string;
}

const DocumentsTypePage: FC<DocumentsTypePageProps> = observer(() => {
  const [{ page, limit }, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });

  const {
    documentAttributes,
    documentTypes,
    fetchDocTypesAndAttributes,
    createDocumentType,
    deleteDocumentType,
    updateDocumentType,
    isLoading,
    pagination,
  } = documentTypesStore;

  useEffect(() => {
    // Если query.page и query.limit не определены, устанавливаем дефолтные значения
    if (page === undefined || limit === undefined) {
      setQuery({
        page: 0,
        limit: 20,
      });
    } else {
      void fetchDocTypesAndAttributes(page ?? 0, limit ?? 20);
    }
  }, [fetchDocTypesAndAttributes, page, limit]);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const options = documentAttributes.map((attr) => ({
    value: attr.name,
    label: attr.name,
  }));

  const attributesNamesWithIds = documentAttributes.reduce(
    (acc: Record<string, string>, attr) => {
      acc[attr.id] = attr.name;
      return acc;
    },
    {}
  );

  const fillOutConfigFIelds = (config: FormSwitcherProps[]) => {
    return config.map((conf) => ({
      ...conf,
      selectFieldProps: conf.selectFieldProps
        ? {
            ...conf.selectFieldProps,
            options,
          }
        : undefined,
    }));
  };

  const createProps: ButtonProps & ActionDefaultData<ChangeDocumentType> = {
    data: { ...EMPTY_DOC_TYPE, id: 0 },
    variant: 'outline',
    className: 'max-w-fit',
  };

  return (
    <div className="w-full p-10 flex flex-col h-layout overflow-y-auto">
      <section className="flex-grow flex-col gap-4 overflow-auto flex py-5">
        <ActionEditDocTypes
          onCreate={createDocumentType}
          mapSubmitPayload={mapSubmitPayloadDocType}
          dialogTexts={DIALOGS_DOCTYPE.CREATE}
          relatedData={attributesNamesWithIds}
          configFields={fillOutConfigFIelds(CONFIG_FIELDS_DOC_TYPE_CREATE)}
          formSchemaValidate={docTypesFormSchemaValidate}
          {...createProps}
        />

        <DataTable2
          columns={TABLE_DOCUMENT_TYPES_CONFIG}
          data={documentTypes}
          initialState={{
            page: page!,
            limit: limit!,
          }}
          handlers={{
            onPaginationChange: (updater) => {
              const newSortingValue =
                updater instanceof Function
                  ? updater({
                      pageIndex: page ?? 0,
                      pageSize: limit ?? 20,
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
            actionMore: {
              onEdit: (props) => (
                <ActionEditDocTypes
                  onUpdate={updateDocumentType}
                  mapSubmitPayload={mapSubmitPayloadDocType}
                  dialogTexts={DIALOGS_DOCTYPE.EDIT}
                  relatedData={attributesNamesWithIds}
                  configFields={fillOutConfigFIelds(
                    CONFIG_FIELDS_DOC_TYPE_EDIT
                  )}
                  {...props}
                />
              ),
              onDelete: (props) => (
                <ActionDelete
                  onDeleteWithNumberId={deleteDocumentType}
                  {...props}
                />
              ),
            },
            relatedData: documentAttributes,
          }}
        />
      </section>
    </div>
  );
});

export default DocumentsTypePage;
