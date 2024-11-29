import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('UI Spinner', () => {
  it('Рендерится без сбоев', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Применяется класс размера по умолчанию', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('w-12 h-12 border-[5px]');
  });

  it('Применяется класс малых размеров, когда размер равен "sm"', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.firstChild).toHaveClass('w-4 h-4 border-[2px]');
  });

  it('Применяет дополнительные имена классов', () => {
    const { container } = render(<Spinner className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('Передает дополнительные реквизиты элементу span', () => {
    const { container } = render(<Spinner data-testid="spinner" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'spinner');
  });
});
