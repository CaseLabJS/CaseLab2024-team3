import { CreateDocumentType } from "@/types/index";

export interface DocumentTypesStoreProps {
  documentTypes: CreateDocumentType[];
  isLoading: boolean;
  error: string | null;

  fetchDocumentTypes: (page?: number, size?: number) => Promise<void>;
  createDocumentType: (data: CreateDocumentType) => Promise<void>;
  fetchDocumentTypeById: (id: number) => Promise<void>;
  updateDocumentType: (id: number, data: CreateDocumentType) => Promise<void>;
  deleteDocumentType: (id: number) => Promise<void>;
}