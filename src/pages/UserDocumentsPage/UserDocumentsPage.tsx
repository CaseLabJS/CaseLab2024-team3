import { documentsStore, documentTypesStore } from '@/stores';
import { CreateDocumentForm } from '@components/CreateDocument/CreateDocument';
import { Spinner } from '@components/UI';
import { DIALOGS_VALUES, EMPTY_DOC } from '@constants/createDocument';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const UserDocumentsPage = observer(() => {
  const { fetchDocuments, createDocument, loading } = documentsStore;
  const {
    documentTypes,
    documentAttributes,
    fetchDocTypesAndAttributes,
    isLoading,
  } = documentTypesStore;

  useEffect(() => {
    fetchDocTypesAndAttributes(0, 1000);
    fetchDocuments(0, 1000);
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] gap-4 overflow-y-auto">
      <>
        <CreateDocumentForm
          dialogTexts={DIALOGS_VALUES.docTypesCreate}
          data={EMPTY_DOC}
          onSave={createDocument}
          documentTypes={documentTypes}
          documentAttributes={documentAttributes}
        />
      </>
    </div>
  );
});

export default UserDocumentsPage;
