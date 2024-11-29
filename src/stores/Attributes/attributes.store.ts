import { toast } from '@/hooks/use-toast';
import ApiAttributeController from '@api/ApiAttributeController';
import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { TOASTS } from '@constants/toast';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateAttribute,
} from 'src/types';
import { AttributesStoreProps } from './types';
import ApiDocumentTypeController from '@api/ApiDocumentTypeController';

export class AttributesStore implements AttributesStoreProps {
  private _attribute: ChangeAttribute | null = null;
  private _attributes: ChangeAttribute[] = [];
  private _documentTypes: ChangeDocumentType[] = [];

  private _loading: boolean = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get attribute() {
    return this._attribute;
  }

  get attributes() {
    return this._attributes;
  }

  get documentTypes() {
    return this._documentTypes;
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

  fetchDocTypesAndAttributes = async (
    page?: number,
    size?: number,
    sizeForAttributes = 100
  ) => {
    return this._responseHandler(
      () =>
        Promise.all([
          ApiAttributeController.getAttributes(0, sizeForAttributes),
          ApiDocumentTypeController.getDocumentTypes(page, size),
        ]),
      ([responseAttributes, responseDocTypes]) => {
        this._documentTypes = responseDocTypes.data.content;
        this._attributes = responseAttributes.data.content;
      }
    );
  };

  async fetchAttributeById(id: number) {
    return this._responseHandler(
      () => ApiAttributeController.getAttributeById(id),
      (response) => {
        this._attribute = response.data;
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

  createAttribute = async (attribute: Partial<CreateAttribute>) => {
    return this._responseHandler(
      () => ApiAttributeController.createAttribute(attribute),
      (response) => {
        this._attributes = [...this._attributes, response.data];

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

  updateAttribute = (attribute: CreateAttribute, id: number) => {
    return this._responseHandler(
      () => ApiAttributeController.updateAttributeById(id, attribute),
      (response) => {
        const index = this._attributes.findIndex((attr) => attr.id === id);
        if (index !== -1) {
          this._attributes[index] = response.data;
        }
        if (attribute.documentTypeIds) {
          this._updateDocumentTypesWithAttribute(
            response.data.id,
            attribute.documentTypeIds
          );
        }
        toast(TOASTS.SUCCESS_UPDATE_ATTRIBUTE);
      }
    );
  };

  deleteAttribute = (id: number) => {
    return this._responseHandler(
      () => ApiAttributeController.deleteAttributeById(id),
      () => {
        this._attributes = this._attributes.filter((attr) => attr.id !== id);
        toast(TOASTS.SUCCESS_DELETE_ATTRIBUTE);
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
}

export default new AttributesStore();
