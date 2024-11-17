import { makeAutoObservable, runInAction } from 'mobx';
import ApiDocumentController from '@api/ApiDocumentController';
import {
  CreateDocument,
  ChangeDocument,
  CreateDocumentResponse,
  DocumentSign,
  Pagination,
} from 'src/types';
import { DocumentsStoreProps } from './types';
import { toast } from '@/hooks/use-toast';
import {
  UNKNOWN_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { AxiosError } from 'axios';
import { TOASTS } from '@constants/toast';

class DocumentsStore implements DocumentsStoreProps {
  private _pagination: Pagination | null = null;
  private _document: CreateDocumentResponse | null = null;
  private _documents: CreateDocumentResponse[] = [];

  private _documentsForSign: DocumentSign[] = [];
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

  async fetchDocumentById(id: number) {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentById(id),
      (response) => {
        this._document = response.data;
      }
    );
  }

  async fetchDocuments(page?: number, size?: number) {
    return this._responseHandler(
      () => ApiDocumentController.getDocuments(page, size),
      (response) => {
        const { content, ...res } = response.data;
        this._documents = [...content];
        this._pagination = res;
      }
    );
  }

  async createDocument(document: CreateDocument) {
    return this._responseHandler(
      () => ApiDocumentController.createDocument(document),
      (response) => {
        this._documents = [...this._documents, response.data];
        toast(TOASTS.SUCCESS_CREATE_DOCUMENT);
      }
    );
  }

  async updateDocument(id: number, document: ChangeDocument) {
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
  }

  async deleteDocument(id: number) {
    return this._responseHandler(
      () => ApiDocumentController.deleteDocumentById(id),
      () => {
        this._documents = this._documents.filter((doc) => doc.id !== id);
        toast(TOASTS.SUCCESS_DELETE_DOCUMENT);
      }
    );
  }

  fetchDocumentsForSign = async () => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentsForSign(),
      (response) => {
        this._documentsForSign = response.data.content;
      }
    );
  };
}

export default new DocumentsStore();
