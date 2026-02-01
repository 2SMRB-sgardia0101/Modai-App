
import { GoogleGenAI, Type } from "@google/genai";
import { Outfit, PlanType } from "../types";

const API_KEY = process.env.API_KEY || "";

export class FashionAIService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    }
  }

  async generateOutfitRecommendation(
    userPreferences: string, 
    occasion: string, 
    plan: PlanType
  ): Promise<Outfit> {
    if (!this.ai) {
      // Mock fallback if no API key
      return this.getMockOutfit();
    }

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Actúa como un estilista de moda personal. Genera un outfit completo para una persona que prefiere ${userPreferences} para la ocasión: ${occasion}. 
        El outfit debe incluir marcas reales como Nike, Zara, Adidas, Uniqlo, etc.
        Explica por qué funciona este conjunto.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              occasion: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              aiExplanation: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    brand: { type: Type.STRING },
                    color: { type: Type.STRING },
                    imageUrl: { type: Type.STRING }
                  },
                  required: ["type", "brand", "color"]
                }
              }
            },
            required: ["name", "occasion", "reasoning", "aiExplanation", "items"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...result,
        items: result.items.map((item: any) => ({
          ...item,
          id: Math.random().toString(36).substr(2, 9),
          imageUrl: item.imageUrl || `https://picsum.photos/seed/${Math.random()}/400/600`
        }))
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return this.getMockOutfit();
    }
  }

  private getMockOutfit(): Outfit {
    return {
      id: "mock-1",
      name: "Chic Urbano",
      occasion: "Cena Casual",
      reasoning: "Combinación de texturas y marcas icónicas para un look sofisticado pero relajado.",
      aiExplanation: "Este outfit funciona porque equilibra el minimalismo de Uniqlo con el estilo estructurado de Zara, usando zapatillas New Balance para un toque de tendencia 'dad shoe' que está muy vigente.",
      items: [
        { id: "1", type: "Pantalón", brand: "Zara", color: "Beige", imageUrl: "pantalonzara.jpg" },
        { id: "2", type: "Camisa", brand: "Uniqlo", color: "Blanco", imageUrl: "camisauniqlo.jpg" },
        { id: "3", type: "Zapatillas", brand: "New Balance", color: "Gris", imageUrl: "zapatillasnewbalance.jpg" }
      ]
    };
  }
}

export const fashionAI = new FashionAIService();
