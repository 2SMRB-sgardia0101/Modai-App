import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { Outfit, Product, StyleCategory } from '../types';

export const Generator: React.FC = () => {
  const { t, user, updateUser } = useApp();
  const [selectedStyle, setSelectedStyle] = useState<StyleCategory>('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<Outfit | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutfit(null);

    // Filter products by style
    const tops = PRODUCTS.filter(p => p.type === 'top' && p.style === selectedStyle);
    const bottoms = PRODUCTS.filter(p => p.type === 'bottom' && p.style === selectedStyle);
    const shoes = PRODUCTS.filter(p => p.type === 'shoes' && p.style === selectedStyle);

    // Simulate "Real" processing time
    setTimeout(() => {
      const randomTop = tops[Math.floor(Math.random() * tops.length)];
      const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];

      const newOutfit: Outfit = {
        id: Date.now().toString(),
        top: randomTop,
        bottom: randomBottom,
        shoes: randomShoes,
        dateCreated: new Date().toISOString()
      };

      setGeneratedOutfit(newOutfit);
      setIsGenerating(false);

      // Save to history if user is logged in
      if (user) {
        void updateUser({ outfits: [newOutfit, ...user.outfits] }).catch(() => undefined);
      }
    }, 2500); // 2.5s real loading feel
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      
      {/* Configuration Panel */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">{t.generator.title}</h1>
        
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-500 mb-4">{t.generator.select}</label>
          <div className="flex flex-wrap justify-center gap-3">
            {['casual', 'sport', 'elegant', 'informal', 'work'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStyle(s as StyleCategory)}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition transform hover:scale-105 ${
                  selectedStyle === s 
                  ? 'bg-modai-blue text-white shadow-lg shadow-blue-500/30 ring-2 ring-offset-2 ring-modai-blue' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full md:w-auto px-12 py-4 bg-black dark:bg-white dark:text-black text-white font-extrabold text-lg rounded-full shadow-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center">
              <i className="fas fa-circle-notch fa-spin mr-3"></i> Processing...
            </span>
          ) : (
            t.generator.button
          )}
        </button>
      </div>

      {/* Loading Screen */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-modai-blue border-r-modai-orange border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-white text-2xl font-bold tracking-widest animate-pulse">{t.generator.loading}</h2>
        </div>
      )}

      {/* Result Display */}
      {generatedOutfit && !isGenerating && (
        <div className="w-full max-w-5xl animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">{t.generator.result}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Top */}
            <ProductCard product={generatedOutfit.top} label="Upper" />
            {/* Bottom */}
            <ProductCard product={generatedOutfit.bottom} label="Lower" />
            {/* Shoes */}
            <ProductCard product={generatedOutfit.shoes} label="Footwear" />
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            Total Outfit Price: <span className="font-bold text-modai-orange text-xl">{(generatedOutfit.top.price + generatedOutfit.bottom.price + generatedOutfit.shoes.price).toFixed(2)}€</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; label: string }> = ({ product, label }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
    <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
    <div className="h-64 overflow-hidden bg-white relative">
      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs font-bold text-modai-blue uppercase">{product.brand}</p>
          <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h3>
        </div>
        <span className="font-bold text-modai-orange">{product.price}€</span>
      </div>
      <a href={product.url} target="_blank" rel="noreferrer" className="block w-full text-center mt-4 border border-black dark:border-white text-black dark:text-white font-bold py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
        Ver en Tienda
      </a>
    </div>
  </div>
);