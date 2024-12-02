import authStore from '@/stores/Auth/auth.store';
import ApiUserController from '@api/ApiUserController';
import { makeAutoObservable, runInAction } from 'mobx';
import { ChangeUser, Pagination, UserRegister } from '@/types/index';
import { STATUS } from '@/types/status';
import { toast } from '@/hooks/use-toast';
import {
  UNKNOWN_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { AxiosError } from 'axios';
import { TOASTS } from '@constants/toast';
import { UsersStoreProps } from './types';

export class UsersStore implements UsersStoreProps {
  private _user: UserRegister | ChangeUser | null = null;
  private _users: ChangeUser[] = [];
  private _status = STATUS.INITIAL;
  private _isLoading: boolean = false;
  private _error: string | null = null;
  private _pagination: Pagination | null = null;
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get user() {
    return this._user;
  }

  get users() {
    return this._users;
  }

  get isLoading() {
    return this._isLoading;
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }

  get pagination() {
    return this._pagination;
  }

  private async _responseHandler<T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) {
    this._isLoading = true;

    try {
      const result = await action();
      runInAction(() => {
        onSuccess(result);
        this._error = null;
        this._status = STATUS.SUCCESS;
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
    } finally {
      runInAction(() => {
        this._isLoading = false;
        this._status = STATUS.SUCCESS;
      });
    }
  }

  fetchUserById = (id: string) => {
    return this._responseHandler(
      () => ApiUserController.getUserById(id),
      (response) =>
        (this._user = response.data.id ? (response.data as ChangeUser) : null)
    );
  };

  fetchUsers = async (page?: number, size?: number) => {
    return await this._responseHandler(
      () => ApiUserController.getUsers(page, size),
      (response) => {
        const { content, ...res } = response.data;
        this._pagination = res;
        this._users = [...content];
      }
    );
  };

  createUser = async (user: UserRegister) => {
    return this._responseHandler(
      () => ApiUserController.createUser(user),
      (response) => {
        this._users.push(response.data);
        toast(TOASTS.SUCCESS_CREATE_USER);
      }
    );
  };

  updateUser = async (id: string, user: UserRegister) => {
    return this._responseHandler(
      () => ApiUserController.updateUserById(id, user),
      (response) => {
        const index = this._users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this._users[index] = response.data as ChangeUser;
        } else {
          this._users.push(response.data as ChangeUser);
        }
        toast(TOASTS.SUCCESS_UPDATE_USER);
      }
    );
  };

  deleteUser = async (id: string) => {
    return this._responseHandler(
      () => ApiUserController.deleteUserById(id),
      () => {
        this._users = this._users.filter((u) => u.id !== id);
        toast(TOASTS.SUCCESS_DELETE_USER);
      }
    );
  };

  fetchUserData = async () => {
    return this._responseHandler(
      async () => {
        const userId = authStore.userId;
        if (!userId) {
          throw new Error('Идентификатор пользователя недоступен');
        }
        return ApiUserController.getUserById(userId);
      },
      (response) => {
        this._user = response.data;
      }
    );
  };

  //метод для обновления пароля от роли администратора
  updateUserPasswordForAdmin = (id: string, password: string) => {
    return this._responseHandler(
      () =>
        ApiUserController.updateUserPasswordByIdForAdmin(id, {
          newPassword: password,
        }),
      () => {
        toast(TOASTS.SUCCESS_UPDATE_PASSWORD);
      }
    );
  };

  //метод для обновления пароля от роли пользователя
  updateUserPasswordForUser = (oldPassword: string, newPassword: string) => {
    return this._responseHandler(
      () =>
        ApiUserController.updateUserPasswordByIdForUser({
          oldPassword,
          newPassword,
        }),
      () => {
        toast(TOASTS.SUCCESS_UPDATE_PASSWORD);
      }
    );
  };
}
export default new UsersStore();
