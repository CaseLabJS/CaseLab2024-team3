import { makeAutoObservable, runInAction } from 'mobx';
import ApiAttributeController from '@api/ApiAttributeController';
import { ChangeAttribute, CreateAttribute } from 'src/types';
import { AttributesStoreProps } from './types';
import { toast } from '@/hooks/use-toast';
import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { AxiosError } from 'axios';
import { TOASTS } from '@constants/toast';

class AttributesStore implements AttributesStoreProps {
  private _attribute: ChangeAttribute | null = null;
  private _attributes: ChangeAttribute[] = [];

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

  async createAttribute(attribute: CreateAttribute) {
    return this._responseHandler(
      () => ApiAttributeController.createAttribute(attribute),
      (response) => {
        this._attributes = [...this._attributes, response.data];
        toast(TOASTS.SUCCESS_CREATE_ATTRIBUTE);
      }
    );
  }

  async updateAttribute(id: number, attribute: CreateAttribute) {
    return this._responseHandler(
      () => ApiAttributeController.updateAttributeById(id, attribute),
      (response) => {
        const index = this._attributes.findIndex((attr) => attr.id === id);
        if (index !== -1) {
          this._attributes[index] = response.data;
        }
        toast(TOASTS.SUCCESS_UPDATE_ATTRIBUTE);
      }
    );
  }

  async deleteAttribute(id: number) {
    return this._responseHandler(
      () => ApiAttributeController.deleteAttributeById(id),
      () => {
        this._attributes = this._attributes.filter((attr) => attr.id !== id);
        toast(TOASTS.SUCCESS_DELETE_ATTRIBUTE);
      }
    );
  }
}

export default new AttributesStore();
