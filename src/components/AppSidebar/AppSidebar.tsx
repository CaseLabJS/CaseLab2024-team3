import { documentsStore, usersStore } from '@/stores';
import {
  Badge,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@components/UI';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  id?: number;
}

interface SidebarProps {
  menuItems: MenuItem[];
  sidebarName?: string;
}

export const AppSidebar: FC<SidebarProps> = observer(
  ({ menuItems, sidebarName }) => {
    const { setOpenMobile } = useSidebar();
    const { pathname } = useLocation();
    const lastPart = pathname.split('/').filter(Boolean).pop();

    const [activeName, setActiveName] = useState(
      menuItems.find((item) => item.url === lastPart)?.title
    );

    useEffect(() => {
      setActiveName(menuItems.find((item) => item.url === lastPart)?.title);
    }, [lastPart, menuItems]);

    useEffect(() => {
      if (
        usersStore.user?.roles.some(
          (role) => typeof role === 'object' && role.name === 'USER'
        )
      ) {
        void documentsStore.fetchDocuments(0, 100, 'owner');
        void documentsStore.fetchDocumentsForSign(0, 100, 'signer', 'after_signer');
        void documentsStore.fetchDocumentsForSign(0, 100, 'signer', 'before_signer');
        void documentsStore.fetchDocumentsForSign(0, 100, 'owner', 'before_signer');
      }
    }, []);

    const quantityMapping: Record<number, number> = {
      1: documentsStore.paginationDocuments?.totalElements || 0,
      2: documentsStore.paginationDocumentsSentForSign?.totalElements || 0,
      3: documentsStore.paginationDocumentsForSign?.totalElements || 0,
      4: documentsStore.paginationDocumentsAfterSign?.totalElements || 0,
    };

    return (
      <Sidebar
        collapsible="offcanvas"
        className="absolute h-layout md:ml-8 lg:ml-16 xl:ml-40"
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
                      onClick={() => {
                        setActiveName(item.title);
                        setOpenMobile(false);
                      }}
                      className="py-5"
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <div className="mr-auto">{item.title}</div>
                        {item.id && (
                          <Badge className="bg-slate-500">
                            {quantityMapping[item.id]}
                          </Badge>
                        )}
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
);
