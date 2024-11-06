import { makeAutoObservable, runInAction } from 'mobx';
import ApiAuthController from 'src/api/ApiAuthController';
import { AuthStoreProps, LocalStorageHelperProps } from './types';
import { STATUS } from 'src/types/status';
import { REFRESH_TOKEN, TOKEN } from 'src/constants/authConstants';
import { UserLogin } from 'src/types';
import userStore from '../User/user.store';

class AuthStore implements AuthStoreProps {
  private _isAuth = false;
  private _status = STATUS.INITIAL;
  private _userId = ''

  constructor() {
    this.checkAuth();
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get isAuth() {
    return this._isAuth;
  }

  get status() {
    return this._status;
  }

  getToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  get userId(){
    return this._userId;
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
    this._status = STATUS.LOADING;
    try {
      const data = await ApiAuthController.login(login, password);
      this.helperLocalStorage({ action: 'setItem', data });
      runInAction(() => {
        this._isAuth = true;
        this._userId = data.userId
        userStore.fetchUserData()
        this._status = STATUS.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this._status = STATUS.ERROR;
      });
    }
  }

  async checkAuth() {
    this._status = STATUS.LOADING;
    try {
      const refreshToken = this.getToken();
      if (!refreshToken) {
        this._status = STATUS.SUCCESS;
        return;
      }
      const data = await ApiAuthController.refresh(refreshToken);
      this.helperLocalStorage({ action: 'setItem', data });
      runInAction(() => {
        this._isAuth = true;
        this._userId = data.userId
        userStore.fetchUserData()
        this._status = STATUS.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this._status = STATUS.ERROR;
      });
    }
  }

  async logout() {
    this._status = STATUS.LOADING;
    try {
      this._isAuth = false;
      this._userId = ''
      userStore.fetchUserData()
      this.helperLocalStorage({
        action: 'removeItem',
      });
      this._status = STATUS.SUCCESS;
    } catch (err) {
      console.error(err);
      this._status = STATUS.ERROR;
    }
  }
}

export default new AuthStore();
