import React from 'react';
import { Outfit, ViewState } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Share2, Heart, ShoppingBag, Check } from 'lucide-react';

interface ResultsProps {
  outfit: Outfit;
  setView: (view: ViewState) => void;
  showNotification: (msg: string) => void;
}

export const Results: React.FC<ResultsProps> = ({ outfit, setView, showNotification }) => {
  
  const handleSave = () => {
    showNotification("Outfit guardado en tu armario");
    setTimeout(() => setView('DASHBOARD'), 1000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 pt-4 animate-fade-in">
      
      {/* Navigation Bar */}
      <div className="flex justify-between items-center py-6 mb-8 border-b border-gray-100 dark:border-white/10">
         <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-xs font-mono uppercase hover:text-[#38b6ff] transition-colors">
           <ArrowLeft className="w-4 h-4" /> 
           Volver
         </button>
         <div className="flex gap-2">
            <button className="p-2 border border-gray-200 dark:border-white/10 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors" onClick={() => showNotification('Compartido')}>
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 dark:border-white/10 rounded hover:text-red-500 transition-colors" onClick={() => showNotification('Like')}>
              <Heart className="w-4 h-4" />
            </button>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left Column: Visuals */}
        <div className="lg:col-span-7">
           <div className="grid grid-cols-2 gap-4">
              {/* Main big image */}
              <div className="col-span-2 aspect-[4/5] bg-gray-100 dark:bg-[#111] rounded-lg overflow-hidden relative">
                <img src={outfit.items[0].imageUrl} className="w-full h-full object-cover" alt="Main" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white px-3 py-1 text-xs font-mono uppercase">
                  Pieza Principal
                </div>
              </div>
              {/* Secondary images */}
              {outfit.items.slice(1).map((item, i) => (
                 <div key={i} className="aspect-square bg-gray-100 dark:bg-[#111] rounded-lg overflow-hidden relative group">
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} />
                 </div>
              ))}
           </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 flex flex-col justify-center">
           <div className="sticky top-24">
             <div className="mb-8">
               <span className="text-[#38b6ff] font-mono text-xs uppercase tracking-widest mb-2 block">{outfit.occasion} Mode</span>
               <h1 className="text-5xl md:text-6xl font-black font-display leading-[0.9] mb-6">{outfit.title}</h1>
               <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                 {outfit.description}
               </p>
             </div>

             <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-lg border-l-2 border-[#f27100] mb-10">
               <h4 className="font-mono text-xs uppercase text-gray-400 mb-2">Análisis de IA</h4>
               <p className="italic text-gray-700 dark:text-gray-300">"{outfit.explanation}"</p>
             </div>

             <div className="space-y-4 mb-10">
               <h3 className="font-bold font-display uppercase text-sm border-b border-gray-200 dark:border-white/10 pb-2">Prendas Seleccionadas</h3>
               {outfit.items.map((item, i) => (
                 <div key={i} className="flex justify-between items-center group cursor-pointer hover:pl-2 transition-all">
                   <div className="flex items-center gap-3">
                     <span className="font-mono text-xs text-gray-400">0{i+1}</span>
                     <div>
                       <p className="text-xs font-bold uppercase text-gray-500 mb-0.5">{item.brand}</p>
                       <p className="font-medium">{item.name}</p>
                     </div>
                   </div>
                   <ShoppingBag className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
                 </div>
               ))}
             </div>

             <Button fullWidth size="xl" onClick={handleSave} className="bg-black text-white dark:bg-white dark:text-black rounded-lg h-14 text-sm uppercase tracking-widest hover:opacity-90">
               Guardar este Look
             </Button>
           </div>
        </div>

      </div>
    </div>
  );
};