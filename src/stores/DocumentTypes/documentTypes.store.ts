import { toast } from '@/hooks/use-toast';
import ApiAttributeController from '@api/ApiAttributeController';
import ApiDocumentTypeController from '@api/ApiDocumentTypeController';
import { UNKNOWN_ERROR_MESSAGE } from '@constants/errorMessage';
import { TOASTS } from '@constants/toast';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateDocumentType,
} from 'src/types';
import { DocumentTypesStoreProps } from './types';

export class DocumentTypesStore implements DocumentTypesStoreProps {
  private _documentTypes: ChangeDocumentType[] = [];
  private _documentAttributes: ChangeAttribute[] = [];
  private _documentType: ChangeDocumentType | null = null;

  private _isLoading = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get documentTypes() {
    return this._documentTypes;
  }

  get documentAttributes() {
    return this._documentAttributes;
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

  private _responseHandler = async <T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) => {
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
        console.error(this._error);
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  };

  fetchDocTypesAndAttributes = (
    page?: number,
    size?: number,
    sizeForAttributes = 1000
  ) => {
    return this._responseHandler(
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

  fetchDocumentTypes = (page?: number, size?: number) => {
    return this._responseHandler(
      () => ApiDocumentTypeController.getDocumentTypes(page, size),
      (response) => {
        this._documentTypes = response.data.content;
      }
    );
  };

  createDocumentType = (data: Partial<CreateDocumentType>) => {
    return this._responseHandler(
      () => ApiDocumentTypeController.createDocumentType(data),
      (response) => {
        this._documentTypes = [...this._documentTypes, response.data];

        if (response.data.attributeIds) {
          this._updateAttributesWithDocumentType(
            response.data.id,
            response.data.attributeIds
          );
        }
        toast(TOASTS.SUCCESS_CREATE_TYPE);
      }
    );
  };

  private _updateAttributesWithDocumentType = (
    docTypeId: number,
    attributeIds: number[] | undefined
  ) => {
    this._documentAttributes.forEach((docAttribute) => {
      if (attributeIds?.includes(docAttribute.id)) {
        docAttribute.documentTypeIds?.push(docTypeId);
      }
      if (
        docAttribute.documentTypeIds?.includes(docTypeId) &&
        !attributeIds?.includes(docAttribute.id)
      ) {
        docAttribute.documentTypeIds = docAttribute.documentTypeIds.filter(
          (currDocTypeId) => currDocTypeId !== docTypeId
        );
      }
      toast(TOASTS.SUCCESS_UPDATE_TYPE);
    });
  };

  fetchDocumentTypeById = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentTypeController.getDocumentTypeById(id),
      (response) => {
        this._documentType = response.data;
      }
    );
  };

  updateDocumentType = (data: Partial<CreateDocumentType>, id: number) => {
    return this._responseHandler(
      () => ApiDocumentTypeController.updateDocumentTypeById(id, data),
      (response) => {
        const index = this._documentTypes.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this._documentTypes[index] = response.data;
        }
        if (data.attributeIds) {
          this._updateAttributesWithDocumentType(
            response.data.id,
            data.attributeIds
          );
        }
      }
    );
  };

  deleteDocumentType = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentTypeController.deleteDocumentTypeById(id),
      () => {
        this._documentTypes = this._documentTypes.filter(
          (doc) => doc.id !== id
        );
        toast(TOASTS.SUCCESS_DELETE_TYPE);
      }
    );
  };
}

export default new DocumentTypesStore();
