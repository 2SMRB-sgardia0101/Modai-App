export type Language = 'es' | 'en' | 'cn';
export type Theme = 'light' | 'dark';
export type PlanType = 'free' | 'premium' | 'business';
export type StyleCategory = 'casual' | 'sport' | 'elegant' | 'informal' | 'work';
export type ProductType = 'top' | 'bottom' | 'shoes';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  type: ProductType;
  style: StyleCategory;
  image: string;
  url: string;
}

export interface Outfit {
  id: string;
  top: Product;
  bottom: Product;
  shoes: Product;
  dateCreated: string;
}

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  plan: PlanType;
  stylePreference: StyleCategory;
  theme: Theme;
  language: Language;
  consent: boolean;
  consentDate?: string;
  favorites: string[]; // Product IDs
  outfits: Outfit[];
  // Sensitive Data (simulated encrypted/stored)
  billing?: {
    accountNumber?: string;
    fiscalName?: string;
    cif?: string;
    fiscalAddress?: string;
    legalRep?: string;
  };
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  avatar: string;
}