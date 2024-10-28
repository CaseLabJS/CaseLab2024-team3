import { NavLink } from "react-router-dom";

const HeaderDashboard = () => {
  return (
    <header className='h-[50px] bg-light-blue'>
      HEADER DASHBOARD
      <nav>
        <NavLink className='text-bg-white mr-5' to='documents'>
          documents
        </NavLink>{" "}
        <NavLink className='text-bg-white' to='users'>
          users
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
