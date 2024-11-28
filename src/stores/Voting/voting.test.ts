import { describe, it, expect, beforeEach } from 'vitest';
import { VotingStore } from './voting.store';

describe('Voting Store', () => {
  let store: VotingStore;

  beforeEach(() => {
    store = new VotingStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(store.document).toEqual(null);
    expect(store.error).toBe(null);
    expect(store.isLoading).toBe(false);
    expect(store.users).toEqual([]);
  });
});
