import axios, { AxiosResponse } from "axios";

import { AuthUserResponse } from "src/types";
import { API_URL } from "./index";

class ApiAuthController {

  public static async login(login: string, password: string): Promise<AxiosResponse<AuthUserResponse>> {
    return axios.post(`${API_URL}/users/auth`, { login, password })
      .then(res => res.data);
  }

  public static async refresh(): Promise<AxiosResponse<AuthUserResponse>> {
    return axios.post(`${API_URL}/jwt/update`)
    .then(res => res.data);
  }
}

export default ApiAuthController;