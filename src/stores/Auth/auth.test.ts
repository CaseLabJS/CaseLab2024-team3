import { describe, it, expect, beforeEach } from 'vitest';
import { AuthStore } from './auth.store';
import { TOKEN, REFRESH_TOKEN } from '@/constants/authConstants';

describe('AuthStore', () => {
  let authStore: AuthStore;

  beforeEach(() => {
    authStore = new AuthStore();
  });

  it('Следует инициализировать store с значениями по умолчанию', () => {
    expect(authStore.isAuth).toBe(false);
    expect(authStore.userId).toBe('');
  });

  it('Следует устанавливать элементы в localStorage', () => {
    const data = {
      jwt: 'test-jwt',
      refreshToken: 'test-refresh-token',
      userId: 'test-id',
    };
    authStore.helperLocalStorage({ action: 'setItem', data });
    expect(localStorage.getItem(TOKEN)).toBe('test-jwt');
    expect(localStorage.getItem(REFRESH_TOKEN)).toBe('test-refresh-token');
  });

  it('Следует добавить элементы из localStorage', () => {
    localStorage.setItem(TOKEN, 'test-jwt');
    localStorage.setItem(REFRESH_TOKEN, 'test-refresh-token');
    authStore.helperLocalStorage({ action: 'removeItem' });
    expect(localStorage.getItem(TOKEN)).toBeNull();
    expect(localStorage.getItem(REFRESH_TOKEN)).toBeNull();
  });

  it('Следует удалить элементы из localStorage', () => {
    localStorage.setItem(TOKEN, 'test-jwt');
    localStorage.setItem(REFRESH_TOKEN, 'test-refresh-token');
    authStore.helperLocalStorage({ action: 'removeItem' });
    expect(localStorage.getItem(TOKEN)).toBeNull();
    expect(localStorage.getItem(REFRESH_TOKEN)).toBeNull();
  });

  it('Должен вернуть правильный токен из localStorage', () => {
    localStorage.setItem(REFRESH_TOKEN, 'test-jwt');
    const token = authStore.getToken();
    expect(token).toBe('test-jwt');
  });

  it('Должен возвращать null, если токен отсутствует в localStorage', () => {
    localStorage.removeItem(REFRESH_TOKEN);
    const token = authStore.getToken();
    expect(token).toBeNull();
  });
});
