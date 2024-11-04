import { AxiosResponse } from 'axios';
import api from './index';
import { ChangeAttributeValue, CreateAttributeValue } from 'src/types';

class ApiAttributeValueController {
  public static async getAttributeValueById(
    id: number
  ): Promise<AxiosResponse<ChangeAttributeValue>> {
    return api.get(`/attribute-values/${id}`);
  }

  public static async updateAttributeValueByDocumentId(
    id: number,
    data: CreateAttributeValue
  ): Promise<AxiosResponse<ChangeAttributeValue>> {
    return api.put(`/attribute-values/${id}`, data);
  }

  public static async deleteAttributeValueById(
    id: number
  ): Promise<AxiosResponse> {
    return api.delete(`/attribute-values/${id}`);
  }

  public static async createAttributeValue(
    data: CreateAttributeValue
  ): Promise<AxiosResponse<ChangeAttributeValue>> {
    return api.post(`/attribute-values`, data);
  }

  public static async getDocumentAttributeValue(
    documentId: number,
    attributeId: number
  ): Promise<AxiosResponse<ChangeAttributeValue>> {
    return api.get(`/attribute-values/${documentId}/${attributeId}`);
  }

  public static async getAttributeValuesByVersionId(
    documentVersionId: number
  ): Promise<AxiosResponse<ChangeAttributeValue[]>> {
    return api.get(`/attribute-values/documents/version/${documentVersionId}`);
  }
}

export default ApiAttributeValueController;
