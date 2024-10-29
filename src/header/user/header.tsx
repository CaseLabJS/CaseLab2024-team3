import { useState } from 'react';
import Logo from '../../assets/Symbol.svg';
import User from '../../assets/User.svg';

import { Button } from "@/components/ui/button";

export default function Header({ userName }: { userName: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <nav className="bg-[#283593] border-gray-200 py-2.5">
                <div className="flex justify-between items-center mx-3.5">
                    <a href="#" className="flex items-center">
                        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        <span className="self-center text-sm font-semibold text-white">CaseLab team3</span>
                    </a>

                    {/* Десктопное меню*/}
                    <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:order-1">
                        <a
                            href="#"
                            className="text-white font-medium text-sm"
                        >
                            Документы
                        </a>
                    </div>

                    <div className="flex items-center lg:space-x-7 space-x-4 lg:order-2">
                        <a href="#" className="flex items-center space-x-2">
                            <img src={User} alt="User Icon" className="w-7 h-7" />
                            <span className="text-white text-sm relative" >{userName}</span>
                        </a>

                        <div className="hidden lg:block">
                            <Button
                                variant="outline"
                                className="border border-white text-white bg-transparent rounded-lg font-medium text-sm px-4 py-2 focus:outline-none focus:ring-4 focus:ring-white/50 dark:focus:ring-white/50 hover:bg-white/10"
                            >
                                Выход
                            </Button>
                        </div>

                        {/*Кнопка для мобильного меню */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center p-2 text-white rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/*Мобильное меню*/}
                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-[#283593] text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
                >
                    <div className="flex justify-between items-center p-4">
                        <span className="text-white font-medium">{userName}</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-2xl focus:outline-none"
                        >
                            &times;
                        </button>
                    </div>
                    <ul className="mt-10 space-y-4 text-center">
                        <li>
                            <a href="#" className="block py-2 text-white font-medium">
                                Документы
                            </a>
                        </li>
                        <li>
                            <Button
                                variant="outline"
                                className="w-full border border-white text-white bg-transparent rounded-lg font-medium text-sm px-4 py-2 focus:outline-none focus:ring-4 focus:ring-white/50 dark:focus:ring-white/50 hover:bg-white/10"
                            >
                                Выход
                            </Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

