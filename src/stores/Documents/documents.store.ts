import { makeAutoObservable, runInAction } from 'mobx';
import ApiDocumentController from '@api/ApiDocumentController';
import {
  CreateDocument,
  ChangeDocument,
  CreateDocumentResponse,
} from 'src/types';

class DocumentsStore {
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

  async fetchDocumentById(id: number) {
    this._loading = true;
    try {
      const response = await ApiDocumentController.getDocumentById(id);
      runInAction(() => {
        this._document = response.data;
        this._error = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this._error = error.message;
        });
      } else {
        runInAction(() => {
          this._error = 'An unknown error occurred';
        });
      }
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  async fetchDocuments(page?: number, size?: number) {
    this._loading = true;
    try {
      const response = await ApiDocumentController.getDocuments(page, size);
      runInAction(() => {
        this._documents = response.data.content;
        this._error = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this._error = error.message;
        });
      } else {
        runInAction(() => {
          this._error = 'An unknown error occurred';
        });
      }
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  async createDocument(document: CreateDocument) {
    this._loading = true;
    try {
      const response = await ApiDocumentController.createDocument(document);
      runInAction(() => {
        this._documents.push(response.data);
        this._error = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this._error = error.message;
        });
      } else {
        runInAction(() => {
          this._error = 'An unknown error occurred';
        });
      }
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  async updateDocument(id: number, document: ChangeDocument) {
    this._loading = true;
    try {
      const response = await ApiDocumentController.updateDocumentById(
        id,
        document
      );
      runInAction(() => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documents[index] = {
            ...this._documents[index],
            ...response.data,
          };
        }
        this._error = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this._error = error.message;
        });
      } else {
        runInAction(() => {
          this._error = 'An unknown error occurred';
        });
      }
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }

  async deleteDocument(id: number) {
    this._loading = true;
    try {
      await ApiDocumentController.deleteDocumentById(id);
      runInAction(() => {
        const index = this._documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documents.splice(index, 1);
        }
        this._error = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        runInAction(() => {
          this._error = error.message;
        });
      } else {
        runInAction(() => {
          this._error = 'An unknown error occurred';
        });
      }
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }
}

export default new DocumentsStore();
