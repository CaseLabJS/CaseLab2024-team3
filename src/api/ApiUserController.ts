import { AxiosResponse } from 'axios';
import api from './index';
import { ChangeUser, GetUsersResponse, UserRegister } from 'src/types';

class ApiUserController {
  public static async getUserById(id: string): Promise<AxiosResponse<UserRegister>> {
    return api.get(`/users/${id}`);
  }

  public static async updateUserById(
    id: string,
    data: UserRegister,
  ): Promise<AxiosResponse<UserRegister>> {
    return api.put(`/users/${id}`, data);
  }

  public static async deleteUserById(id: string): Promise<AxiosResponse> {
    return api.delete(`/users/${id}`);
  }

  public static async getUsers(
    page?: number,
    size?: number,
  ): Promise<AxiosResponse<GetUsersResponse>> {
    if (page && size) {
      return api.get(`/users?page=${page}&size=${size}`);
    }

    if (page) {
      return api.get(`/users?page=${page}`);
    }

    if (size) {
      return api.get(`/users?size=${size}`);
    }

    return api.get(`/users`);
  }

  public static async createUser(data: UserRegister): Promise<AxiosResponse<ChangeUser>> {
    return api.post(`/users`, data);
  }

  public static async updateUserPasswordById(
    id: string,
    data: { oldPassword: string; newPassword: string },
  ): Promise<AxiosResponse> {
    return api.patch(`/users/${id}`, data);
  }
}

export default ApiUserController;
