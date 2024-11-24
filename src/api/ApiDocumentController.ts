import { AxiosResponse } from 'axios';
import {
  ChangeDocument,
  ChangeDocumentResponse,
  CreateDocument,
  CreateDocumentResponse,
  DocumentState,
  GetDocumentsResponse,
  Initiator,
  SendDocumentForSignResponse,
  Voting,
} from 'src/types';
import api from './index';

class ApiDocumentController {
  public static async getDocumentById(
    id: number
  ): Promise<AxiosResponse<CreateDocumentResponse>> {
    return api.get(`/document/owner/${id}/versions/last`);
  }
  public static async getDocumentSignerById(
    id: number
  ): Promise<AxiosResponse<CreateDocumentResponse>> {
    return api.get(`/document/signer/${id}/versions/last`);
  }
  public static async getAllDocumentById(
    id: number
  ): Promise<AxiosResponse<CreateDocumentResponse>> {
    return api.get(`/document/owner/${id}/versions`);
  }
  public static async getAllDocumentSignerById(
    id: number
  ): Promise<AxiosResponse<CreateDocumentResponse>> {
    return api.get(`/document/signer/${id}/versions`);
  }

  public static async updateDocumentById(
    id: number,
    data: ChangeDocument
  ): Promise<AxiosResponse<ChangeDocumentResponse>> {
    return api.put(`/document/${id}`, data);
  }

  public static async deleteDocumentById(id: number): Promise<AxiosResponse> {
    return api.delete(`/document/${id}`);
  }

  public static async getDocuments(
    page?: number,
    size?: number,
    initiator: Initiator = 'owner'
  ): Promise<AxiosResponse<GetDocumentsResponse>> {
    if (page && size) {
      return api.get(`/document/${initiator}?page=${page}&size=${size}`);
    }

    if (page) {
      return api.get(`/document/${initiator}?page=${page}`);
    }

    if (size) {
      return api.get(`/document/${initiator}?size=${size}`);
    }

    return api.get(`/document/${initiator}`);
  }

  public static async createDocument(
    data: CreateDocument
  ): Promise<AxiosResponse<CreateDocumentResponse>> {
    return api.post(`/document`, data);
  }

  public static async signDocumentById(
    id: number,
    status: DocumentState
  ): Promise<AxiosResponse> {
    return api.post(`/document/${id}/sign`, {
      status,
    });
  }

  public static async getDocumentsForSign(): Promise<
    AxiosResponse<GetDocumentsResponse>
  > {
    return api.get(`/document/signer`);
  }

  public static async sendForSignDocumentById(
    id: number,
    userId: string
  ): Promise<AxiosResponse<SendDocumentForSignResponse>> {
    return api.post(`/document/${id}/sign?userId=${userId}`);
  }

  public static async downloadDocument(
    url: string
  ): Promise<AxiosResponse<{ link: string }>> {
    return api.get(`/document/download?url=${url}`);
  }

  /*Согласование */

  public static async startVoting(data: Voting): Promise<AxiosResponse> {
    return api.post(`/document/approvement/start`, data);
  }
}

export default ApiDocumentController;
