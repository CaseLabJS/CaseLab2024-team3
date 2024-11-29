import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './Table';
import { createRef } from 'react';

describe('UI Table', () => {
  it('Отображает компонент таблицы', () => {
    const ref = createRef<HTMLTableElement>();
    const { container } = render(<Table ref={ref} className="test-class" />);
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('table')).toHaveClass('test-class');
  });

  it('Отображает компонент TableHeader', () => {
    const ref = createRef<HTMLTableSectionElement>();
    const { container } = render(
      <TableHeader ref={ref} className="test-class" />
    );
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('thead')).toHaveClass('test-class');
  });

  it('Отображает компонент TableBody', () => {
    const ref = createRef<HTMLTableSectionElement>();
    const { container } = render(
      <TableBody ref={ref} className="test-class" />
    );
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('tbody')).toHaveClass('test-class');
  });

  it('Отображает компонент TableFooter', () => {
    const ref = createRef<HTMLTableSectionElement>();
    const { container } = render(
      <TableFooter ref={ref} className="test-class" />
    );
    expect(container.querySelector('tfoot')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('tfoot')).toHaveClass('test-class');
  });

  it('Отображает компонент TableRow', () => {
    const ref = createRef<HTMLTableSectionElement>();
    const { container } = render(<TableRow ref={ref} className="test-class" />);
    expect(container.querySelector('tr')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('tr')).toHaveClass('test-class');
  });

  it('Отображает компонент TableHead', () => {
    const ref = createRef<HTMLTableCellElement>();
    const { container } = render(
      <TableHead ref={ref} className="test-class" />
    );
    expect(container.querySelector('th')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('th')).toHaveClass('test-class');
  });

  it('Отображает компонент TableCell', () => {
    const ref = createRef<HTMLTableCellElement>();
    const { container } = render(
      <TableCell ref={ref} className="test-class" />
    );
    expect(container.querySelector('td')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('td')).toHaveClass('test-class');
  });

  it('Отображает компонент TableCaption', () => {
    const ref = createRef<HTMLTableSectionElement>();
    const { container } = render(
      <TableCaption ref={ref} className="test-class" />
    );
    expect(container.querySelector('caption')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(container.querySelector('caption')).toHaveClass('test-class');
  });
});
