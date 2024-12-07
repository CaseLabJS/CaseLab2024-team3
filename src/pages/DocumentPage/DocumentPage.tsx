import {
  documentsStore,
  documentTypesStore,
  usersStore,
  votingStore,
} from '@/stores';
import { observer } from 'mobx-react-lite';
import { FC, Key, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, DocumentDate } from './ui';
import { Button, Input, Label, Spinner } from '@components/UI';
import { Cross1Icon, DownloadIcon } from '@radix-ui/react-icons';
import { DIALOGS_VALUES } from '@constants/updateDocument';
import { UpdateDocumentForm } from '@components/UpdateDocument/UpdateDocument';
import { DocumentState } from '@/types/state';
import { UserSelectDialog } from '@components/UserSelectDialog/UserSelectDialog';
import { Voting } from 'src/types';
import { ActionDelete } from '@components/Action';
import { deleteValidStates } from '@constants/userDocument';

interface DocumentPageProps {
  type: string;
}

const DocumentPage: FC<DocumentPageProps> = observer(({ type }) => {
  const navigate = useNavigate();
  const { documentId } = useParams();

  const {
    document,
    documents,
    fetchDocumentById,
    fetchDocumentForSign,
    fetchDocumentsForSign,
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
    if (type === 'user-document' || type === 'sent-for-sign') {
      (async () => {
        await fetchDocumentById(Number(documentId));
        await fetchUsers(0, 100);
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
    fetchAttributes(0, 100);
  }, []);

  if (loading || isLoading) {
    return (
      <section className="flex justify-center items-center flex-grow">
        <Spinner />
      </section>
    );
  }

  const handleSignDocument = async (status: DocumentState) => {
    await signDocumentById(+documentId!, status);
    fetchDocumentsForSign(0, 10, 'signer', 'after_signer');
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
    fetchDocumentsForSign(0, 20, 'owner', 'before_signer');
  };

  const handleSendToVoters = async (data: Voting) => {
    await createVoting(data);
    await fetchDocumentById(+documentId!);
    fetchDocumentsForSign(0, 20, 'owner', 'before_signer');
  };

  return (
    document &&
    documentId !== 'undefined' && (
      <div className="p-4 flex w-full justify-center overflow-y-auto">
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
              document.attributeValues.map(
                (
                  attributeId: {
                    attributeId: number;
                    value: string | number | readonly string[] | undefined;
                  },
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label>
                      {
                        attributes.find(
                          (attribute) =>
                            attribute.id === attributeId.attributeId
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
                )
              )}
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
            {type === 'user-document' &&
              deleteValidStates.includes(document.state) &&
              (() => {
                const doc = documents.find((doc) => doc.id === +documentId!);
                return (
                  <ActionDelete
                    variant="destructive"
                    onDeleteWithNumberId={deleteDocument}
                    data={doc}
                  />
                );
              })()}
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
            className="absolute top-2 -right-8 bg-transparent border"
            onClick={() => {
              if (type === 'user-document') {
                navigate('../documents');
              } else if (type === 'sent-for-sign') {
                navigate('../sent-for-sign');
              } else if (type == 'after-sign') {
                navigate('../after-sign');
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
