
export enum PlanType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export interface User {
  name: string;
  email: string;
  plan: PlanType;
  styleProfile?: StyleProfile;
}

export interface StyleProfile {
  preferences: string[];
  vibe: string;
  favoriteBrands: string[];
}

export interface Garment {
  id: string;
  type: string;
  brand: string;
  color: string;
  imageUrl: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: Garment[];
  reasoning: string;
  occasion: string;
  aiExplanation: string;
}

export type AppScreen = 'landing' | 'auth' | 'onboarding' | 'dashboard' | 'closet' | 'generate' | 'plans' | 'profile';
