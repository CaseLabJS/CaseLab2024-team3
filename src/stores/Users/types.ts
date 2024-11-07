import {  ChangeUser, UserRegister } from '@/types/index';
import { STATUS } from '@/types/status';

export interface UsersStoreProps {
  user: UserRegister | ChangeUser | null;
  users: ChangeUser[];
  loading: boolean;
  error: string | null;
  status: STATUS;
  fetchUserById: (id: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
  createUser: (user: UserRegister) => Promise<void>;
  updateUser: (id: string, user: UserRegister) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
