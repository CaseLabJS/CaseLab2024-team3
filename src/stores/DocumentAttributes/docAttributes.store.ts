import { toast } from '@/hooks/use-toast';
import { DocAttributesStoreProps } from '@/stores/DocumentAttributes/types';
import ApiAttributeController from '@api/ApiAttributeController';
import ApiDocumentTypeController from '@api/ApiDocumentTypeController';
import { UNKNOWN_ERROR_MESSAGE } from '@constants/errorMessage';
import { TOASTS } from '@constants/toast';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateAttribute,
} from 'src/types';

export class DocAttributesStore implements DocAttributesStoreProps {
  private _documentAttributes: ChangeAttribute[] = [];
  private _documentTypes: ChangeDocumentType[] = [];

  private _isLoading = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get documentAttributes() {
    return this._documentAttributes;
  }

  get documentTypes() {
    return this._documentTypes;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  private async responseHandler<T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) {
    this._isLoading = true;

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
        toast({ description: this._error });
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  fetchDocTypesAndAttributes = async (
    page?: number,
    size?: number,
    sizeForAttributes = 1000
  ) => {
    return this.responseHandler(
      () =>
        Promise.all([
          ApiAttributeController.getAttributes(0, sizeForAttributes),
          ApiDocumentTypeController.getDocumentTypes(page, size),
        ]),
      ([responseAttributes, responseTypes]) => {
        this._documentTypes = responseTypes.data.content;
        this._documentAttributes = responseAttributes.data.content;
      }
    );
  };

  private _updateDocumentTypesWithAttribute = (
    docAttributeId: number,
    docTypesIds: number[] | undefined
  ) => {
    this._documentTypes.forEach((docType) => {
      if (docTypesIds?.includes(docType.id)) {
        docType.attributeIds?.push(docAttributeId);
      }
      if (
        docTypesIds?.includes(docAttributeId) &&
        !docTypesIds?.includes(docType.id) &&
        docType.attributeIds
      ) {
        docType.attributeIds = docType.attributeIds.filter(
          (currAttributeId) => currAttributeId !== docAttributeId
        );
      }
    });
  };

  createAttribute = (data: Partial<CreateAttribute>) => {
    return this.responseHandler(
      () => ApiAttributeController.createAttribute(data),
      (response) => {
        this._documentAttributes = [...this._documentAttributes, response.data];

        if (response.data.documentTypeIds) {
          this._updateDocumentTypesWithAttribute(
            response.data.id,
            response.data.documentTypeIds
          );
        }
        toast(TOASTS.SUCCESS_CREATE_ATTRIBUTE);
      }
    );
  };

  updateAttribute = (data: CreateAttribute, id: number) => {
    return this.responseHandler(
      () => ApiAttributeController.updateAttributeById(id, data),
      (response) => {
        const index = this._documentAttributes.findIndex(
          (attr) => attr.id === id
        );
        if (index !== -1) {
          this._documentAttributes[index] = response.data;
        }
        if (data.documentTypeIds) {
          this._updateDocumentTypesWithAttribute(
            response.data.id,
            data.documentTypeIds
          );
        }
      }
    );
  };

  deleteAttribute = (id: number) => {
    return this.responseHandler(
      () => ApiAttributeController.deleteAttributeById(id),
      () => {
        this._documentAttributes = this._documentAttributes.filter(
          (attr) => attr.id !== id
        );
        toast(TOASTS.SUCCESS_DELETE_ATTRIBUTE);
      }
    );
  };
}

export default new DocAttributesStore();
