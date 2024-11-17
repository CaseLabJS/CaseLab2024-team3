export enum DocumentState {
  DRAFT = 'DRAFT',
  AUTHOR_SIGNED = 'AUTHOR_SIGNED',
  PENDING_AUTHOR_SIGN = 'PENDING_AUTHOR_SIGN',
  PENDING_CONTRACTOR_SIGN = 'PENDING_CONTRACTOR_SIGN',
  DELETED = 'DELETED',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  REWORK_REQUIRED = 'REWORK_REQUIRED',
  IN_VOTING = 'IN_VOTING',
}

export type StateInfo = {
  title: string;
  className?: string;
};

export type RecordStateInfo<TKey extends string | number | symbol> = Record<
  TKey,
  StateInfo
>;
