import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ViewState } from '../types';
import { Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isDark: boolean;
  toggleTheme: () => void;
  showNotification: (msg: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, isDark, toggleTheme, showNotification }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Armario', value: 'DASHBOARD' as ViewState },
    { label: 'Generador', value: 'GENERATOR' as ViewState },
    { label: 'Planes', value: 'PLANS' as ViewState },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* Sticky Banner - Top */}
      <div className="bg-black text-white dark:bg-white dark:text-black text-[10px] md:text-xs font-mono py-2 text-center uppercase tracking-widest sticky top-0 z-[60]">
        Modai AI v2.0 — El Futuro del Estilo Personal ya está aquí
      </div>

      {/* Grid Navbar */}
      <header className="sticky top-8 z-50 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-2 md:p-3 rounded-2xl flex justify-between items-center pointer-events-auto shadow-sm">
            
            <div className="flex items-center gap-8 pl-2">
               <div className="cursor-pointer" onClick={() => handleNavClick('LANDING')}>
                  <Logo className="h-6" />
               </div>
               
               {/* Desktop Nav */}
               <nav className="hidden md:flex items-center gap-1">
                 {currentView !== 'LANDING' && currentView !== 'AUTH' && navItems.map((item) => (
                   <button
                     key={item.value}
                     onClick={() => handleNavClick(item.value)}
                     className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                       currentView === item.value 
                         ? 'bg-gray-100 dark:bg-white/10 font-bold' 
                         : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                     }`}
                   >
                     {item.label}
                   </button>
                 ))}
               </nav>
            </div>

            <div className="flex items-center gap-3">
               <button 
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              {currentView === 'LANDING' || currentView === 'AUTH' ? (
                 <button 
                  onClick={() => setView('AUTH')}
                  className="hidden md:flex items-center gap-2 bg-[#38b6ff] hover:bg-[#2da0e5] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                 >
                   Acceder <ArrowRight className="w-3 h-3" />
                 </button>
              ) : (
                <button onClick={() => setView('PROFILE')} className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                   <img src="https://picsum.photos/100" className="w-full h-full object-cover" alt="Profile" />
                </button>
              )}

              {/* Mobile Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-white/10 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 pt-32 px-6 flex flex-col gap-8 animate-fade-in">
           {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className="text-4xl font-display font-bold text-left border-b border-gray-100 dark:border-white/10 pb-4"
              >
                {item.label}
              </button>
           ))}
           <button onClick={() => handleNavClick('AUTH')} className="text-4xl font-display font-bold text-left text-[#38b6ff] pb-4">
             Iniciar Sesión
           </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-8 relative z-0">
        {children}
      </main>

      {/* Technical Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#080808] py-20 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-12">
           <div className="col-span-2">
             <Logo className="h-6 mb-6 opacity-50 grayscale" />
             <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed">
               MODAI SYSTEMS &copy; 2024.<br/>
               ENGINEERED IN EUROPE.<br/>
               POWERED BY GOOGLE GEMINI AI.
             </p>
           </div>
           
           <div>
             <h4 className="font-mono text-xs text-gray-400 mb-6 uppercase">Plataforma</h4>
             <ul className="space-y-3 text-sm font-medium">
               <li><button onClick={() => setView('GENERATOR')} className="hover:text-[#38b6ff] transition">Motor de IA</button></li>
               <li><button onClick={() => setView('PLANS')} className="hover:text-[#38b6ff] transition">Suscripciones</button></li>
               <li><button onClick={() => showNotification('API Docs coming soon')} className="hover:text-[#38b6ff] transition">API</button></li>
             </ul>
           </div>

           <div>
             <h4 className="font-mono text-xs text-gray-400 mb-6 uppercase">Legal</h4>
             <ul className="space-y-3 text-sm font-medium">
               <li><button onClick={() => showNotification('Privacidad')} className="hover:text-[#38b6ff] transition">Privacidad de Datos</button></li>
               <li><button onClick={() => showNotification('Términos')} className="hover:text-[#38b6ff] transition">Términos de uso</button></li>
             </ul>
           </div>
        </div>
      </footer>
    </div>
  );
};