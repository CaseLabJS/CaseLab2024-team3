import { Meta, StoryObj } from '@storybook/react';
import * as ToastPrimitives from '@radix-ui/react-toast';

import React from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  toastVariants,
  ToastViewport,
} from './Toast';
import { VariantProps } from 'class-variance-authority';

const meta = {
  title: 'UI/Toast',
  tags: ['autodocs'],
  component: Toast,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'destructive'],
    },
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = ({
  ...args
}: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>) => {
  return (
    <ToastProvider>
      <ToastViewport />
      <Toast {...args}>
        <ToastTitle>Test Title</ToastTitle>
        <ToastDescription>Test Description</ToastDescription>
        <ToastClose />
      </Toast>
    </ToastProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    open: true,
  },
};
