import { AxiosResponse } from 'axios';
import api from './index';
import {
  ChangeDocumentType,
  CreateDocumentType,
  GetDocumentTypesResponse,
} from 'src/types';

class ApiDocumentTypeController {
  public static getDocumentTypes(
    page?: number,
    size?: number
  ): Promise<AxiosResponse<GetDocumentTypesResponse>> {
    if (page && size) {
      return api.get(`/document_type?page=${page}&size=${size}`);
    }

    if (page) {
      return api.get(`/document_type?page=${page}`);
    }

    if (size) {
      return api.get(`/document_type?size=${size}`);
    }

    return api.get(`/document_type`);
  }

  public static async createDocumentType(
    data: Partial<CreateDocumentType>
  ): Promise<AxiosResponse<ChangeDocumentType>> {
    return api.post(`/document_type`, data);
  }

  public static async getDocumentTypeById(
    id: number
  ): Promise<AxiosResponse<ChangeDocumentType>> {
    return api.get(`/document_type/${id}`);
  }

  public static async deleteDocumentTypeById(
    id: number
  ): Promise<AxiosResponse> {
    return api.delete(`/document_type/${id}`);
  }

  public static async updateDocumentTypeById(
    id: number,
    data: Partial<CreateDocumentType>
  ): Promise<AxiosResponse<ChangeDocumentType>> {
    return api.patch(`/document_type/${id}`, data);
  }
}

export default ApiDocumentTypeController;
