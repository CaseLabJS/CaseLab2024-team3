import { ChangeAttribute, CreateDocumentType } from '@/types/index';

export interface DocumentTypesStoreProps {
  documentTypes: CreateDocumentType[];
  documentAttributes: ChangeAttribute[];
  isLoading: boolean;
  error: string | null;

  fetchDocTypesAndAttributes: (
    page?: number,
    size?: number,
    sizeForAttributes?: number
  ) => Promise<void>;
  fetchDocumentTypes: (page?: number, size?: number) => Promise<void>;
  createDocumentType: (data: CreateDocumentType) => Promise<void>;
  fetchDocumentTypeById: (id: number) => Promise<void>;
  updateDocumentType: (id: number, data: CreateDocumentType) => Promise<void>;
  deleteDocumentType: (id: number) => Promise<void>;
}
