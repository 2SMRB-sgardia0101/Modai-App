import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Zap, Globe, Cpu } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onDemo: () => void;
  onLearnMore: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted, onDemo, onLearnMore }) => {
  return (
    <div className="w-full">
      
      {/* Hero Section with Grid Layout */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 pt-10 lg:pt-20 border-b border-gray-200 dark:border-white/10 pb-20">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pr-12">
             <div className="font-mono text-[#38b6ff] text-xs uppercase tracking-widest mb-6">
               ● Sistema de Estilo Inteligente
             </div>
             
             {/* Massive Slogan - No Overlap */}
             <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black font-display tracking-tight text-black dark:text-white leading-[0.9] mb-8">
               OUTFITS<br/>
               PERFECTOS.<br/>
               <span className="text-gray-300 dark:text-gray-700">CERO ESFUERZO.</span>
             </h1>

             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed mb-10 border-l-2 border-[#f27100] pl-6">
               Tu asistente personal de moda. Analiza clima, agenda y preferencias para generar el look exacto en segundos.
             </p>

             <div className="flex flex-wrap gap-4">
               <Button onClick={onGetStarted} size="xl" className="bg-black text-white dark:bg-white dark:text-black rounded-lg px-8 hover:scale-[1.02] transition-transform">
                 Empezar Ahora
               </Button>
               <Button onClick={onDemo} variant="outline" size="xl" className="border-gray-300 dark:border-white/20 rounded-lg px-8 hover:bg-gray-50 dark:hover:bg-white/5">
                 Ver Demo
               </Button>
             </div>
          </div>

          {/* Right Visual - Grid safe, no absolute messing */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] bg-gray-100 dark:bg-[#111] rounded-2xl overflow-hidden mt-8 lg:mt-0">
             <img 
               src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
               alt="Modai Model"
             />
             
             {/* Floating Info Card - Safely positioned inside relative container */}
             <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md p-6 border border-gray-200 dark:border-white/10 rounded-xl">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Look Generado</p>
                     <h3 className="font-bold text-lg">Minimalista Urbano</h3>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-[#38b6ff] flex items-center justify-center text-white">
                     <Zap className="w-4 h-4" />
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Tech Specs Section - Bordered Grid */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-32">
        <div className="flex items-end justify-between mb-12">
           <h2 className="text-4xl font-bold font-display">Especificaciones</h2>
           <div className="hidden md:block w-32 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-l border-gray-200 dark:border-white/10">
           {[
             { title: 'Motor Gemini AI', desc: 'Procesamiento de lenguaje natural y visión para entender tu estilo.', icon: Cpu },
             { title: 'Inventario Global', desc: 'Conexión en tiempo real con catálogos de marcas top.', icon: Globe },
             { title: 'Generación < 1s', desc: 'Arquitectura optimizada para resultados instantáneos.', icon: Zap }
           ].map((item, i) => (
             <div key={i} className="p-10 border-r border-b border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
               <item.icon className="w-8 h-8 mb-6 text-gray-400 group-hover:text-[#38b6ff] transition-colors" />
               <h3 className="text-xl font-bold mb-3 font-display">{item.title}</h3>
               <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Big Call to Action */}
      <section className="bg-black text-white dark:bg-white dark:text-black py-32 text-center px-4">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-5xl md:text-7xl font-bold font-display mb-8 tracking-tighter">
             ELEVA TU ESTÁNDAR.
           </h2>
           <p className="text-xl text-gray-400 dark:text-gray-600 mb-12">
             Únete a los miles de usuarios que ya no pierden tiempo decidiendo qué ponerse.
           </p>
           <Button onClick={onGetStarted} size="xl" className="bg-[#38b6ff] hover:bg-[#2da0e5] text-white border-none rounded-full px-12 py-6 text-lg">
             Crear Cuenta Gratis
           </Button>
        </div>
      </section>

    </div>
  );
};