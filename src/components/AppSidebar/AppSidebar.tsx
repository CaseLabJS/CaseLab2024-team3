import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/UI';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SidebarProps {
  menuItems: MenuItem[];
  sidebarName?: string;
}

export function AppSidebar({ menuItems, sidebarName }: SidebarProps) {
  const { pathname } = useLocation();
  const lastPart = pathname.split('/').filter(Boolean).pop();

  const [activeName, setActiveName] = useState(
    menuItems.find((item) => item.url === lastPart)?.title
  );

  return (
    <Sidebar
      collapsible="offcanvas"
      className="absolute h-[calc(100vh-130px)] ml-40"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeName === item.title}
                    onClick={() => setActiveName(item.title)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
