import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import Logo from 'src/assets/Symbol.svg';
import { observer } from 'mobx-react-lite';
import { authStore, usersStore } from 'src/stores';
import { User } from './User';
import DropdownMenuUser from '@components/DropdownMenuUser/DropdownMenuUser';
import UpdatePasswordDialog from '@components/UpdatePasswordDialog/UpdatePasswordDialog';

const Header = observer(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-[#283593] px-4 md:px-8 lg:px-40">
      <nav className="py-2.5">
        <div className="flex justify-between items-center ">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="text-sm font-semibold text-white">
              CaseLab team3
            </span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {usersStore.user &&
              usersStore.user.roles.some(
                (roleUser) => roleUser.name === 'USER'
              ) && (
                <NavLink
                  to="app"
                  className="block py-2 text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  UserDashboard
                </NavLink>
              )}
            {usersStore.user &&
              usersStore.user.roles.some(
                (roleUser) => roleUser.name === 'ADMIN'
              ) && (
                <NavLink
                  to="admin"
                  className="block py-2 text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </NavLink>
              )}
          </div>

          {/* Блок пользователя */}
          <div className="flex items-center space-x-4">
            <User />

            {/* Кнопка выхода на десктопе */}
            {usersStore.user &&
              usersStore.user.roles.some(
                (roleUser) => roleUser.name === 'USER'
              ) && (
                <>
                  {' '}
                  <UpdatePasswordDialog />
                </>
              )}
            <div className="hidden lg:block">
              <button
                className="border border-white text-white bg-transparent rounded-lg text-sm px-4 py-2 focus:ring-4 focus:ring-white/50 hover:bg-white/10"
                onClick={authStore.logout}
              >
                Выход
              </button>
            </div>

            {/* Кнопка для мобильного меню */}
            <button
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
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 bg-[#283593] text-white transform transition-transform duration-300 ease-in-out z-50">
            <div className="flex justify-between items-center p-4">
              <span className="text-white font-medium">Иванов А.А.</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl focus:outline-none"
              >
                &times;
              </button>
            </div>
            <ul className="mt-10 space-y-4 text-center">
              {usersStore.user &&
                usersStore.user.roles.some(
                  (roleUser) => roleUser.name === 'USER'
                ) && (
                  <li>
                    <NavLink
                      to="app"
                      className="block py-2 text-white font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      UserDashboard
                    </NavLink>
                  </li>
                )}
              {usersStore.user &&
                usersStore.user.roles.some(
                  (roleUser) => roleUser.name === 'ADMIN'
                ) && (
                  <li>
                    <NavLink
                      to="admin"
                      className="block py-2 text-white font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
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
        )}
      </nav>
    </header>
  );
});

export default Header;
