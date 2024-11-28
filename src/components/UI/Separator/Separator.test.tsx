import { render } from '@testing-library/react';
import { Separator } from './Separator';
import { describe, it, expect } from 'vitest';

describe('UI Separator', () => {
  it('Рендер Separator компонент', () => {
    const { container } = render(<Separator />);
    expect(container).toBeInTheDocument();
  });

  it('Имеет правильный класс по умолчанию', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass(
      'shrink-0 bg-border h-[1px] w-full'
    );
  });

  it('Применяет дополнительные имена классов', () => {
    const { container } = render(<Separator className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('Отображает children правильно', () => {
    const { getByText } = render(<Separator>Test Content</Separator>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('Отображает ориентацию', () => {
    let separator = render(<Separator orientation="horizontal" />);
    expect(separator.container.firstChild).toHaveClass('h-[1px] w-full');

    separator = render(<Separator orientation="vertical" />);
    expect(separator.container.firstChild).toHaveClass('h-full w-[1px]');
  });
});
