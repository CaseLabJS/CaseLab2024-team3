import { AxiosResponse } from "axios";
import api from "./index";
import { ChangeDocument, CreateDocument, GetDocumentsResponse } from "src/types";

class ApiDocumentController {
  public static async getDocumentById(id: number): Promise<AxiosResponse<ChangeDocument>> {
    return api.get(`/document/${id}`);
  }

  public static async updateDocumentById(id: number, data: ChangeDocument): Promise<AxiosResponse<ChangeDocument>> {
    return api.put(`/document/${id}`, data);
  }

  public static async deleteDocumentById(id: number): Promise<AxiosResponse> {
    return api.delete(`/document/${id}`);
  }

  public static async getDocuments(page?: number, size?: number): Promise<AxiosResponse<GetDocumentsResponse>> {
    if (page && size) {
      return api.get(`/document?page=${page}&size=${size}`);
    }

    if (page) {
      return api.get(`/document?page=${page}`);
    }

    if (size) {
      return api.get(`/document?size=${size}`);
    }

    return api.get(`/document`);
  }

  public static async createDocument(data: CreateDocument): Promise<AxiosResponse<ChangeDocument>> {
    return api.post(`/document`, data);
  }

  public static async signDocumentById(id: number): Promise<AxiosResponse> {
    return api.post(`/document/${id}/sign`);
  }

  public static async sendForSignDocumentById(id: number, userIds: string[]): Promise<AxiosResponse> {
    return api.post(`/document/${id}/sign?userIds=${userIds.join(",")}`);
  }
}

export default ApiDocumentController;