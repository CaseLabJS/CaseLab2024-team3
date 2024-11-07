import { makeAutoObservable, runInAction } from 'mobx';
import ApiUserController from 'src/api/ApiUserController';
import { STATUS } from 'src/types/status';
import { UserRegister } from 'src/types';
import { UserStoreProps } from './types';
import authStore from '../Auth/auth.store';

class UserStore implements UserStoreProps {
  private _user: UserRegister | null = null;
  private _status = STATUS.INITIAL;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get user() {
    return this._user;
  }

  get status() {
    return this._status;
  }

  async fetchUserData() {
    this._status = STATUS.LOADING;
    const userId = authStore.userId;

    if (!userId) {
      this._user = null;
      return (this._status = STATUS.ERROR);
    }

    try {
      const data = await ApiUserController.getUserById(userId);
      runInAction(() => {
        this._user = data.data;
        this._status = STATUS.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this._status = STATUS.ERROR;
      });
    }
  }
}

export default new UserStore();

