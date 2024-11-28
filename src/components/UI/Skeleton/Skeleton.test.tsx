import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('UI Skeleton', () => {
  it('Рендерится без сбоев', () => {
    const { container } = render(<Skeleton />);
    expect(container).toBeInTheDocument();
  });

  it('Применяет классы по умолчанию', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass(
      'animate-pulse rounded-md bg-primary/10'
    );
  });

  it('Применяет дополнительные классы', () => {
    const { container } = render(<Skeleton className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('Передает дополнительные реквизиты', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'skeleton');
  });
});
