import { Meta, StoryObj } from '@storybook/react';
import HeaderDashboard from './HeaderDashboard';

const meta = {
    title: 'Widget/HeaderDashboard',
    component: HeaderDashboard,
} satisfies Meta<typeof HeaderDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}