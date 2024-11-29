import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import '@testing-library/jest-dom';
import { createRef } from 'react';

describe('UI Button', () => {
  it('Корректно отображается с параметрами по умолчанию', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-indigo-700 text-white');
  });

  it('Корректно отображается с пользовательским вариантом и размером', () => {
    render(
      <Button variant="outline" size="lg">
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'border-indigo-700 text-indigo-700 bg-background h-11 rounded-md px-8'
    );
  });

  it('Корректно отображается при загрузке', () => {
    render(<Button loading>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('Click me')).toHaveClass('opacity-0');
  });

  it('Отображается правильно при отключении', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      'disabled:pointer-events-none disabled:opacity-50'
    );
  });

  it('Обрабатывает события onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Пересылает ref на корневой элемент Button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).not.toBeNull();
  });
});
