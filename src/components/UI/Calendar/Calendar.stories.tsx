import { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  tags: ['autodocs'],
  title: 'UI/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
