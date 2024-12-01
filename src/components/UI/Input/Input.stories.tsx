import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../Label';
import { Button } from '../Button';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export const Disabled: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
    disabled: true,
  },
};

const InputWithLabel = () => {
  return (
    <>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </>
  );
};
const InputWithButton = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
};

export const WithLabel: Story = {
  render: InputWithLabel,
  args: {
    type: 'email',
    placeholder: 'Email',
    disabled: true,
  },
};
export const WithButton: Story = {
  render: InputWithButton,
  args: {
    type: 'email',
    placeholder: 'Email',
    disabled: true,
  },
};
