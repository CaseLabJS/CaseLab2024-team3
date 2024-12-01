import { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from '../Button';
import { PopoverProps } from '@radix-ui/react-popover';
import { Label } from '../Label';
import { Input } from '../Input';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    onOpenChange: () => {},
  },
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
    },
    modal: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <PopoverContent>
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxHeight">Max. height</Label>
          <Input
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  </PopoverContent>
);

const Template = (args: PopoverProps) => {
  return (
    <div className="flex gap-2">
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant="outline">Trigger</Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};
