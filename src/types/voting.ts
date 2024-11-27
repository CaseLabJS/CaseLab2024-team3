export enum VotingStatus {
  DRAFT = 'DRAFT',
  PUBLISHED_FOR_VOTING = 'PUBLISHED_FOR_VOTING',
  VOTING_COMPLETED = 'VOTING_COMPLETED',
  VOTING_APPROVED = 'VOTING_APPROVED',
  VOTING_REJECTED = 'VOTING_REJECTED',
}

export type VotingInfo = {
  votingTitle: string;
  votingClassName?: string;
};

export type RecordVotingInfo<TKey extends string | number | symbol> = Record<
  TKey,
  VotingInfo
>;
