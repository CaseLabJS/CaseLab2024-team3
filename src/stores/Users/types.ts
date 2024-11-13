import { ChangeUser, UserRegister } from '@/types/index';
import { STATUS } from '@/types/status';

export interface UsersStoreProps {
  user: UserRegister | ChangeUser | null;
  users: ChangeUser[];
  error: string | null;
  status: STATUS;
  isLoading: boolean;
  fetchUserById: (id: string | number) => Promise<void>;
  fetchUsers: () => Promise<void>;
  createUser: (user: UserRegister) => Promise<void>;
  updateUser: (id: string | number, user: UserRegister) => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
}
