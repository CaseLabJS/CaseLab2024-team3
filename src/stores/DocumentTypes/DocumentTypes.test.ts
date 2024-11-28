import { describe, it, expect, beforeEach } from 'vitest';
import { DocumentTypesStore } from './documentTypes.store';

describe('DocumentTypes Store', () => {
  let store: DocumentTypesStore;

  beforeEach(() => {
    store = new DocumentTypesStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(store.documentTypes).toEqual([]);
    expect(store.documentType).toEqual(null);
    expect(store.error).toEqual(null);
    expect(store.isLoading).toEqual(false);
    expect(store.documentAttributes).toEqual([]);
  });
});
