import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('UI Badge', () => {
  it('Должно отображаться без сбоев', () => {
    const { container } = render(<Badge />);
    expect(container).toBeInTheDocument();
  });

  it('Должен отображать правильный текст', () => {
    const text = 'New';
    const { getByText } = render(<Badge>{text}</Badge>);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('Следует применять правильный класс на основе реквизитов', () => {
    const { container } = render(<Badge className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('Следует отображать с классом по умолчанию', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toHaveClass(
      'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80'
    );
  });

  it('Следует отображать с дополнительным классом, если он предоставлен', () => {
    const { container } = render(<Badge className="additional-class" />);
    expect(container.firstChild).toHaveClass('additional-class');
  });
});
