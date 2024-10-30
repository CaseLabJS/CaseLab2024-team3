import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import Logo from '../../assets/Symbol.svg';
import User from '../../assets/User.svg';

const Header = () => { //TODO: Нужно при авторизации передавать в header имя пользователя,в последствии поменять { userName }: { userName: string }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
          <header className="bg-[#283593]">
            <nav className="border-gray-200 py-2.5">
                <div className="flex justify-between items-center mx-3.5">

                    <Link to="/" className="flex items-center">
                        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        <span className="text-sm font-semibold text-white">CaseLab team3</span>
                    </Link>

                    {/* Десктопное меню */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-8">
                      <NavLink to="app" className="block py-2 text-white font-medium" onClick={() => setIsMenuOpen(false)}>
                        UserDashboard
                      </NavLink>
                      <NavLink to="admin" className="block py-2 text-white font-medium" onClick={() => setIsMenuOpen(false)}>
                        Admin
                      </NavLink>
                    </div>

                    {/* Блок пользователя */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <img src={User} alt="User Icon" className="w-7 h-7" />
                            <span className="text-white text-sm">Иванов А.А.</span>
                        </div>

                        {/* Кнопка выхода на десктопе */}
                        <div className="hidden lg:block">
                            <button
                                className="border border-white text-white bg-transparent rounded-lg text-sm px-4 py-2 focus:ring-4 focus:ring-white/50 hover:bg-white/10"
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
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
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
                            <li>
                                <NavLink to="app" className="block py-2 text-white font-medium" onClick={() => setIsMenuOpen(false)}>
                                    UserDashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="admin" className="block py-2 text-white font-medium" onClick={() => setIsMenuOpen(false)}>
                                    Admin
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className="w-full border border-white text-white bg-transparent rounded-lg font-medium text-sm px-4 py-2"
                                    onClick={() => setIsMenuOpen(false)}
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
};

export default Header;
