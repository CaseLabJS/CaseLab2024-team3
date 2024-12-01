import { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
  tags: ['autodocs'],
  title: 'Component/Logo',
  component: Logo,
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
