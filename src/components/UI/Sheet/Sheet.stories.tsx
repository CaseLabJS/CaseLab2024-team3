import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetContentProps,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { DialogProps as SheetProps } from '@radix-ui/react-dialog';
import { Label } from '../Label';
import { Input } from '../Input';

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  args: {
    onOpenChange: () => {},
  },
  argTypes: {
    side: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
    },
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
} satisfies Meta<SheetProps & SheetContentProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you&apos;re done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input id="username" value="@peduarte" className="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </>
);

const Template = ({ side, ...args }: SheetProps & SheetContentProps) => {
  return (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Trigger</Button>
      </SheetTrigger>
      <SheetContent side={side}>{content}</SheetContent>
    </Sheet>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};
