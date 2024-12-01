import { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';
import React, { useState } from 'react';

interface TemplateControlProps {
  defaultValue?: number;
  maxPage?: number;
}

const meta = {
  title: 'UI/Pagination',
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: React.ComponentProps<'nav'>) => {
  return (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>1</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton isActive>2</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>3</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const Default: Story = {
  render: Template,
};

const TemplateControl = ({
  defaultValue = 1,
  maxPage,
  ...args
}: React.ComponentProps<'nav'> & TemplateControlProps) => {
  const [currentPage, setCurrentPage] = useState<number>(defaultValue);
  const margin = 1;
  const totalPages = maxPage ?? 1;
  const numberOfPages = Math.ceil(totalPages / 1);
  const page = currentPage + 1;

  const shouldRender = (idx: number) =>
    idx == currentPage ||
    Math.abs(idx - currentPage) <= margin ||
    idx === numberOfPages - 1 ||
    idx === 0;

  const shouldRenderEllipsis = (idx: number) =>
    idx == currentPage || Math.abs(idx - currentPage) === margin + 1;

  return (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage <= 0}
          />
        </PaginationItem>
        {Array(numberOfPages)
          .fill(0)
          .map((_, i) => {
            return shouldRender(i) ? (
              <PaginationItem key={i}>
                <PaginationButton
                  isActive={page == i + 1 && true}
                  disabled={page == i + 1 && true}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </PaginationButton>
              </PaginationItem>
            ) : shouldRenderEllipsis(i) ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <React.Fragment key={i}></React.Fragment>
            );
          })}
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={page == totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const Control: Story & {
  args: TemplateControlProps;
} = {
  render: TemplateControl,
  args: {
    defaultValue: 1,
    maxPage: 10,
  },
};
