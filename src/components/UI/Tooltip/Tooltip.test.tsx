import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip';
import userEvent from '@testing-library/user-event';

describe('UI Tooltip', () => {
  it('Отображает TooltipTrigger и TooltipContent', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('Показывает TooltipContent при наведении курсора', async () => {
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    userEvent.hover(trigger);
    await waitFor(() => {
      expect(screen.queryAllByText('Tooltip content')[0]).toBeVisible();
    });
  });

  it('Скрывает TooltipContent при наведении мыши', async () => {
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    userEvent.hover(trigger);
    await waitFor(() => {
      expect(screen.queryAllByText('Tooltip content')[0]).toBeVisible();
    });

    userEvent.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText('Tooltip Content')).not.toBeInTheDocument();
    });
  });
});
