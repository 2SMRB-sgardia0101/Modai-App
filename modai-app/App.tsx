import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ViewState, Outfit, PlanType } from './types';
import { Landing } from './views/Landing';
import { Auth } from './views/Auth';
import { Dashboard } from './views/Dashboard';
import { Generator } from './views/Generator';
import { Plans } from './views/Plans';
import { About } from './views/About';
import { Results } from './views/Results';
import { Button } from './components/Button';
import { Toast } from './components/Toast';

const App = () => {
  const [currentView, setView] = useState<ViewState>('LANDING');
  const [isDark, setIsDark] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<Outfit | null>(null);
  
  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogin = () => {
    showNotification("Bienvenido de nuevo");
    setView('DASHBOARD');
  };

  const handleOutfitGenerated = (outfit: Outfit) => {
    setGeneratedOutfit(outfit);
    setView('RESULTS');
  };

  const handleSelectPlan = (plan: PlanType) => {
    showNotification(`Plan ${plan} seleccionado. Redirigiendo a pago...`);
    setTimeout(() => {
        showNotification("Pago exitoso (Modo Demo)");
        setView('DASHBOARD');
    }, 1500);
  }

  const handleLandingDemo = () => {
    showNotification("Entrando al Modo Demo");
    setView('DASHBOARD');
  }

  const handleLandingLearnMore = () => {
    const featureSection = document.getElementById('features');
    if (featureSection) {
        featureSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case 'LANDING':
        return <Landing onGetStarted={() => setView('AUTH')} onDemo={handleLandingDemo} onLearnMore={handleLandingLearnMore} />;
      case 'AUTH':
        return <Auth onLogin={handleLogin} />;
      case 'DASHBOARD':
        return <Dashboard setView={setView} generatedOutfit={generatedOutfit} />;
      case 'GENERATOR':
        return <Generator onOutfitGenerated={handleOutfitGenerated} />;
      case 'PLANS':
        return <Plans onSelectPlan={handleSelectPlan} setView={setView} />;
      case 'ABOUT':
        return <About />;
      case 'PROFILE':
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fadeIn">
                <div className="w-32 h-32 rounded-full p-1 border-2 border-gray-100 dark:border-white/10">
                  <img src="inicio1.jpg" className="w-full h-full rounded-full grayscale" alt="Profile" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Usuario Demo</h2>
                  <p className="text-gray-500">Miembro desde 2024</p>
                </div>
                <div className="inline-block px-4 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Plan Gratuito</div>
                <div className="flex gap-4">
                  <Button onClick={() => setView('PLANS')} variant="outline" className="border-gray-200 dark:border-white/20">Mejorar Plan</Button>
                  <Button onClick={() => { showNotification("Sesión cerrada"); setView('LANDING'); }} variant="ghost">Cerrar Sesión</Button>
                </div>
            </div>
        );
      case 'RESULTS':
        return generatedOutfit ? (
           <Results outfit={generatedOutfit} setView={setView} showNotification={showNotification} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <p className="text-gray-500 mb-4">No hay outfit seleccionado.</p>
              <Button onClick={() => setView('DASHBOARD')}>Ir al Armario</Button>
          </div>
        );
      default:
        return <Landing onGetStarted={() => setView('AUTH')} onDemo={handleLandingDemo} onLearnMore={handleLandingLearnMore} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={setView} 
      isDark={isDark} 
      toggleTheme={toggleTheme}
      showNotification={showNotification}
    >
      {renderContent()}
      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </Layout>
  );
};

export default App;
