import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateAttribute,
} from 'src/types';

export interface AttributesStoreProps {
  attribute: ChangeAttribute | null;
  attributes: ChangeAttribute[];
  documentTypes: ChangeDocumentType[];
  loading: boolean;
  error: string | null;

  fetchDocTypesAndAttributes: (
    page?: number,
    size?: number,
    sizeForAttributes?: number
  ) => Promise<void>;
  fetchAttributeById: (id: number) => Promise<void>;
  fetchAttributes: (page?: number, size?: number) => Promise<void>;
  createAttribute: (attribute: CreateAttribute) => Promise<void>;
  updateAttribute: (attribute: CreateAttribute, id: number) => Promise<void>;
  deleteAttribute: (id: number) => Promise<void>;
}
