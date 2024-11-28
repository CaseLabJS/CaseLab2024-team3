import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('Следует правильно объединять имена классов', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('Следует обрабатывать условные имена классов', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  it('Следует обрабатывать массивы имен классов', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('Следует обрабатывать объекты с булевыми значениями', () => {
    expect(cn({ class1: true, class2: false }, 'class3')).toBe('class1 class3');
  });

  it('Следует правильно объединить классы Tailwind', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('Следует обрабатывать пустые входные данные', () => {
    expect(cn()).toBe('');
  });

  it('Должен обрабатывать нулевые и неопределенные значения', () => {
    expect(cn(null, undefined, 'class1')).toBe('class1');
  });
});
