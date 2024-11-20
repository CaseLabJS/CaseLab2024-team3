import { toast } from '@/hooks/use-toast';
import ApiDocumentController from '@api/ApiDocumentController';
import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { TOASTS } from '@constants/toast';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangeDocument,
  CreateDocument,
  DocumentState,
  GetDocument,
  Initiator,
  Pagination,
} from 'src/types';
import { DocumentsStoreProps } from './types';

class DocumentsStore implements DocumentsStoreProps {
  private _pagination: Pagination | null = null;
  private _document: GetDocument | null = null;
  private _documents: GetDocument[] = [];

  private _documentsForSign: GetDocument[] = [];
  private _loading: boolean = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get pagination() {
    return this._pagination;
  }

  get document() {
    return this._document;
  }

  get documents() {
    return this._documents;
  }

  get documentsForSign() {
    return this._documentsForSign;
  }

  get documentsSentForSign() {
    return this._documents.filter(
      (doc) =>
        doc.state === DocumentState.PENDING_CONTRACTOR_SIGN ||
        doc.state === DocumentState.PENDING_AUTHOR_SIGN
    );
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  private async _responseHandler<T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) {
    this._loading = true;

    try {
      const result = await action();
      runInAction(() => {
        onSuccess(result);
        this._error = null;
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof AxiosError) {
          this._error = error.response?.data as string;
        } else if (error instanceof Error) {
          this._error = error.message;
        } else {
          this._error = UNKNOWN_ERROR_MESSAGE;
        }
        console.error(this._error);
        toast({
          title: 'Ошибка',
          description: this._error || NETWORK_ERROR_MESSAGE,
          variant: 'destructive',
        });
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  fetchDocumentById = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentById(id),
      (response) => {
        this._document = response.data;
      }
    );
  };

  fetchDocuments = (
    page?: number,
    size?: number,
    initiator: Initiator = 'owner'
  ) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocuments(page, size, initiator),
      (response) => {
        const { content, ...res } = response.data;
        this._pagination = res;

        if (initiator === 'owner') {
          this._documents = [...content];
        } else {
          this._documentsForSign = [...content];
        }
      }
    );
  };

  createDocument = (document: CreateDocument) => {
    return this._responseHandler(
      () => ApiDocumentController.createDocument(document),
      (response) => {
        this._documents = [...this._documents, response.data];
        toast(TOASTS.SUCCESS_CREATE_DOCUMENT);
      }
    );
  };

  updateDocument = (id: number, document: ChangeDocument) => {
    return this._responseHandler(
      () => ApiDocumentController.updateDocumentById(id, document),
      (response) => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documents[index] = response.data;
        }
        toast(TOASTS.SUCCESS_UPDATE_DOCUMENT);
      }
    );
  };

  deleteDocument = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentController.deleteDocumentById(id),
      () => {
        this._documents = this._documents.filter((doc) => doc.id !== id);
        toast(TOASTS.SUCCESS_DELETE_DOCUMENT);
      }
    );
  };

  fetchDocumentsForSign = () => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentsForSign(),
      (response) => {
        this._documentsForSign = response.data.content;
      }
    );
  };

  signDocumentById = (id: number, status: DocumentState) => {
    return this._responseHandler(
      () => ApiDocumentController.signDocumentById(id, status),
      () => {
        const index = this._documentsForSign.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documentsForSign[index].state = status;
        }
        toast(TOASTS.SUCCESS_SIGN_DOCUMENT);
      }
    );
  };

  sendForSignDocumentById = (id: number, userId: string) => {
    return this._responseHandler(
      () => ApiDocumentController.sendForSignDocumentById(id, userId),
      (response) => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documents[index].state = response.data.status;
        }
        toast(TOASTS.SUCCESS_SEND_FOR_SIGN_DOCUMENT);
      }
    );
  };
}

export default new DocumentsStore();
