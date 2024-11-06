import { UserRegister } from "src/types";
import { STATUS } from "src/types/status";

export interface UserStoreProps {
    user: UserRegister | null;
    status: STATUS;
  }