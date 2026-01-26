import React from 'react';
import { ViewState, Outfit } from '../types';
import { MOCK_OUTFITS } from '../constants';
import { Plus, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  setView: (view: ViewState) => void;
  generatedOutfit: Outfit | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView, generatedOutfit }) => {
  const outfits = generatedOutfit ? [generatedOutfit, ...MOCK_OUTFITS] : MOCK_OUTFITS;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 animate-slide-up">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-gray-200 dark:border-white/10 pb-8">
        <div>
           <p className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Colección Personal</p>
           <h1 className="text-5xl font-bold font-display">MI ARMARIO</h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden md:block">
             <p className="font-mono text-xs text-gray-500 uppercase">Clima Actual</p>
             <p className="font-bold">Madrid, 18°C</p>
           </div>
           <button 
             onClick={() => setView('GENERATOR')}
             className="w-12 h-12 bg-[#f27100] hover:bg-[#d16200] text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg shadow-orange-500/20"
           >
             <Plus className="w-6 h-6" />
           </button>
        </div>
      </div>

      {/* Strict Grid Layout - No overlaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* New Look Card */}
        <div 
          onClick={() => setView('GENERATOR')}
          className="aspect-[3/4] border border-dashed border-gray-300 dark:border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#38b6ff] hover:bg-[#38b6ff]/5 transition-all group"
        >
           <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#38b6ff] group-hover:scale-110 transition-transform mb-4">
             <Plus className="w-6 h-6" />
           </div>
           <p className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-[#38b6ff]">Generar Nuevo</p>
        </div>

        {/* Outfit Cards */}
        {outfits.map((outfit) => (
          <div 
            key={outfit.id} 
            className="group cursor-pointer relative aspect-[3/4] bg-gray-100 dark:bg-[#111] rounded-xl overflow-hidden"
            onClick={() => setView('RESULTS')}
          >
            {/* Single Main Image - Better than collage for clean look */}
            <img 
              src={outfit.items[0].imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={outfit.title} 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
               <div className="flex justify-between items-end">
                  <div>
                    <span className="inline-block px-2 py-1 bg-[#38b6ff] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                      {outfit.occasion}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display leading-tight">{outfit.title}</h3>
                    <p className="text-gray-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      {outfit.items.length} prendas seleccionadas
                    </p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};