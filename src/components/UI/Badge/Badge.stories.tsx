import { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
  args: {
    children: 'Badge Text',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variant: Story = {
  args: {
    variant: 'default',
  },
};
