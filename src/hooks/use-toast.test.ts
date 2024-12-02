/* eslint-disable @typescript-eslint/no-unused-vars */
import { act, renderHook } from '@testing-library/react';
import { useToast } from './use-toast';
import { describe, expect, it, vitest } from 'vitest';

describe('useToast', () => {
  it('Следует добавить тост', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('Следует обновить тост', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      const newToast = result.current.toast({ title: 'Test Toast' });
      newToast.update({
        title: 'Updated Toast',
        id: '',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Updated Toast');
  });

  it('Следует отклонить тост', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;

    act(() => {
      const newToast = result.current.toast({ title: 'Test Toast' });
      toastId = newToast.id;
      newToast.dismiss();
    });

    const toastItem = result.current.toasts.find((item) => item.id === toastId);
    expect(result.current.toasts).toHaveLength(1);
    expect(toastItem?.open).not.toBeUndefined();
    expect(toastItem?.open).toBe(false);
  });

  it('Следует удалить тост после задержки', () => {
    vitest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    act(() => {
      const newToast = result.current.toast({ title: 'Test Toast' });
      newToast.dismiss();
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      vitest.advanceTimersByTime(100000000);
    });
    expect(result.current.toasts).toHaveLength(0);
    vitest.useRealTimers();
  });

  it('Должен обрабатывать несколько тостов', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast 1' });
      result.current.toast({ title: 'Toast 2' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Toast 2');
  });
});
