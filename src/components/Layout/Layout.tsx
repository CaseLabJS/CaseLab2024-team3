import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";

const Layout = () => {
  return (
    <main className='flex flex-col min-h-screen bg-bg-white'>
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
