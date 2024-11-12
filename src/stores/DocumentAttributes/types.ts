import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateAttribute,
} from '@/types/index';

export interface DocAttributesStoreProps {
  documentAttributes: ChangeAttribute[];
  documentTypes: ChangeDocumentType[];
  isLoading: boolean;
  error: string | null;

  fetchDocTypesAndAttributes: (
    page?: number,
    size?: number,
    sizeForAttributes?: number
  ) => Promise<void>;
  createAttribute: (data: CreateAttribute) => Promise<void>;
  deleteAttribute: (id: number) => Promise<void>;
  updateAttribute: (data: CreateAttribute, id: number) => Promise<void>;
}
