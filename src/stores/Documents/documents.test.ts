import { describe, it, expect, beforeEach } from 'vitest';
import { DocumentsStore } from './documents.store';

describe('DocumentsStore', () => {
  let store: DocumentsStore;

  beforeEach(() => {
    store = new DocumentsStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(store.documents).toEqual([]);
    expect(store.paginationDocuments).toEqual(null);
    expect(store.attributes).toEqual([]);
    expect(store.document).toEqual(null);
    expect(store.documents).toEqual([]);
    expect(store.error).toEqual(null);
    expect(store.loading).toEqual(false);
  });
});
