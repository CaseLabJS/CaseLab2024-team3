import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './Card';

describe('UI Card', () => {
  it('корректно отображает компонент «Card»', () => {
    const { container } = render(
      <Card className="custom-class">Card Content</Card>
    );
    expect(container.firstChild).toHaveClass(
      'rounded-lg border bg-card text-card-foreground shadow-sm custom-class'
    );
    expect(container.firstChild).toHaveTextContent('Card Content');
  });

  it('Корректно отображает компонент CardHeader', () => {
    const { container } = render(
      <CardHeader className="custom-class">Header Content</CardHeader>
    );
    expect(container.firstChild).toHaveClass(
      'flex flex-col space-y-1.5 p-6 custom-class'
    );
    expect(container.firstChild).toHaveTextContent('Header Content');
  });

  it('Корректно отображает компонент CardTitle', () => {
    const { container } = render(
      <CardTitle className="custom-class">Title Content</CardTitle>
    );
    expect(container.firstChild).toHaveClass(
      'text-2xl font-semibold leading-none tracking-tight custom-class'
    );
    expect(container.firstChild).toHaveTextContent('Title Content');
  });

  it('Корректно отображает компонент CardDescription', () => {
    const { container } = render(
      <CardDescription className="custom-class">
        Description Content
      </CardDescription>
    );
    expect(container.firstChild).toHaveClass(
      'text-sm text-muted-foreground custom-class'
    );
    expect(container.firstChild).toHaveTextContent('Description Content');
  });

  it('Корректно отображает компонент CardContent', () => {
    const { container } = render(
      <CardContent className="custom-class">Content</CardContent>
    );
    expect(container.firstChild).toHaveClass('p-6 pt-0 custom-class');
    expect(container.firstChild).toHaveTextContent('Content');
  });

  it('Корректно отображает компонент CardFooter', () => {
    const { container } = render(
      <CardFooter className="custom-class">Footer Content</CardFooter>
    );
    expect(container.firstChild).toHaveClass(
      'flex items-center p-6 pt-0 custom-class'
    );
    expect(container.firstChild).toHaveTextContent('Footer Content');
  });
});
