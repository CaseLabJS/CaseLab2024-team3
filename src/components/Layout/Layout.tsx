import { authStore } from '@/stores';
import { Toaster } from '@components/Toaster/Toaster';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';

const Layout = observer(() => {
  if (!authStore.isAuth)
    return (
      <main className="flex flex-col min-h-screen">
      <div className="flex flex-grow flex-col">
        <Outlet />
      </div>
      <Toaster />
    </main>
    )

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow flex-col">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </main>
  );
});

export default Layout;
