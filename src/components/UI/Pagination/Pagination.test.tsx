import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

describe('UI Pagination', () => {
  it('Рендер Pagination компонент', () => {
    render(<Pagination className="test-class" />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('test-class');
  });

  it('Рендер PaginationContent компонент', () => {
    render(<PaginationContent className="test-class" />);
    const ulElement = screen.getByRole('list');
    expect(ulElement).toBeInTheDocument();
    expect(ulElement).toHaveClass('test-class');
  });

  it('Рендер PaginationItem компонент', () => {
    render(<PaginationItem className="test-class" />);
    const liElement = screen.getByRole('listitem');
    expect(liElement).toBeInTheDocument();
    expect(liElement).toHaveClass('test-class');
  });

  it('Рендер PaginationButton компонент', () => {
    render(<PaginationButton isActive className="test-class" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('test-class');
    expect(buttonElement).toHaveAttribute('aria-current', 'page');
  });

  it('Рендер PaginationPrevious компонент', () => {
    render(<PaginationPrevious className="test-class" />);
    const buttonElement = screen.getByRole('button', {
      name: /перейти на предыдущую страницу/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('test-class');
  });

  it('Рендер PaginationNext компонент', () => {
    render(<PaginationNext className="test-class" />);
    const buttonElement = screen.getByRole('button', {
      name: /перейти на следующую страницу/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('test-class');
  });

  it('Рендер PaginationEllipsis компонент', () => {
    render(<PaginationEllipsis className="test-class" />);
    const spanElement = screen.getByText(/больше страниц/i);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass('sr-only');
  });
});
