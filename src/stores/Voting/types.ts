import { ChangeUser, CreateDocumentResponse, Voting } from '@/types/index';

export interface VotingStoreProps {
  users: ChangeUser[];
  isLoading: boolean;
  error: string | null;
  document: CreateDocumentResponse | null;

  fetchUsers: () => Promise<void>;
  createVoting: (data: Voting) => Promise<void>;
}
