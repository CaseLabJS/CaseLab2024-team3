import { Meta, StoryObj } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import { Button } from '../Button';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: {
    onOpenChange: () => { },
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
    }
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
);

const Template = (args: AlertDialogProps) => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex gap-2">
      <Button onClick={() => setActive(true)}>Open</Button>
      <AlertDialog open={active} onOpenChange={setActive} {...args}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Inner trigger</Button>
        </AlertDialogTrigger>
        {content}
      </AlertDialog>
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};
