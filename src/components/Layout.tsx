import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEVELOPERS } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, theme, toggleTheme, language, setLanguage, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-modai-orange font-bold' : 'text-gray-700 dark:text-gray-300 hover:text-modai-blue';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Marquee Header */}
      <div className="bg-black text-white py-1 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block text-xs uppercase tracking-widest">
          MODAI — OUTFITS PERFECTOS, CERO ESFUERZO — NUEVA COLECCIÓN DISPONIBLE — MODAI — ÚNETE AL FUTURO DE LA MODA — MODAI — OUTFITS PERFECTOS, CERO ESFUERZO
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white dark:bg-black shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-modai-blue rounded-full mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="font-bold text-2xl tracking-tighter dark:text-white">
                  MODAI<span className="text-modai-orange">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>{t.nav.home}</Link>
              <Link to="/generator" className={isActive('/generator')}>{t.nav.generator}</Link>
              <Link to="/shop" className={isActive('/shop')}>{t.nav.shop}</Link>
              
              {user ? (
                 <>
                  <Link to="/profile" className={isActive('/profile')}>{t.nav.profile}</Link>
                  <button onClick={logout} className="text-gray-500 hover:text-red-500 text-sm">
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                 </>
              ) : (
                <Link to="/login" className="bg-modai-blue text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                  {t.nav.login}
                </Link>
              )}

              {/* Controls */}
              <div className="flex items-center space-x-4 border-l pl-4 dark:border-gray-700">
                <button onClick={toggleTheme} className="text-gray-600 dark:text-yellow-400">
                  <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
                <div className="relative group">
                  <button className="text-sm font-bold uppercase text-gray-600 dark:text-gray-300">
                    {language}
                  </button>
                  <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 shadow-xl rounded-md overflow-hidden hidden group-hover:block border dark:border-gray-700">
                    <button onClick={() => setLanguage('es')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">Español</button>
                    <button onClick={() => setLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">English</button>
                    <button onClick={() => setLanguage('cn')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">中文</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 dark:text-white text-xl">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-base font-medium dark:text-white">{t.nav.home}</Link>
              <Link to="/generator" className="block px-3 py-2 text-base font-medium dark:text-white">{t.nav.generator}</Link>
              <Link to="/shop" className="block px-3 py-2 text-base font-medium dark:text-white">{t.nav.shop}</Link>
              {user ? (
                <Link to="/profile" className="block px-3 py-2 text-base font-medium dark:text-white">{t.nav.profile}</Link>
              ) : (
                <Link to="/login" className="block px-3 py-2 text-base font-medium dark:text-white">{t.nav.login}</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold mb-4">MODAI<span className="text-modai-orange">.</span></h3>
              <p className="text-gray-400 text-sm">{t.hero.subtitle}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-modai-blue inline-block">{t.footer.about}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Modai revoluciona la forma de vestir combinando las mejores marcas con tecnología de selección inteligente.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-modai-blue inline-block">{t.footer.devs}</h4>
              <ul className="space-y-3">
                {DEVELOPERS.map((dev, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <img src={dev.img} alt={dev.name} className="w-8 h-8 rounded-full border border-gray-600"/>
                    <div>
                      <p className="text-xs font-bold text-white">{dev.name}</p>
                      <p className="text-xs text-modai-blue">{dev.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 border-b-2 border-modai-blue inline-block">Social</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
                <a href="https://x.com/" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
                <a href="https://facebook.com/" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook"></i></a>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <a href="#" className="text-xs text-gray-500 hover:text-white">{t.footer.privacy}</a>
                <a href="#" className="text-xs text-gray-500 hover:text-white">{t.footer.terms}</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs text-gray-600">&copy; 2023 Modai Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};