import { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProps,
  SidebarProvider,
  SidebarHeader,
  SidebarProviderProps,
  SidebarFooter,
  SidebarGroupAction,
  SidebarTrigger,
} from './Sidebar';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
  User2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { useState } from 'react';
import { Button } from '../Button';

const meta = {
  title: 'UI/Sidebar',
  tags: ['autodocs'],
  args: {
    onOpenChange: () => {},
    open: true,
    defaultOpen: true,
    variant: 'sidebar',
    side: 'left',
  },
  argTypes: {
    defaultOpen: {
      control: {
        type: 'boolean',
      },
    },
    open: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['sidebar', 'floating', 'inset'],
    },
    side: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
    },
    collapsible: {
      control: {
        type: 'select',
      },
      options: ['offcanvas', 'icon', 'none'],
    },
  },
} satisfies Meta<SidebarProviderProps & SidebarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

const Template = ({
  side = 'left',
  variant = 'sidebar',
  collapsible,
  ...args
}: SidebarProviderProps & SidebarProps) => {
  return (
    <SidebarProvider {...args}>
      <SidebarTrigger />
      <Sidebar side={side} variant={variant} collapsible={collapsible}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export const Default: Story = {
  render: Template,
};

const SidebarHeaderTemplate = ({
  side = 'left',
  variant = 'sidebar',
  collapsible,
  ...args
}: SidebarProviderProps & SidebarProps) => {
  return (
    <SidebarProvider {...args}>
      <SidebarTrigger />
      <Sidebar side={side} variant={variant} collapsible={collapsible}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
    </SidebarProvider>
  );
};

export const Header: Story = {
  render: SidebarHeaderTemplate,
};

const SidebarFooterTemplate = ({
  side = 'left',
  variant = 'sidebar',
  collapsible,
  ...args
}: SidebarProviderProps & SidebarProps) => {
  return (
    <SidebarProvider {...args}>
      <SidebarTrigger />
      <Sidebar side={side} variant={variant} collapsible={collapsible}>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export const Footer: Story = {
  render: SidebarFooterTemplate,
};

const SidebarGroupTemplate = ({
  side = 'left',
  variant = 'sidebar',
  collapsible,
  ...args
}: SidebarProviderProps & SidebarProps) => {
  return (
    <SidebarProvider {...args}>
      <SidebarTrigger />
      <Sidebar side={side} variant={variant} collapsible={collapsible}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent></SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export const Group: Story = {
  render: SidebarGroupTemplate,
};

const SidebarControlTemplate = ({
  side = 'left',
  variant = 'sidebar',
  collapsible,
  open,
  ...args
}: SidebarProviderProps & SidebarProps) => {
  const [active, setActive] = useState(open);
  return (
    <>
      <Button
        className="fixed right-1/2 translate-x-1/2"
        onClick={() => setActive(!active)}
      >
        Trigger
      </Button>
      <SidebarProvider {...args} open={active} onOpenChange={setActive}>
        <SidebarTrigger />
        <Sidebar side={side} variant={variant} collapsible={collapsible}>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupAction>
                <Plus /> <span className="sr-only">Add Project</span>
              </SidebarGroupAction>
              <SidebarGroupContent></SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
};

export const Control: Story = {
  render: SidebarControlTemplate,
};
