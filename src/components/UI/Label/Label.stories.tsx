import { Meta, StoryObj } from '@storybook/react';
import { Label } from '../Label';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useId } from 'react';

const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Test Label',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const LabelWithCheckbox = (
  args: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
) => {
  const id = useId();
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id={id} />
      <Label htmlFor={id} {...args} />
    </div>
  );
};

export const WithCheckbox: Story = {
  render: LabelWithCheckbox,
  args: {},
};

const LabelWithRadio = (
  args: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
) => {
  const id = useId();
  return (
    <div className="flex items-center space-x-2">
      <input type="radio" id={id} />
      <Label htmlFor={id} {...args} />
    </div>
  );
};

export const WithRadio: Story = {
  render: LabelWithRadio,
  args: {},
};
