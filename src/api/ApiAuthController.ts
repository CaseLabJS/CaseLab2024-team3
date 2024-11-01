import axios from "axios";

import { AuthUserResponse } from "src/types";
import { API_URL } from "./index";

class ApiAuthController {
  public static async login(
    login: string,
    password: string
  ): Promise<AuthUserResponse> {
    return axios
      .post(`${API_URL}/users/auth`, { login, password })
      .then((res) => res.data);
  }

  public static async refresh(refreshToken: string): Promise<AuthUserResponse> {
    return axios
      .post(`${API_URL}/jwt/update`, { refreshToken })
      .then((res) => res.data);
  }
}

export default ApiAuthController;
