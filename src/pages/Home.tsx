import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { REVIEWS } from '../constants';

export const Home: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
           {/* Placeholder for dynamic background video/image */}
           <img src="/assets/images/hero/inicio.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter mb-4 animate-fade-in-up">
            {t.hero.title}
          </h1>
          <h2 className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-modai-blue to-modai-orange mb-8">
            {t.hero.subtitle}
          </h2>
          <Link to="/generator" className="inline-block bg-white text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-modai-blue hover:text-white transition transform hover:scale-105 shadow-xl">
            {t.hero.cta} <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            <span className="border-b-4 border-modai-orange pb-2">Opiniones</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                <div className="flex items-center mb-4">
                  <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold dark:text-white">{review.user}</h4>
                    <div className="text-yellow-400 text-sm">
                      {[...Array(review.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white dark:bg-black text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
            <div>
                <i className="fas fa-tshirt text-5xl text-modai-blue mb-4"></i>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Marcas Reales</h3>
                <p className="text-gray-500">Solo trabajamos con catálogos oficiales.</p>
            </div>
            <div>
                <i className="fas fa-bolt text-5xl text-modai-orange mb-4"></i>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Instantáneo</h3>
                <p className="text-gray-500">Genera combinaciones en segundos.</p>
            </div>
            <div>
                <i className="fas fa-shield-alt text-5xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Seguro</h3>
                <p className="text-gray-500">Tus datos protegidos con los mejores estándares.</p>
            </div>
        </div>
      </section>
    </div>
  );
};