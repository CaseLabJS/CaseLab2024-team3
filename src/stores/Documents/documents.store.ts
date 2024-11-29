import { toast } from '@/hooks/use-toast';
import ApiAttributeController from '@api/ApiAttributeController';
import ApiDocumentController from '@api/ApiDocumentController';
import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { TOASTS } from '@constants/toast';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangeAttribute,
  ChangeDocument,
  CreateDocument,
  CreateDocumentResponse,
  DocumentState,
  GetDocument,
  Initiator,
  Pagination,
} from 'src/types';
import { DocumentsStoreProps } from './types';

export class DocumentsStore implements DocumentsStoreProps {
  private _pagination_documents: Pagination | null = null;
  private _document: CreateDocumentResponse | null = null;
  private _documents: GetDocument[] = [];

  private _pagination_documentsForSign: Pagination | null = null;
  private _documentsForSign: GetDocument[] = [];

  private _pagination_documentsAfterSign: Pagination | null = null;
  private _documentsAfterSign: GetDocument[] = [];

  private _loading: boolean = false;
  private _error: string | null = null;

  private _attributes: ChangeAttribute[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get paginationDocuments() {
    return this._pagination_documents;
  }

  get paginationDocumentsForSign() {
    return this._pagination_documentsForSign;
  }

  get paginationDocumentsAfterSign() {
    return this._pagination_documentsAfterSign;
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

  get documentsAfterSign() {
    return this._documentsAfterSign;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get attributes() {
    return this._attributes;
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

  fetchDocumentById = (documentId: number) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentById(documentId),
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

        if (initiator === 'owner') {
          this._documents = [...content];
          this._pagination_documents = res;
        } else {
          this._documentsForSign = [...content];
          this._pagination_documentsForSign = res;
        }
      }
    );
  };

  createDocument = (document: CreateDocument) => {
    return this._responseHandler(
      () => ApiDocumentController.createDocument(document),
      ({ data }) => {
        const newDoc = { ...data, id: data.documentId } as GetDocument;

        this._documents = [...this._documents, newDoc];
        toast(TOASTS.SUCCESS_CREATE_DOCUMENT);
      }
    );
  };

  updateDocument = (id: number, document: ChangeDocument) => {
    return this._responseHandler(
      () => ApiDocumentController.updateDocumentById(id, document),
      ({ data }) => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          const newDoc = { ...data, id: data.documentId } as GetDocument;
          this._documents[index] = newDoc;
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

  fetchDocumentForSign = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentForSign(id),
      (response) => {
        this._document = response.data;
      }
    );
  };

  fetchDocumentsForSign = (
    page?: number,
    size?: number,
    type: 'before_signer' | 'after_signer' = 'before_signer'
  ) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentsForSign(page, size, type),
      (response) => {
        const { content, ...res } = response.data;

        if (type === 'before_signer') {
          this._documentsForSign = [...content];
          this._pagination_documentsForSign = res;
        } else {
          this._documentsAfterSign = [...content];
          this._pagination_documentsAfterSign = res;
        }
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

  async downloadDocument(url: string) {
    return this._responseHandler(
      () => ApiDocumentController.downloadDocument(url),
      (response) => {
        const link = document.createElement('a');
        link.href = response.data.link;
        link.target = '_blank';
        link.click();
      }
    );
  }

  async fetchAttributes(page?: number, size?: number) {
    return this._responseHandler(
      () => ApiAttributeController.getAttributes(page, size),
      (response) => {
        this._attributes = [...response.data.content];
      }
    );
  }
}

export default new DocumentsStore();
