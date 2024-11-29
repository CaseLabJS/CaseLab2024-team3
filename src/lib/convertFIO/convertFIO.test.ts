import { describe, it, expect } from 'vitest';
import { convertFIO } from './convertFIO';

describe('convertFIO', () => {
  it('Должен конвертировать полное имя со всеми частями', () => {
    const result = convertFIO({
      lastName: 'Doe',
      firstName: 'John',
      patronymic: 'Smith',
    });
    expect(result).toBe('Doe J.S.');
  });

  it('Должен конвертировать полное имя со всеми частями с маленькой буквы', () => {
    const result = convertFIO({
      lastName: 'Doe',
      firstName: 'john',
      patronymic: 'smith',
    });
    expect(result).toBe('Doe J.S.');
  });

  it('Должен конвертировать имя только с фамилией и именем', () => {
    const result = convertFIO({ lastName: 'Doe', firstName: 'John' });
    expect(result).toBe('Doe J.');
  });

  it('Должен конвертировать имя только с фамилией и отчеством', () => {
    const result = convertFIO({ lastName: 'Doe', patronymic: 'Smith' });
    expect(result).toBe('Doe S.');
  });

  it('Должен конвертировать имя только с фамилией', () => {
    const result = convertFIO({ lastName: 'Doe' });
    expect(result).toBe('Doe');
  });

  it('Должен обрабатывать пустые имя и отчество', () => {
    const result = convertFIO({
      lastName: 'Doe',
      firstName: '',
      patronymic: '',
    });
    expect(result).toBe('Doe');
  });

  it('Следует обрабатывать неопределенные имена и отчества', () => {
    const result = convertFIO({
      lastName: 'Doe',
      firstName: undefined,
      patronymic: undefined,
    });
    expect(result).toBe('Doe');
  });
});
