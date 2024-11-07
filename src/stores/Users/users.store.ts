import { makeAutoObservable, runInAction } from 'mobx';
import ApiUserController from '@api/ApiUserController';
import { ChangeUser, UserRegister } from '@/types/index';
import { STATUS } from '@/types/status';
import authStore from '@/stores/Auth/auth.store';
class UsersStore {
  private _user: UserRegister | ChangeUser | null = null;
  private _users: ChangeUser[] = [];
  private _status = STATUS.INITIAL;
  private _isLoading: boolean = false;
  private _error: string | null = null;
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
  private async responseHandler<T>(
    action: () => Promise<T>,
    onSuccess: (data: T) => void
  ) {
    this._isLoading = true;
    this._status = STATUS.LOADING;

    try {
      const result = await action();
      runInAction(() => {
        onSuccess(result);
        this._error = null;
        this._status = STATUS.SUCCESS;
      });
    } catch (error) {
      runInAction(() => {
        this._error =
          error instanceof Error ? error.message : 'An unknown error occurred';
          this._status = STATUS.ERROR; 
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  fetchUserById(id: string) {
    return this.responseHandler(
      () => ApiUserController.getUserById(id),
      (response) =>
        (this._user = response.data.id ? (response.data as ChangeUser) : null)
    );
  }

  async fetchUsers(page?: number, size?: number) {
    return this.responseHandler(
      () => ApiUserController.getUsers(page, size),
      (response) => (this._users = response.data.content)
    );
  }

  async createUser(user: UserRegister) {
    return this.responseHandler(
      () => ApiUserController.createUser(user),
      (response) => this._users.push(response.data as ChangeUser)
    );
  }
  async updateUser(id: string, user: UserRegister) {
    return this.responseHandler(
      () => ApiUserController.updateUserById(id, user),
      (response) => {
        const index = this._users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this._users[index] = response.data as ChangeUser;
        } else {
          this._users.push(response.data as ChangeUser);
        }
      }
    );
  }

  async deleteUser(id: string) {
    return this.responseHandler(
      () => ApiUserController.deleteUserById(id),
      () => (this._users = this._users.filter((u) => u.id !== id))
    );
  }
  async fetchUserData() {
    return this.responseHandler(
      async () => {
        const userId = authStore.userId;
        if (!userId) {
          throw new Error('User ID is not available');
        }
        return ApiUserController.getUserById(userId);
      },
      (response) => {
        this._user = response.data;
      }
    );
  }
}
export default new UsersStore();
