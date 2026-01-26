export enum PlanType {
  FREE = 'GRATUITO',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'EMPRESARIAL'
}

export enum Occasion {
  CASUAL = 'Casual',
  WORK = 'Trabajo',
  PARTY = 'Fiesta',
  SPORT = 'Deporte',
  FORMAL = 'Formal',
  DATE = 'Cita'
}

export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  type: string;
  imageUrl: string;
  color?: string;
}

export interface Outfit {
  id: string;
  title: string;
  description: string;
  items: ClothingItem[];
  occasion: Occasion;
  explanation: string; // "Por qué funciona"
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  plan: PlanType;
  stylePreferences: string[];
  avatarUrl?: string;
}

export type ViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'GENERATOR' | 'PLANS' | 'PROFILE' | 'ABOUT' | 'RESULTS';
