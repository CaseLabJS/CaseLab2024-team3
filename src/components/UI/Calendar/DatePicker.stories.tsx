import { Meta, StoryObj } from '@storybook/react';
import Datepicker from './DatePicker';
import { useState } from 'react';

const meta = {
  tags: ['autodocs'],
  title: 'UI/Datepicker',
  component: Datepicker,
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>();
    return (
      <>
        <Datepicker getSelectedDate={setDate} />
        {date && <div>{date.toString()}</div>}
      </>
    );
  },
};
