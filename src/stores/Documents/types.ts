import { ChangeDocument, CreateDocument, GetDocument } from 'src/types';

export interface DocumentsStoreProps {
  document: GetDocument | null;
  documents: GetDocument[];
  loading: boolean;
  error: string | null;
  fetchDocumentById: (id: number) => Promise<void>;
  fetchDocuments: () => Promise<void>;
  createDocument: (document: CreateDocument) => Promise<void>;
  updateDocument: (id: number, document: ChangeDocument) => Promise<void>;
  deleteDocument: (id: number) => Promise<void>;
}
