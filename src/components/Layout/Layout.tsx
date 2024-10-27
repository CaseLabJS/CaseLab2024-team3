import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";

const Layout = () => {
  return (
    <main className='h-screen, bg-bg-white'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
