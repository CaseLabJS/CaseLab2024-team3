import { Meta, StoryObj } from '@storybook/react';
import { ModeToggle } from './ThemeToggle';
import { ThemeProvider } from './ThemeProvider';

const meta = {
  tags: ['autodocs'],
  title: 'Component/ModeToggle',
  component: ModeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider storageKey="test-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
