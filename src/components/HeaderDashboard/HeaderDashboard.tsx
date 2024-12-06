import { NavLink } from 'react-router-dom';

const HeaderDashboard = () => {
  return (
    <header className="h-[50px] bg-[#5867e2] px-4 md:px-8 lg:px-16 xl:px-40">
      <nav className="flex space-x-4 ">
        <NavLink
          className="block py-2 text-white font-medium mt-1"
          to="documents"
        >
          Documents
        </NavLink>
        <NavLink className="block py-2 text-white font-medium mt-1" to="users">
          Users
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
