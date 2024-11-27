import {
  documentsStore,
  documentTypesStore,
  usersStore,
  votingStore,
} from '@/stores';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, DocumentDate } from './ui';
import { Button, Input, Label, Spinner } from '@components/UI';
import { Cross1Icon, DownloadIcon } from '@radix-ui/react-icons';
import { DIALOGS_VALUES } from '@constants/updateDocument';
import { UpdateDocumentForm } from '@components/UpdateDocument/UpdateDocument';
import { DocumentState } from '@/types/state';
import { UserSelectDialog } from '@components/UserSelectDialog/UserSelectDialog';
import { Voting } from 'src/types';

interface DocumentPageProps {
  type: string;
}

const DocumentPage: FC<DocumentPageProps> = observer(({ type }) => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const {
    document,
    fetchDocumentById,
    fetchDocumentForSign,
    signDocumentById,
    sendForSignDocumentById,
    downloadDocument,
    updateDocument,
    deleteDocument,
    attributes,
    fetchAttributes,
    loading,
  } = documentsStore;

  const { documentTypes, isLoading } = documentTypesStore;

  const { user, users, fetchUsers } = usersStore;

  const { createVoting, votingResult, getVotingResult } = votingStore;

  useEffect(() => {
    if (type === 'user-document') {
      (async () => {
        await fetchDocumentById(Number(documentId));
        await fetchUsers(0, 1000);
        {
          /* Т.к. результаты голосования есть только у документов со статусом "IN_VOTING,
          надо сначала дождаться загрузки документа, а затем проверить его статус */
        }
        const newDoc = documentsStore.document;
        if (newDoc?.state === DocumentState.IN_VOTING) {
          getVotingResult(Number(documentId));
        }
      })();
    } else {
      fetchDocumentForSign(Number(documentId));
    }
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
    deleteDocument(+documentId!);
    navigate('../documents');
  };

  const handleSignDocument = (status: DocumentState) => {
    signDocumentById(+documentId!, status);
    navigate('../awaiting-sign');
  };

  const handleSignDocumentByAuthor = async (status: DocumentState) => {
    if (user?.id) {
      await sendForSignDocumentById(+documentId!, user?.id);
      await signDocumentById(+documentId!, status);
      await fetchDocumentById(+documentId!);
    }
  };

  const handleSendToUser = async (userId: string) => {
    await sendForSignDocumentById(+documentId!, userId);
    await fetchDocumentById(+documentId!);
  };

  const handleSendToVoters = async (data: Voting) => {
    await createVoting(data);
    await fetchDocumentById(+documentId!);
  };

  return (
    document &&
    documentId !== 'undefined' && (
      <div className="p-4 flex flex-col h-layout overflow-y-auto">
        <div className="relative p-4 pr-6">
          {document.state === DocumentState.IN_VOTING && votingResult ? (
            <Badge state={document.state} votingResult={votingResult} />
          ) : (
            <Badge state={document.state} />
          )}
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
            {type === 'user-document' && (
              <UpdateDocumentForm
                dialogTexts={DIALOGS_VALUES.docTypesCreate}
                data={document}
                onSave={updateDocument}
                documentTypes={documentTypes}
                documentAttributes={attributes}
                onSetInputs={fetchDocumentById}
              />
            )}
            {type === 'user-document' && (
              <Button variant="destructive" onClick={handleOnDelete}>
                Удалить
              </Button>
            )}
            {type === 'user-document' &&
              document.state === DocumentState.DRAFT && (
                <Button
                  className="bg-green-600 hover:opacity-75 hover:bg-green-600"
                  variant="destructive"
                  onClick={() =>
                    handleSignDocumentByAuthor(DocumentState.APPROVED)
                  }
                >
                  Подписать
                </Button>
              )}
            {type === 'user-document' &&
              document.state === DocumentState.AUTHOR_SIGNED && (
                <UserSelectDialog
                  process="signing"
                  currentUser={user}
                  users={users}
                  dialogTitle="Отправка на подпись"
                  dialogDescription="Выберите пользователя, которому хотите отправить документ на подпись."
                  triggerButtonText="Отправить на подписание"
                  onConfirmSigning={handleSendToUser}
                />
              )}
            {type === 'user-document' &&
              document.state === DocumentState.DRAFT && (
                <UserSelectDialog
                  process="voting"
                  currentUser={user}
                  users={users}
                  dialogTitle="Отправка на голосование"
                  dialogDescription="Выберите пользователей, которым хотите отправить документ на голосование."
                  triggerButtonText="Отправить на голосование"
                  onConfirmVoting={handleSendToVoters}
                  getVotingResult={getVotingResult}
                />
              )}
            {type === 'awaiting-sign' && (
              <Button
                className="bg-green-600 hover:opacity-75 hover:bg-green-600"
                variant="destructive"
                onClick={() => handleSignDocument(DocumentState.APPROVED)}
              >
                Подписать
              </Button>
            )}
            {type === 'awaiting-sign' && (
              <Button
                className="bg-red-600 hover:opacity-75 hover:bg-red-600"
                variant="destructive"
                onClick={() => handleSignDocument(DocumentState.REJECTED)}
              >
                Отклонить
              </Button>
            )}
            {type === 'awaiting-sign' &&
              document.state !== DocumentState.IN_VOTING && (
                <Button
                  className="bg-orange-600 hover:opacity-75 hover:bg-orange-600"
                  variant="destructive"
                  onClick={() =>
                    handleSignDocument(DocumentState.REWORK_REQUIRED)
                  }
                >
                  Отправить на доработку
                </Button>
              )}
          </div>
          <Button
            className="absolute top-2 -right-4 bg-transparent border"
            onClick={() => {
              if (type === 'user-document') {
                navigate('../documents');
              } else {
                navigate('../awaiting-sign');
              }
            }}
          >
            <Cross1Icon className="text-foreground" />
          </Button>
        </div>
      </div>
    )
  );
});

export default DocumentPage;
