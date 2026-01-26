import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Outfit, Occasion } from "../types";
import { MOCK_OUTFITS, BRANDS } from "../constants";

// Helper to simulate network delay for realistic effect
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates an outfit based on user context.
 * In a real production build, this would use the Gemini API key from process.env.API_KEY.
 * For this demo/preview, it falls back to a sophisticated mock if no key is present.
 */
export const generateOutfitAI = async (
  occasion: Occasion,
  mood: string,
  weather: string,
  userImageBase64?: string
): Promise<Outfit> => {
  
  // 1. Check for API Key (Real AI Mode)
  const apiKey = process.env.API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        Actúa como un estilista de moda profesional de alto nivel. Genera un outfit completo para una ocasión: ${occasion}.
        El estado de ánimo del usuario es: ${mood}.
        El clima es: ${weather}.
        Las marcas seleccionadas deben ser de esta lista o similares populares: ${BRANDS.join(', ')}.
        
        IMPORTANTE: Responde ÚNICAMENTE en JSON válido. Todo el contenido de texto (títulos, descripciones) debe estar en ESPAÑOL.
        
        Usa este esquema:
        {
          "title": "Título corto y elegante en Español",
          "description": "Descripción inspiradora en Español",
          "explanation": "Explicación técnica de por qué combinan los colores y cortes en Español",
          "items": [
            { "id": "unique_string", "name": "Nombre de prenda en Español", "brand": "Marca", "type": "Tipo de prenda", "color": "Color" }
          ]
        }
      `;

      // If user uploaded an image, we would send it here as a part
      // For brevity in this demo code, we are sending text-only prompt if image isn't processed
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest', 
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        return {
          ...data,
          id: Date.now().toString(),
          occasion: occasion, // Ensure consistent Enum value
          createdAt: new Date().toISOString(),
          // Add placeholder images since text-only GenAI doesn't generate image URLs
          items: data.items.map((item: any, index: number) => ({
             ...item,
             imageUrl: `https://picsum.photos/300/400?random=${Date.now() + index}`
          }))
        };
      }
    } catch (error) {
      console.error("Gemini API failed, falling back to mock", error);
    }
  }

  // 2. Fallback / Demo Mode
  await delay(2500); // Simulate "Thinking" time

  // Generate a semi-random mock result
  const randomBrand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  return {
    id: Date.now().toString(),
    title: `Look ${occasion} Modai`,
    description: `Una selección perfecta para un día ${weather} sintiéndote ${mood}.`,
    occasion: occasion,
    explanation: `Hemos elegido ${randomBrand(BRANDS)} como pieza central para coincidir con tu vibra ${mood}. Los colores están balanceados para la iluminación de un día ${weather}, asegurando que luzcas impecable.`,
    createdAt: new Date().toISOString(),
    items: [
      { 
        id: 'gen-1', 
        name: 'Pieza Esencial Superior', 
        brand: randomBrand(BRANDS), 
        type: 'Superior', 
        imageUrl: `https://picsum.photos/300/400?random=${Math.random()}`, 
        color: 'Neutro' 
      },
      { 
        id: 'gen-2', 
        name: 'Pantalón de Corte Moderno', 
        brand: randomBrand(BRANDS), 
        type: 'Inferior', 
        imageUrl: `https://picsum.photos/300/400?random=${Math.random()}`, 
        color: 'Acento' 
      },
      { 
        id: 'gen-3', 
        name: 'Calzado Comfort', 
        brand: randomBrand(BRANDS), 
        type: 'Calzado', 
        imageUrl: `https://picsum.photos/300/400?random=${Math.random()}`, 
        color: 'Blanco' 
      },
    ]
  };
};
