import { makeAutoObservable, runInAction } from 'mobx';
import ApiAuthController from 'src/api/ApiAuthController';
import { AuthStoreProps, LocalStorageHelperProps } from './types';
import { STATUS } from 'src/types/status';
import { REFRESH_TOKEN, TOKEN } from 'src/constants/authConstants';
import { UserLogin } from 'src/types';
import { usersStore } from '../Users';
import { toast } from '@/hooks/use-toast';
import {
  UNKNOWN_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { AxiosError } from 'axios';

class AuthStore implements AuthStoreProps {
  private _isAuth = false;
  private _status = STATUS.INITIAL;
  private _error: string | null = null;
  private _userId = '';

  constructor() {
    const refreshToken = this.getToken();
    if (refreshToken) {
      void this.checkAuth();
    }
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get isAuth() {
    return this._isAuth;
  }
  get error() {
    return this._error;
  }

  get status() {
    return this._status;
  }

  getToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  get userId() {
    return this._userId;
  }

  private async _responseHandler<T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) {
    this._status = STATUS.LOADING;
    try {
      const result = await action();
      runInAction(() => {
        onSuccess(result);
        this._status = STATUS.SUCCESS;
        this._error = null;
      });
    } catch (error) {
      runInAction(() => {
        this._status = STATUS.ERROR;
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
    }
  }

  helperLocalStorage(params: LocalStorageHelperProps) {
    const { action } = params;
    if (action === 'setItem' && 'data' in params) {
      const { data } = params;
      localStorage.setItem(TOKEN, data.jwt);
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    } else if (action === 'removeItem') {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    }
  }

  async login({ login, password }: UserLogin) {
    return await this._responseHandler(
      () => ApiAuthController.login(login, password),
      (data) => {
        this.helperLocalStorage({ action: 'setItem', data });
        this._isAuth = true;
        this._userId = data.userId;
        void usersStore.fetchUserData();
      }
    );
  }

  async checkAuth() {
    return this._responseHandler(
      async () => {
        const refreshToken = this.getToken();
        if (!refreshToken) throw new Error('No refresh token found');
        const data = await ApiAuthController.refresh(refreshToken);
        this.helperLocalStorage({ action: 'setItem', data });
        return data;
      },
      (data) => {
        this._userId = data.userId;
        this._isAuth = true;
        void usersStore.fetchUserData();
      }
    );
  }

  logout = () => {
    return this._responseHandler(
      () => {
        this.helperLocalStorage({ action: 'removeItem' });
        return Promise.resolve(null);
      },
      () => {
        this._isAuth = false;
        this._userId = '';
        // usersStore.fetchUserData()
      }
    );
  };
}

export default new AuthStore();
