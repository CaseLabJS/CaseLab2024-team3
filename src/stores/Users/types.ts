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
  updateUser: (user: UserRegister, id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserPasswordForAdmin: (id: string, password: string) => Promise<void>;
  updateUserPasswordForUser: (
    id: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
}
