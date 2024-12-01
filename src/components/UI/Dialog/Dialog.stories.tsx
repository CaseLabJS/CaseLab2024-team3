import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import { DialogProps } from '@radix-ui/react-dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);

const Template = (args: DialogProps) => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex gap-2">
      <Button onClick={() => setActive(true)}>Open</Button>
      <Dialog open={active} onOpenChange={setActive} {...args}>
        <DialogTrigger asChild>
          <Button variant="outline">Inner trigger</Button>
        </DialogTrigger>
        {content}
      </Dialog>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};
