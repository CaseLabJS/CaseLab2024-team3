import { AttributesStore } from './attributes.store';
import { beforeEach, describe, it, expect } from 'vitest';

describe('AuthStore', () => {
  let attributesStore: AttributesStore;

  beforeEach(() => {
    attributesStore = new AttributesStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(attributesStore.attributes).toEqual([]);
    expect(attributesStore.attribute).toEqual(null);
    expect(attributesStore.documentTypes).toEqual([]);
    expect(attributesStore.loading).toEqual(false);
    expect(attributesStore.error).toEqual(null);
  });
});
