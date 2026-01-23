
import React, { useState, useEffect } from 'react';
import { AppScreen, User, PlanType, Outfit, Garment } from './types';
import Logo from './components/Logo';
import Button from './components/Button';
import { fashionAI } from './services/geminiService';

// --- Views ---

const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"></div>
    
    <div className="animate-fade-in text-center max-w-2xl space-y-8">
      <Logo className="mx-auto h-12 mb-12" />
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark leading-tight">
        Outfits perfectos,<br/><span className="text-primary italic">cero esfuerzo</span>
      </h1>
      <p className="text-gray-500 text-xl font-light">
        Descubre tu estilo personal impulsado por inteligencia artificial. Tu armario, reinventado.
      </p>
      <div className="pt-8">
        <Button variant="primary" onClick={onStart} className="text-lg px-12">
          Comenzar
        </Button>
      </div>
    </div>
    
    <div className="mt-20 grid grid-cols-3 gap-4 max-w-4xl opacity-50">
       <img src="inicio1.jpg" className="rounded-2xl grayscale" />
       <img src="inicio2.jpg" className="rounded-2xl mt-8" />
       <img src="inicio3.jpg" className="rounded-2xl" />
    </div>
  </div>
);

const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
    <div className="w-full max-w-md space-y-8 animate-fade-in">
      <Logo className="mx-auto mb-10" />
      <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Bienvenido de nuevo</h2>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-primary" />
          <input type="password" placeholder="Contraseña" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-primary" />
        </div>
        <Button fullWidth onClick={onAuth}>Iniciar Sesión</Button>
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">O crea una cuenta</span></div>
        </div>
        <Button fullWidth variant="outline">Crear cuenta</Button>
      </div>
    </div>
  </div>
);

const Plans: React.FC<{ onSelect: (p: PlanType) => void, currentPlan: PlanType }> = ({ onSelect, currentPlan }) => {
  const plans = [
    { type: PlanType.FREE, price: "0€", features: ["Generación básica", "Subida limitada", "Marcas estándar"] },
    { type: PlanType.PREMIUM, price: "3,99€", features: ["Outfits ilimitados", "Evolución de estilo", "Looks por clima/ánimo", "Sin anuncios"], highlight: true },
    { type: PlanType.ENTERPRISE, price: "59,99€", features: ["Integración de catálogo", "Insights de tendencias", "Fijado de marca", "Soporte VIP"] },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Elige tu evolución</h2>
        <p className="text-gray-500">Mejora tu estilo con planes diseñados para ti.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map(p => (
          <div key={p.type} className={`p-8 rounded-3xl transition-all duration-300 ${p.highlight ? 'bg-dark text-white scale-105 shadow-2xl' : 'bg-white text-dark shadow-lg'}`}>
            <h3 className="text-xl font-bold mb-2">{p.type}</h3>
            <div className="text-3xl font-bold mb-6">{p.price}<span className="text-sm font-normal opacity-60">/{p.type === PlanType.ENTERPRISE ? 'año' : 'mes'}</span></div>
            <ul className="space-y-4 mb-10">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${p.highlight ? 'bg-primary' : 'bg-secondary'}`}></span>
                  <span className="text-sm opacity-90">{f}</span>
                </li>
              ))}
            </ul>
            <Button 
              fullWidth 
              variant={p.highlight ? 'primary' : 'outline'}
              onClick={() => onSelect(p.type)}
            >
              {currentPlan === p.type ? 'Plan Actual' : 'Seleccionar'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ user: User, onNav: (s: AppScreen) => void }> = ({ user, onNav }) => (
  <div className="p-6 pb-24 space-y-8 animate-fade-in max-w-4xl mx-auto">
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-serif font-bold">Hola, {user.name}</h1>
        <p className="text-gray-500">Tu estilo hoy está en nivel <span className="text-primary font-bold">Relax</span></p>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden" onClick={() => onNav('profile')}>
        <img src="fotoperfil.jpg" />
      </div>
    </header>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-primary p-6 rounded-3xl text-white cursor-pointer hover:bg-opacity-90" onClick={() => onNav('generate')}>
        <span className="text-2xl mb-2 block">✨</span>
        <h3 className="font-bold">Generar Look</h3>
        <p className="text-xs opacity-80">IA crea tu outfit ideal</p>
      </div>
      <div className="bg-secondary p-6 rounded-3xl text-white cursor-pointer hover:bg-opacity-90" onClick={() => onNav('closet')}>
        <span className="text-2xl mb-2 block">👕</span>
        <h3 className="font-bold">Mi Armario</h3>
        <p className="text-xs opacity-80">5 prendas cargadas</p>
      </div>
    </div>

    <section className="space-y-4">
      <h2 className="text-xl font-bold">Tendencias para ti</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {[1,2,3,4].map(i => (
          <div key={i} className="min-w-[140px] h-[200px] bg-gray-100 rounded-2xl overflow-hidden relative">
            <img src={`nike.jpg`} className="object-cover h-full w-full" />
            <div className="absolute bottom-2 left-2 right-2 p-2 glass rounded-lg text-[10px] font-bold">
              Temporada de Nike
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const Closet: React.FC = () => (
  <div className="p-6 animate-fade-in max-w-4xl mx-auto">
    <h2 className="text-3xl font-serif font-bold mb-6">Mi Armario Virtual</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-colors">
        <span className="text-4xl">+</span>
        <p className="text-sm font-medium">Añadir prenda</p>
      </div>
      <img src={`chaqueta.jpg`} className="h-full w-full object-cover rounded-2xl" />
      <img src={`pantalon.jpg`} className="h-full w-full object-cover rounded-2xl" />
      <img src={`gorro.jpg`} className="h-full w-full object-cover rounded-2xl" />
      <img src={`zapatos.jpg`} className="h-full w-full object-cover rounded-2xl" />
      <img src={`mono.jpg`} className="h-full w-full object-cover rounded-2xl" />
    </div>
  </div>
);

const Generator: React.FC<{ onResult: (o: Outfit) => void }> = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const [occasion, setOccasion] = useState('Casual');
  const [feeling, setFeeling] = useState('Productivo');

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate thinking process
    const result = await fashionAI.generateOutfitRecommendation(`Sentimiento: ${feeling}`, occasion, PlanType.FREE);
    setTimeout(() => {
      onResult(result);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-8 z-50">
        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-serif font-bold text-center">Analizando tendencias mundiales...</h2>
        <p className="text-gray-400 text-center mt-2">Combinando marcas icónicas para tu vibe de hoy.</p>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in max-w-2xl mx-auto space-y-10">
      <h2 className="text-3xl font-serif font-bold">¿Cómo quieres lucir hoy?</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold text-gray-500 uppercase mb-3 block">Ocasión</label>
          <div className="flex flex-wrap gap-2">
            {['Casual', 'Trabajo', 'Cita', 'Deporte', 'Gala'].map(opt => (
              <button 
                key={opt}
                onClick={() => setOccasion(opt)}
                className={`px-6 py-3 rounded-2xl transition-all ${occasion === opt ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-500 uppercase mb-3 block">Sentimiento</label>
          <div className="flex flex-wrap gap-2">
            {['Energético', 'Relajado', 'Poderoso', 'Misterioso'].map(opt => (
              <button 
                key={opt}
                onClick={() => setFeeling(opt)}
                className={`px-6 py-3 rounded-2xl transition-all ${feeling === opt ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-10">
          <Button fullWidth className="py-6 text-xl" onClick={handleGenerate}>
            Generar Outfit Maestro ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

const Result: React.FC<{ outfit: Outfit, onReset: () => void }> = ({ outfit, onReset }) => (
  <div className="p-6 animate-fade-in max-w-4xl mx-auto space-y-10 pb-24">
    <div className="text-center space-y-2">
      <h2 className="text-4xl font-serif font-bold">{outfit.name}</h2>
      <p className="text-primary font-bold">{outfit.occasion}</p>
    </div>

    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">Prendas</h3>
        <div className="space-y-4">
          {outfit.items.map(item => (
            <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-3xl shadow-sm">
              <div className="w-16 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src={item.imageUrl} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-dark">{item.type}</p>
                <p className="text-sm text-secondary font-bold uppercase">{item.brand}</p>
                <p className="text-xs text-gray-400">{item.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-dark text-white p-8 rounded-[40px] space-y-4">
          <h3 className="text-xl font-serif italic">Análisis de Modai</h3>
          <p className="text-sm leading-relaxed opacity-80">{outfit.aiExplanation}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" fullWidth onClick={onReset}>Otro Look</Button>
          <Button fullWidth>Guardar</Button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);

  const handleStart = () => setScreen('auth');
  const handleAuth = () => {
    setUser({
      name: 'Rafa Fashion',
      email: 'rafa@modai.com',
      plan: PlanType.FREE
    });
    setScreen('dashboard');
  };

  const handlePlanSelect = (p: PlanType) => {
    if (user) setUser({ ...user, plan: p });
    setScreen('dashboard');
  };

  const handleOutfitResult = (o: Outfit) => {
    setCurrentOutfit(o);
    setScreen('generate'); // We'll conditionally show result if currentOutfit exists
  };

  const renderScreen = () => {
    switch(screen) {
      case 'landing': return <Landing onStart={handleStart} />;
      case 'auth': return <Auth onAuth={handleAuth} />;
      case 'plans': return <Plans onSelect={handlePlanSelect} currentPlan={user?.plan || PlanType.FREE} />;
      case 'closet': return <Closet />;
      case 'generate': 
        return currentOutfit 
          ? <Result outfit={currentOutfit} onReset={() => setCurrentOutfit(null)} />
          : <Generator onResult={handleOutfitResult} />;
      case 'profile': return (
        <div className="p-6 max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-serif font-bold">Perfil</h2>
          <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden"><img src="fotoperfil.jpg" /></div>
               <div>
                 <h3 className="text-xl font-bold">{user?.name}</h3>
                 <p className="text-gray-400">{user?.email}</p>
               </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-2xl flex justify-between items-center">
              <span className="font-bold text-primary">Plan {user?.plan}</span>
              <Button variant="ghost" className="text-xs" onClick={() => setScreen('plans')}>Cambiar</Button>
            </div>
            <Button fullWidth variant="outline" onClick={() => setScreen('landing')}>Cerrar Sesión</Button>
          </div>
        </div>
      );
      case 'dashboard':
      default:
        return user ? <Dashboard user={user} onNav={setScreen} /> : <Landing onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-dark pb-20">
      {/* Dynamic Screen Content */}
      <main>
        {renderScreen()}
      </main>

      {/* Modern Bottom Navigation (Fixed) */}
      {user && screen !== 'landing' && screen !== 'auth' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 glass rounded-full flex items-center justify-around px-4 shadow-2xl border border-white/20 z-40">
          <button 
            onClick={() => { setScreen('dashboard'); setCurrentOutfit(null); }}
            className={`flex flex-col items-center gap-1 ${screen === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Inicio</span>
          </button>
          <button 
            onClick={() => { setScreen('closet'); setCurrentOutfit(null); }}
            className={`flex flex-col items-center gap-1 ${screen === 'closet' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="text-xl">👕</span>
            <span className="text-[10px] font-bold">Armario</span>
          </button>
          <div className="relative -top-8">
            <button 
              onClick={() => { setScreen('generate'); setCurrentOutfit(null); }}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 border-4 border-white transform transition-transform hover:scale-110 active:scale-95"
            >
              ✨
            </button>
          </div>
          <button 
            onClick={() => { setScreen('plans'); setCurrentOutfit(null); }}
            className={`flex flex-col items-center gap-1 ${screen === 'plans' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="text-xl">⭐</span>
            <span className="text-[10px] font-bold">Planes</span>
          </button>
          <button 
            onClick={() => { setScreen('profile'); setCurrentOutfit(null); }}
            className={`flex flex-col items-center gap-1 ${screen === 'profile' ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
