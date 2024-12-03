import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { TOASTS } from '@constants/toast';
import {
  NETWORK_ERROR_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants/errorMessage';
import { toast } from '@/hooks/use-toast';
import {
  ChangeUser,
  CreateDocumentResponse,
  Voting,
  VotingResult,
} from '@/types/index';
import { VotingStoreProps } from './types';
import ApiDocumentController from '@api/ApiDocumentController';
import ApiUserController from '@api/ApiUserController';

export class VotingStore implements VotingStoreProps {
  private _isLoading: boolean = false;
  private _error: string | null = null;
  private _users: ChangeUser[] = [];
  private _document: CreateDocumentResponse | null = null;
  private _votingResult: VotingResult | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get users() {
    return this._users;
  }

  get isLoading() {
    return this._isLoading;
  }

  get document() {
    return this._document;
  }

  get votingResult() {
    return this._votingResult;
  }

  get error() {
    return this._error;
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
        this._isLoading = false;
      });
    }
  }

  createVoting = (data: Voting) => {
    return this._responseHandler(
      () => ApiDocumentController.startVoting(data),
      () => {
        toast(TOASTS.SUCCESS_SEND_FOR_VOTING_DOCUMENT);
      }
    );
  };

  getVotingResult = (documentId: number) => {
    return this._responseHandler(
      () => ApiDocumentController.getVotingResult(documentId),
      (response) => (this._votingResult = response.data)
    );
  };

  fetchUsers = async (page?: number, size?: number) => {
    return await this._responseHandler(
      () => ApiUserController.getUsers(page, size),
      (response) => (this._users = response.data.content)
    );
  };

  fetchDocumentById = (id: number) => {
    return this._responseHandler(
      () => ApiDocumentController.getDocumentById(id),
      (response) => {
        this._document = response.data;
      }
    );
  };
}
export default new VotingStore();
