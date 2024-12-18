import { Link, NavLink } from 'react-router-dom';
import { FC, useState } from 'react';

import Logo from 'src/assets/Symbol.svg';
import { observer } from 'mobx-react-lite';
import { authStore, usersStore } from 'src/stores';
import { User } from './User';
import UpdatePasswordDialog from '@components/UpdatePasswordDialog/UpdatePasswordDialog';
import {
  Button,
  ButtonProps,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@components/UI';
import { Menu } from 'lucide-react';
import { SheetFooter } from '@components/UI/Sheet/Sheet';
import { cn } from '@/lib';

interface HeaderMenuProps extends ButtonProps {
  isUser: boolean | undefined;
  isAdmin: boolean | undefined;
}

const HeaderMenu: FC<HeaderMenuProps> = observer(
  ({ isUser, isAdmin, className, ...props }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              '[&_svg]:w-6 [&_svg]:h-6 [&_svg]:text-indigo-200 hover:bg-inherit',
              className
            )}
            {...props}
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <DialogTitle>
            <SheetHeader>
              <User className="[&_svg]:text-foreground [&_span]:text-foreground" />
            </SheetHeader>
          </DialogTitle>
          <div className="gap-4 py-4 flex-grow">
            <ul className="space-y-4 text-center">
              {isUser && (
                <li>
                  <Button className="w-full" variant="ghost">
                    <NavLink
                      to="app"
                      className="block py-2 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Панель пользователя
                    </NavLink>
                  </Button>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Button className="w-full" variant="ghost">
                    <NavLink
                      to="admin"
                      className="block py-2 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Панель администратора
                    </NavLink>
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <SheetFooter>
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                authStore.logout();
              }}
            >
              Выход
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
);

const Header = observer(() => {
  const hasRole = (roleName: string) =>
    usersStore.user?.roles.some(
      (roleUser) => typeof roleUser === 'object' && roleUser.name === roleName
    );

  const isUser = hasRole('USER');
  const isAdmin = hasRole('ADMIN');

  return (
    <header className="bg-bg-header h-header px-4 md:px-8 lg:px-16 xl:px-40">
      <nav className="py-2.5">
        <div className="flex justify-between items-center gap-2">
          <Link to={isUser ? '/' : '/admin'} className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="text-sm font-semibold text-white">
              CaseLab team3
            </span>
          </Link>

          {/* Десктопное меню */}
          {isUser && isAdmin && (
            <div className="hidden lg:text-sm lg:flex lg:items-center lg:space-x-8 xl:text-base">
              <NavLink
                to="app"
                className={({ isActive }) =>
                  `block py-2 text-white font-medium ${isActive && isUser && isAdmin ? 'decoration-2 rounded-lg underline underline-offset-[5px]' : 'hover:text-gray-200'}`
                }
              >
                Панель пользователя
              </NavLink>

              <NavLink
                to="admin"
                className={({ isActive }) =>
                  `block py-2 text-white font-medium ${isActive && isUser && isAdmin ? 'decoration-2 underline underline-offset-[5px]' : 'hover:text-gray-200'}`
                }
              >
                Панель администратора
              </NavLink>
            </div>
          )}

          {/* Блок пользователя */}
          <div className="flex items-center space-x-4">
            <User />

            {/* Кнопка выхода на десктопе */}
            {isUser && !isAdmin && <UpdatePasswordDialog />}
            <div className="hidden lg:block">
              <button
                className="border border-white text-white bg-transparent rounded-lg text-sm px-4 py-2 focus:ring-4 focus:ring-white/50 hover:bg-white/10"
                onClick={authStore.logout}
              >
                Выход
              </button>
            </div>

            {/* Кнопка для мобильного меню */}
            <HeaderMenu
              isUser={isUser}
              isAdmin={isAdmin}
              className="lg:hidden"
            />
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button> */}
          </div>
        </div>

        {/* Мобильное меню */}
        {/* {isMenuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 bg-bg-header text-white transform transition-transform duration-300 ease-in-out z-50">
            <div className="flex justify-between items-center p-4">
              <User />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl focus:outline-none"
              >
                &times;
              </button>
            </div>
            <ul className="mt-10 space-y-4 text-center">
              {hasRole('USER') && (
                <li>
                  <NavLink
                    to="app"
                    className="block py-2 text-white font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Панель пользователя
                  </NavLink>
                </li>
              )}
              {hasRole('ADMIN') && (
                <li>
                  <NavLink
                    to="admin"
                    className="block py-2 text-white font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Панель администратора
                  </NavLink>
                </li>
              )}

              <li>
                <button
                  className="w-full border border-white text-white bg-transparent rounded-lg font-medium text-sm px-4 py-2"
                  onClick={authStore.logout}
                >
                  Выход
                </button>
              </li>
            </ul>
          </div>
        )} */}
      </nav>
    </header>
  );
});

export default Header;
