import {
  ChangeUser,
  CreateDocumentResponse,
  Voting,
  VotingResult,
} from '@/types/index';

export interface VotingStoreProps {
  users: ChangeUser[];
  isLoading: boolean;
  error: string | null;
  document: CreateDocumentResponse | null;
  votingResult: VotingResult | null;

  fetchUsers: () => Promise<void>;
  createVoting: (data: Voting) => Promise<void>;
}
