import { AppSidebar } from '@components/AppSidebar/AppSidebar';
import { Spinner } from '@components/UI';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@components/UI/Sidebar/Sidebar';
import { userMenuItems } from '@constants/sideBar';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <section className="h-layout flex relative px-4 md:px-8 lg:px-16 xl:px-40">
      <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <AppSidebar
          sidebarName="Панель пользователя"
          menuItems={userMenuItems}
        />
        <Suspense
          fallback={
            <div className="flex justify-center items-center flex-grow h-full">
              <Spinner />
            </div>
          }
        >
          <SidebarTrigger className="absolute md:static top-1 left-1" />
          <Outlet />
        </Suspense>
      </SidebarProvider>
    </section>
  );
};

export default UserDashboardPage;
