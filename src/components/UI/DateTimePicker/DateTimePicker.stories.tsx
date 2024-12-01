import { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from './DateTimePicker';

const meta = {
  tags: ['autodocs'],
  title: 'UI/DateTimePicker',
  component: DateTimePicker,
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setDeadline: (deadline: Date | undefined) => {
      console.log(deadline);
    },
    deadline: new Date(),
  },
};
