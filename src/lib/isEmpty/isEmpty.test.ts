import { describe, it, expect } from 'vitest';
import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  it('Должен возвращать true для null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('Должен возвращать true для undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('Должен возвращать true для пустого массива', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('Должен возвращать false для непустого массива', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('Должен возвращать true для пустого объекта', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('Должен возвращать false для непустого объекта', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });

  it('Должен возвращать false для числа', () => {
    expect(isEmpty(123)).toBe(false);
  });

  it('Должен возвращать false для строки', () => {
    expect(isEmpty('string')).toBe(false);
  });

  it('Должен возвращать false для логического значения', () => {
    expect(isEmpty(true)).toBe(false);
  });

  it('Должна возвращать false для функции', () => {
    expect(isEmpty(() => {})).toBe(false);
  });
});
