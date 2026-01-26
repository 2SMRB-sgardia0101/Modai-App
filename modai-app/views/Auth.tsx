import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ArrowLeft } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-black flex animate-fadeIn">
      
      {/* Image Panel (Cover) */}
      <div className="hidden lg:block w-[60%] relative overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" 
          alt="Fashion Editorial" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        
        <div className="absolute top-12 left-12">
           <Logo className="h-8 filter invert" />
        </div>

        <div className="absolute bottom-20 left-12 max-w-xl text-white">
          <h2 className="text-8xl font-black font-display mb-4 leading-none tracking-tighter">
            MODAI<br/><span className="text-[#38b6ff]">ID.</span>
          </h2>
          <p className="text-2xl font-light border-l-4 border-[#f27100] pl-6 py-2">
            "Outfits perfectos, cero esfuerzo."
          </p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 lg:p-24 relative bg-white dark:bg-black">
        <button onClick={() => window.location.reload()} className="absolute top-8 left-8 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="w-full max-w-sm mx-auto animate-slideUp">
          <div className="mb-12">
            <h1 className="text-4xl font-bold font-display mb-3 text-gray-900 dark:text-white tracking-tight">
              {isLogin ? 'Iniciar Sesión' : 'Unirse a Modai'}
            </h1>
            <p className="text-gray-500 text-lg">
              {isLogin ? 'Accede a tu estudio de estilo personal.' : 'Comienza tu viaje de estilo hoy.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {!isLogin && (
              <div className="group">
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/20 py-4 text-lg outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-400" 
                  placeholder="Nombre Completo" 
                />
              </div>
            )}
            
            <div className="group">
              <input 
                type="email" 
                className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/20 py-4 text-lg outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-400" 
                placeholder="Email" 
              />
            </div>

            <div className="group">
              <input 
                type="password" 
                className="w-full bg-transparent border-b-2 border-gray-200 dark:border-white/20 py-4 text-lg outline-none focus:border-[#38b6ff] transition-colors placeholder:text-gray-400" 
                placeholder="Contraseña" 
              />
            </div>

            <Button type="submit" fullWidth size="xl" className="mt-12 bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] transition-transform rounded-none">
              {isLogin ? 'ENTRAR' : 'REGISTRARSE'}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-gray-500 hover:text-[#38b6ff] transition-colors uppercase tracking-widest"
            >
              {isLogin ? 'Crear una cuenta nueva' : 'Ya tengo cuenta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};