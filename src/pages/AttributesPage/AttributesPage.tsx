import { attributesStore } from '@/stores';
import { ActionDefaultData, ActionDelete } from '@components/Action';
import { ActionEditAttributes } from '@components/Action/ActionEditAttributes';
import { DataTable2 } from '@components/DataTable2';
import { ButtonProps, Spinner } from '@components/UI';
import { FormSwitcherProps } from '@components/UI/Form/types';
import {
  CONFIG_FIELDS_ATTRIBUTES_CREATE,
  CONFIG_FIELDS_ATTRIBUTES_EDIT,
  DIALOGS_ATTRIBUTES,
  EMPTY_DOC_ATTRIBUTE,
  attributesFormSchemaValidate,
  mapSubmitPayloadAttributes,
  TABLE_ATTRIBUTES_CONFIG,
} from '@constants/adminAttributes';
import { adminMenuItems } from '@constants/sideBar';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { ChangeAttribute } from 'src/types/index';
import { NumberParam, useQueryParams } from 'use-query-params';

interface AttributesPageProps {
  type: string;
}

const AttributesPage: FC<AttributesPageProps> = observer(() => {
  const [{ page, limit }, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });

  const {
    attributes,
    documentTypes,
    fetchDocTypesAndAttributes,
    createAttribute,
    deleteAttribute,
    updateAttribute,
    loading,
    pagination,
  } = attributesStore;

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

  if (loading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const options = documentTypes.map((docTypes) => ({
    value: docTypes.name,
    label: docTypes.name,
  }));

  const documentTypesWithIds = documentTypes.reduce(
    (acc: Record<string, string>, docTypes) => {
      acc[docTypes.id] = docTypes.name;
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

  const createProps: ButtonProps & ActionDefaultData<ChangeAttribute> = {
    data: { ...EMPTY_DOC_ATTRIBUTE, id: 0 },
    variant: 'outline',
    className: 'max-w-fit',
  };

  return (
    <div className="w-full p-4 flex flex-col h-layout overflow-y-auto">
      <section className="flex-grow flex-col gap-4 overflow-auto flex py-5">
        <h1 className="self-start text-2xl md:text-4xl">
          {adminMenuItems[2].title}
        </h1>

        <ActionEditAttributes
          onCreate={createAttribute}
          mapSubmitPayload={mapSubmitPayloadAttributes}
          dialogTexts={DIALOGS_ATTRIBUTES.CREATE}
          relatedData={documentTypesWithIds}
          configFields={fillOutConfigFIelds(CONFIG_FIELDS_ATTRIBUTES_CREATE)}
          formSchemaValidate={attributesFormSchemaValidate}
          {...createProps}
        />

        <DataTable2
          columns={TABLE_ATTRIBUTES_CONFIG}
          data={attributes}
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
                <ActionEditAttributes
                  onUpdate={updateAttribute}
                  mapSubmitPayload={mapSubmitPayloadAttributes}
                  dialogTexts={DIALOGS_ATTRIBUTES.EDIT}
                  relatedData={documentTypesWithIds}
                  configFields={fillOutConfigFIelds(
                    CONFIG_FIELDS_ATTRIBUTES_EDIT
                  )}
                  {...props}
                />
              ),
              onDelete: (props) => (
                <ActionDelete
                  onDeleteWithNumberId={deleteAttribute}
                  {...props}
                />
              ),
            },
            relatedData: documentTypes,
          }}
        />
      </section>
    </div>
  );
});

export default AttributesPage;
