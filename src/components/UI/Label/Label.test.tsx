import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';
import { createRef } from 'react';

describe('UI Label', () => {
  it('Рендерится без сбоев', () => {
    const { getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('Применяет пользовательский className', () => {
    const { container } = render(
      <Label className="custom-class">Test Label</Label>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('Пересылает ref на корневой элемент Label', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref.current).not.toBeNull();
  });

  it('Применяет варианты классов', () => {
    const { container } = render(<Label>Test Label</Label>);
    expect(container.firstChild).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    );
  });
});
