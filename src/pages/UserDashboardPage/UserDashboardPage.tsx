import { Outlet } from 'react-router-dom';
import HeaderDashboard from '@components/HeaderDashboard/HeaderDashboard';

const UserDashboardPage = () => {
  return (
    <section className="h-[calc(100vh-140px)]">
      <HeaderDashboard />
      <div className="px-4 md:px-8 lg:px-40">
        UserDashboardPage
      </div>
      <Outlet />
    </section>
  );
};

export default UserDashboardPage;
