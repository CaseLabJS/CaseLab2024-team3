import { AxiosResponse } from 'axios';
import api from './index';
import {
  ChangeAttribute,
  CreateAttribute,
  GetAttributesResponse,
} from 'src/types';

class ApiAttributeController {
  public static async getAttributeById(
    id: number
  ): Promise<AxiosResponse<ChangeAttribute>> {
    return api.get(`/attributes/${id}`);
  }

  public static async updateAttributeById(
    id: number,
    data: CreateAttribute
  ): Promise<AxiosResponse<ChangeAttribute>> {
    return api.put(`/attributes/${id}`, data);
  }

  public static async deleteAttributeById(id: number): Promise<AxiosResponse> {
    return api.delete(`/attributes/${id}`);
  }

  public static async getAttributes(
    page?: number,
    size?: number
  ): Promise<AxiosResponse<GetAttributesResponse>> {
    if (page && size) {
      return api.get(`/attributes?page=${page}&size=${size}`);
    }

    if (page) {
      return api.get(`/attributes?page=${page}`);
    }

    if (size) {
      return api.get(`/attributes?size=${size}`);
    }

    return api.get(`/attributes`);
  }

  public static async createAttribute(
    data: CreateAttribute
  ): Promise<AxiosResponse<ChangeAttribute>> {
    return api.post(`/attributes`, data);
  }
}

export default ApiAttributeController;
