import { Toaster } from '@components/Toaster/Toaster';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen bg-bg-white">
      <Header />
      <div className="flex flex-grow flex-col">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </main>
  );
};

export default Layout;
