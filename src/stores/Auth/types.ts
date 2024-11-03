import { AuthUserResponse, UserLogin } from "src/types";
import { STATUS } from "src/types/status";

export interface AuthStoreProps {
  isAuth: boolean;
  status: STATUS;

  login: (data: UserLogin) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

interface LocalStorageActionSet {
  action: "setItem" | "removeItem";
  data: AuthUserResponse;
}

interface LocalStorageActionRemove {
  action: "removeItem";
}

export type LocalStorageHelperProps =
  | LocalStorageActionSet
  | LocalStorageActionRemove;
