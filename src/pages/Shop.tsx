import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import { StyleCategory } from '../types';

export const Shop: React.FC = () => {
  const { t, user, updateUser } = useApp();
  const [filter, setFilter] = useState<StyleCategory | 'all'>('all');

  const toggleFavorite = (productId: string) => {
    if (!user) return alert("Debes iniciar sesión");
    const isFav = user.favorites.includes(productId);
    let newFavs = [];
    if (isFav) {
      newFavs = user.favorites.filter(id => id !== productId);
    } else {
      newFavs = [...user.favorites, productId];
    }
    void updateUser({ favorites: newFavs }).catch(() => undefined);
  };

  const filteredProducts = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.style === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">{t.shop.title}</h1>
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${filter === 'all' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All
        </button>
        {['casual', 'sport', 'elegant', 'informal', 'work'].map((s) => (
          <button 
            key={s}
            onClick={() => setFilter(s as StyleCategory)}
            className={`capitalize px-4 py-2 rounded-full text-sm font-bold transition ${filter === s ? 'bg-modai-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const isFav = user?.favorites.includes(product.id);
          return (
            <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 relative">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                <button 
                  onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10"
                >
                  <i className={`${isFav ? 'fas text-red-500' : 'far text-gray-400'} fa-heart`}></i>
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">{product.brand}</p>
                <h3 className="text-sm font-semibold truncate dark:text-white">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-modai-orange">{product.price}€</span>
                  <a href={product.url} className="text-xs bg-black dark:bg-white dark:text-black text-white px-2 py-1 rounded">Buy Now</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};