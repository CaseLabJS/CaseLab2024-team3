import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='h-[70px] bg-bg-header'>
      CaseLabJS team3
      <nav>
        <Link className='text-bg-white mr-5' to='app'>
          UserDashboard
        </Link>
        <Link className='text-bg-white' to='admin'>
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
