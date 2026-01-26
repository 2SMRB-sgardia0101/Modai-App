import React, { useState } from 'react';
import { Outfit, Occasion } from '../types';
import { Button } from '../components/Button';
import { generateOutfitAI } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface GeneratorProps {
  onOutfitGenerated: (outfit: Outfit) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ onOutfitGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [occasion, setOccasion] = useState<Occasion>(Occasion.CASUAL);
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState('Soleado');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const outfit = await generateOutfitAI(occasion, mood || 'Confiado', weather);
      onOutfitGenerated(outfit);
    } catch (error) {
      console.error("Error generating outfit", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 pb-20 animate-slide-up">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-display mb-4">DISEÑAR LOOK</h1>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Configura los parámetros del algoritmo</p>
      </div>

      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
         
         {loading && (
           <div className="absolute inset-0 bg-white/90 dark:bg-[#111]/90 z-20 flex flex-col items-center justify-center">
             <Loader2 className="w-10 h-10 animate-spin text-[#38b6ff] mb-4" />
             <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Analizando Tendencias...</p>
           </div>
         )}

         <div className="space-y-10">
           
           {/* Occasion Grid */}
           <div>
             <label className="block font-mono text-xs uppercase text-gray-400 mb-4">Ocasión</label>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {Object.values(Occasion).map((occ) => (
                 <button
                   key={occ}
                   onClick={() => setOccasion(occ)}
                   className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                     occasion === occ 
                       ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                       : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-500 hover:border-gray-400'
                   }`}
                 >
                   {occ}
                 </button>
               ))}
             </div>
           </div>

           {/* Inputs */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block font-mono text-xs uppercase text-gray-400 mb-2">Vibe / Estilo</label>
                <input 
                  type="text" 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Ej. Urbano..."
                  className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 py-2 font-display text-xl focus:border-[#38b6ff] outline-none transition-colors placeholder:text-gray-700 dark:placeholder:text-gray-600"
                />
              </div>
              <div className="group">
                <label className="block font-mono text-xs uppercase text-gray-400 mb-2">Clima</label>
                <select 
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 dark:border-white/20 py-2 font-display text-xl focus:border-[#38b6ff] outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="Soleado">Soleado</option>
                  <option value="Nublado">Nublado</option>
                  <option value="Lluvioso">Lluvioso</option>
                  <option value="Frío">Frío</option>
                </select>
              </div>
           </div>

           <Button 
            onClick={handleGenerate} 
            fullWidth 
            size="lg"
            className="bg-[#38b6ff] hover:bg-[#2da0e5] text-white border-none rounded-lg h-14 mt-4"
           >
             <Sparkles className="w-5 h-5 mr-2" />
             Ejecutar IA
           </Button>

         </div>
      </div>
    </div>
  );
};