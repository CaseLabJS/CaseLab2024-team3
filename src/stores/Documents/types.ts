import { ChangeDocument, CreateDocumentResponse } from 'src/types';

export interface DocumentsStoreProps {
  document: CreateDocumentResponse | null;
  documents: CreateDocumentResponse[];
  loading: boolean;
  error: string | null;
  getDocument: (id: number) => Promise<void>;
  getDocuments: () => Promise<void>;
  createDocument: (document: ChangeDocument) => Promise<void>;
  updateDocument: (id: number, document: ChangeDocument) => Promise<void>;
  deleteDocument: (id: number) => Promise<void>;
}
