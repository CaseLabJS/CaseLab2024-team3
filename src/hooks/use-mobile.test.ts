import { act, renderHook } from '@testing-library/react';
import { useIsMobile } from './use-mobile';
import { beforeAll, describe, expect, it, vitest } from 'vitest';

describe('useIsMobile', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vitest.fn().mockImplementation((query: unknown) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vitest.fn(),
        removeListener: vitest.fn(),
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      })),
    });
  });

  it('Должен возвращать значение true, если ширина окна меньше 768 пикселей', () => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('Должен возвращать false, если ширина окна больше или равна 768 пикселей', () => {
    window.innerWidth = 800;
    window.dispatchEvent(new Event('resize'));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('Следует обновить значение при изменении размера окна', () => {
    const { result, rerender } = renderHook(() => useIsMobile());

    expect(result.current).toBe(window.innerWidth < 768);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
      rerender();
    });
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
      rerender();
    });
    expect(result.current).toBe(false);
  });

  it('Следует правильно установить начальное значение', () => {
    window.innerWidth = 600;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    window.innerWidth = 900;
    const { result: result2 } = renderHook(() => useIsMobile());
    expect(result2.current).toBe(false);
  });
});
