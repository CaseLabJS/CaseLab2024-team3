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
    <section className="h-layout flex relative px-4 md:px-8 lg:px-40">
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
          <SidebarTrigger />
          <Outlet />
        </Suspense>
      </SidebarProvider>
    </section>
  );
};

export default UserDashboardPage;
