import { makeAutoObservable, runInAction } from 'mobx';
import ApiDocumentTypeController from '@api/ApiDocumentTypeController';
import { ChangeDocumentType, CreateDocumentType } from 'src/types';
import { DocumentTypesStoreProps } from './types';

export class DocumentTypesStore implements DocumentTypesStoreProps {
  private _documentTypes: ChangeDocumentType[] = [];
  private _documentType: ChangeDocumentType | null = null;

  private _isLoading = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get documentTypes() {
    return this._documentTypes;
  }

  get documentType() {
    return this._documentType;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  private async responseHandler<T>(action: () => Promise<T>, onSuccess: (data: T) => void) {
    this._isLoading = true;
    
    try {
      const result = await action();
      runInAction(() => {
        onSuccess(result);
        this._error = null;
      });
    } catch (error) {
      runInAction(() => {
        this._error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  fetchDocumentTypes(page?: number, size?: number) {
    return this.responseHandler(
      () => ApiDocumentTypeController.getDocumentTypes(page, size),
      (response) => {
        this._documentTypes = response.data.content;
      }
    );
  }

  createDocumentType(data: CreateDocumentType) {
    return this.responseHandler(
      () => ApiDocumentTypeController.createDocumentType(data),
      (response) => {
        this._documentTypes.push(response.data);
      }
    );
  }

  fetchDocumentTypeById(id: number) {
    return this.responseHandler(
      () => ApiDocumentTypeController.getDocumentTypeById(id),
      (response) => {
        this._documentType = response.data;
      }
    );
  }

  updateDocumentType(id: number, data: CreateDocumentType) {
    return this.responseHandler(
      () => ApiDocumentTypeController.updateDocumentTypeById(id, data),
      (response) => {
        const index = this._documentTypes.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documentTypes[index] = response.data;
        }
      }
    );
  }

  deleteDocumentType(id: number) {
    return this.responseHandler(
      () => ApiDocumentTypeController.deleteDocumentTypeById(id),
      () => {
        this._documentTypes = this._documentTypes.filter((doc) => doc.id !== id);
      }
    );
  }
}

export default new DocumentTypesStore();
