import { makeAutoObservable, runInAction } from 'mobx';
import ApiDocumentController from '@api/ApiDocumentController';
import {
  CreateDocument,
  ChangeDocument,
  CreateDocumentResponse,
} from 'src/types';
import { DocumentsStoreProps } from './types';

class DocumentsStore implements DocumentsStoreProps {
  private _document: CreateDocumentResponse | null = null;
  private _documents: CreateDocumentResponse[] = [];
  private _loading: boolean = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get document() {
    return this._document;
  }

  get documents() {
    return this._documents;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  private async responseHandler<T>(
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
        this._error =
          error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  async fetchDocumentById(id: number) {
    return this.responseHandler(
      () => ApiDocumentController.getDocumentById(id),
      (response) => {
        this._document = response.data;
      }
    );
  }

  async fetchDocuments(page?: number, size?: number) {
    return this.responseHandler(
      () => ApiDocumentController.getDocuments(page, size),
      (response) => {
        this._documents = response.data.content;
      }
    );
  }

  async createDocument(document: CreateDocument) {
    return this.responseHandler(
      () => ApiDocumentController.createDocument(document),
      (response) => {
        this._documents.push(response.data);
      }
    );
  }

  async updateDocument(id: number, document: ChangeDocument) {
    return this.responseHandler(
      () => ApiDocumentController.updateDocumentById(id, document),
      (response) => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documents[index] = response.data;
        }
      }
    );
  }

  async deleteDocument(id: number) {
    return this.responseHandler(
      () => ApiDocumentController.deleteDocumentById(id),
      () => {
        this._documents = this._documents.filter((doc) => doc.id !== id);
      }
    );
  }
}

export default new DocumentsStore();
