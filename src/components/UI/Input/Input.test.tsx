import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';
import { createRef } from 'react';

describe('UI Input', () => {
  it('Рендерится без сбоев', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('Принимает и отображает входное значение', () => {
    render(<Input defaultValue="test value" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('test value');
  });

  it('Вызывает обработчик onChange при изменении значения', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await userEvent.type(inputElement, 'new value');
    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue('new value');
  });

  it('Применяет пользовательский className', () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('Отключено, когда отключенное свойство имеет значение true', () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  it('Пересылает ref на корневой элемент Input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
