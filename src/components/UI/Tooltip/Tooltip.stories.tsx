import { Meta, StoryObj } from '@storybook/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'UI/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
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
    delayDuration: {
      control: {
        type: 'number',
      },
    },
    disableHoverableContent: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = ({ ...args }: TooltipPrimitive.TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    delayDuration: 0,
    defaultOpen: true,
    disableHoverableContent: false,
  },
};
