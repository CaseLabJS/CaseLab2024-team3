import { describe, it, expect, beforeEach } from 'vitest';
import { UsersStore } from './users.store';
import { STATUS } from '@/types/status';

describe('UsersStore', () => {
  let store: UsersStore;

  beforeEach(() => {
    store = new UsersStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(store.user).toBeNull();
    expect(store.users).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.status).toBe(STATUS.INITIAL);
    expect(store.error).toBeNull();
  });
});
