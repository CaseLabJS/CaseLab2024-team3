import { Meta } from '@storybook/react';
import { Card, CardContent, CardFooter, CardHeader } from './Card';

export default {
  title: 'UI/Card',
  tags: ['autodocs'],
  component: Card,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Card>;

const Template = (args: React.HTMLAttributes<HTMLDivElement>) => (
  <Card {...args} className="max-w-md">
    <CardContent>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
    </CardContent>
  </Card>
);

const WithDividerTemplate = (args: React.HTMLAttributes<HTMLDivElement>) => (
  <Card {...args} className="max-w-md">
    <CardHeader className="border-b border-divider">
      <strong>Description</strong>
    </CardHeader>
    <CardContent className="py-8">
      <p>
        The Object constructor creates an object wrapper for the given value.
      </p>
    </CardContent>
    <CardFooter className="border-t border-divider">
      <p>
        When called in a non-constructor context, Object behaves identically to{' '}
      </p>
    </CardFooter>
  </Card>
);

export const Default = {
  render: Template,
};

export const WithDivider = {
  render: WithDividerTemplate,
};
