import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './Toast';

describe('UI Toast', () => {
  it('Отображает компонент Toast', () => {
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>Test Description</ToastDescription>
          <ToastClose />
        </Toast>
      </ToastProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Отображает тост с action', () => {
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>Test Description</ToastDescription>
          <ToastAction altText="Undo">Undo</ToastAction>
          <ToastClose />
        </Toast>
      </ToastProvider>
    );

    expect(screen.getByText('Undo')).toBeInTheDocument();
  });
});
