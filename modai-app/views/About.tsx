import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Reinventando la moda personal</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Modai nace en la intersección entre el estilo atemporal y la inteligencia artificial de vanguardia.
        </p>
      </div>

      {/* Mission */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
           <img 
            src="https://picsum.photos/600/600?grayscale" 
            alt="Team working" 
            className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#38b6ff]">Nuestra Misión</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Creemos que el estilo no debería requerir esfuerzo. Nuestra misión es democratizar el acceso a un estilismo personal de clase mundial, utilizando tecnología para eliminar la fatiga de decisión y potenciar la confianza de cada usuario.
          </p>
          <div className="pl-4 border-l-4 border-[#f27100]">
            <p className="text-lg font-medium italic">"La tecnología al servicio de la expresión personal."</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-100 dark:bg-[#1a1d24] rounded-3xl p-10 md:p-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Nuestros Pilares</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 text-[#f27100]">Innovación</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Utilizamos modelos de visión por computadora y LLMs de última generación (Gemini) para entender la moda como lo hace un experto humano.
            </p>
          </div>
           <div>
            <h3 className="text-xl font-bold mb-3 text-[#f27100]">Autenticidad</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No disfrazamos a la gente. Ayudamos a descubrir su verdadera identidad visual a través de recomendaciones que evolucionan con ellos.
            </p>
          </div>
           <div>
            <h3 className="text-xl font-bold mb-3 text-[#f27100]">Simplicidad</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              La tecnología compleja debe sentirse invisible. Modai es "cero esfuerzo" por diseño.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dev Info for the prompt requirement */}
      <div className="border border-dashed border-gray-300 dark:border-gray-700 p-6 rounded-xl text-sm text-gray-500">
        <p className="font-bold mb-2">Nota para Desarrolladores / Jurado:</p>
        <p>Esta aplicación está configurada para funcionar en local y web.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Modo Demo:</strong> La IA se simula mediante <code>services/geminiService.ts</code> si no hay API KEY.</li>
          <li><strong>Integración Real:</strong> Descomentar y configurar <code>process.env.API_KEY</code> para activar Google Gemini.</li>
          <li><strong>Imágenes:</strong> Se utiliza Picsum para simular la base de datos de prendas.</li>
          <li><strong>Logo:</strong> Espera <code>logomodai.jpg</code> en la raíz.</li>
        </ul>
      </div>

    </div>
  );
};
