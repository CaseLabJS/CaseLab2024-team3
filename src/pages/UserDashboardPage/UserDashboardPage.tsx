import { Outlet } from "react-router-dom";
import HeaderDashboard from "src/components/HeaderDashboard/HeaderDashboard";

const UserDashboardPage = () => {
  return (
    <section className='h-[calc(100vh-140px)]'>
      <HeaderDashboard />
      UserDashboardPage
      <Outlet />
    </section>
  );
};

export default UserDashboardPage;
