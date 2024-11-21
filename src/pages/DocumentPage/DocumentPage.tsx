import { documentsStore, documentTypesStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, DocumentDate } from './ui';
import { Button, Input, Label, Spinner } from '@components/UI';
import { Cross1Icon, DownloadIcon } from '@radix-ui/react-icons';
import { DIALOGS_VALUES } from '@constants/updateDocument';
import { UpdateDocumentForm } from '@components/UpdateDocument/UpdateDocument';

const DocumentPage = observer(() => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const {
    document,
    fetchDocumentById,
    downloadDocument,
    updateDocument,
    deleteDocument,
    attributes,
    fetchAttributes,
    loading,
  } = documentsStore;

  const { documentTypes, isLoading } = documentTypesStore;

  useEffect(() => {
    fetchDocumentById(Number(documentId));
    fetchAttributes(0, 1000);
  }, []);

  if (loading || isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const handleOnDelete = () => {
    deleteDocument(+documentId);
    navigate('../documents');
  };

  return (
    document &&
    documentId !== 'undefined' && (
      <div className="p-4 flex flex-col h-[calc(100vh-130px)] overflow-y-auto">
        <div className="relative p-4 pr-6">
          <Badge state={document.state} />
          <h1 className="mb-1 text-4xl">
            {document.documentName}
            <span className="text-lg text-gray-500">
              {' '}
              (ID {document.documentId})
            </span>
          </h1>
          {document.createdAt && <DocumentDate date={document.createdAt} />}
          <div className="grid gap-4 py-4">
            {document.attributeValues &&
              document.attributeValues.map((attributeId, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label>
                    {
                      attributes.find(
                        (attribute) => attribute.id === attributeId.attributeId
                      )?.name
                    }
                    :
                  </Label>
                  <Input
                    name={`attribute-${attributeId.attributeId}`}
                    value={attributeId.value}
                    className="col-span-3 disabled:opacity-100"
                    disabled
                  ></Input>
                </div>
              ))}
          </div>
          <div className="flex justify-between flex-wrap gap-2">
            <Button onClick={() => downloadDocument(document.contentUrl)}>
              <DownloadIcon />
              Скачать
            </Button>
            <UpdateDocumentForm
              dialogTexts={DIALOGS_VALUES.docTypesCreate}
              data={document}
              onSave={updateDocument}
              documentTypes={documentTypes}
              documentAttributes={attributes}
              onSetInputs={fetchDocumentById}
            />
            <Button variant="destructive" onClick={handleOnDelete}>
              Удалить
            </Button>
          </div>
          <Button
            className="absolute top-2 -right-4 bg-transparent border"
            onClick={() => navigate('../documents')}
          >
            <Cross1Icon className="text-black" />
          </Button>
        </div>
      </div>
    )
  );
});

export default DocumentPage;
