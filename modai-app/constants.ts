import { PlanType, Outfit, Occasion } from './types';

// App Colors
export const COLORS = {
  primary: '#38b6ff',
  secondary: '#f27100',
};

// Mock Brands
export const BRANDS = ['Nike', 'Adidas', 'Zara', 'Uniqlo', 'H&M', 'Levi\'s', 'New Balance', 'Gucci', 'Prada', 'Massimo Dutti'];

// Mock Outfits for Dashboard
export const MOCK_OUTFITS: Outfit[] = [
  {
    id: '1',
    title: 'Explorador Urbano',
    description: 'Un look cómodo pero estilizado para recorrer la ciudad.',
    occasion: Occasion.CASUAL,
    explanation: 'El contraste entre la chaqueta oversized de Zara y los jeans slim de Levi\'s crea una silueta moderna. Las New Balance anclan el look con confort y tendencia.',
    createdAt: new Date().toISOString(),
    items: [
      { id: '101', name: 'Chaqueta Denim Oversized', brand: 'Zara', type: 'Abrigo', imageUrl: 'https://picsum.photos/200/300?random=1' },
      { id: '102', name: '501 Original Fit', brand: 'Levi\'s', type: 'Pantalones', imageUrl: 'https://picsum.photos/200/300?random=2' },
      { id: '103', name: '550 Sneakers', brand: 'New Balance', type: 'Zapatos', imageUrl: 'https://picsum.photos/200/300?random=3' },
    ]
  },
  {
    id: '2',
    title: 'Oficina Creativa',
    description: 'Profesional pero con carácter expresivo.',
    occasion: Occasion.WORK,
    explanation: 'Las capas monocromáticas transmiten profesionalismo, mientras que el tejido texturizado de Uniqlo añade profundidad. La paleta de colores sugiere cercanía.',
    createdAt: new Date().toISOString(),
    items: [
      { id: '201', name: 'Cuello Alto Merino', brand: 'Uniqlo', type: 'Superior', imageUrl: 'https://picsum.photos/200/300?random=4' },
      { id: '202', name: 'Pantalón de Pinzas', brand: 'H&M Studio', type: 'Pantalones', imageUrl: 'https://picsum.photos/200/300?random=5' },
    ]
  }
];

export const PLANS = [
  {
    type: PlanType.FREE,
    name: 'Gratuito',
    price: '0€',
    period: 'siempre',
    features: ['Generación básica de outfits', 'Subida limitada de prendas', 'Visualización estándar', 'Acceso a marcas populares'],
    cta: 'Empezar Gratis',
    highlight: false
  },
  {
    type: PlanType.PREMIUM,
    name: 'Premium',
    price: '3,99€',
    period: 'mes',
    features: ['Generación ilimitada', 'Perfil evolutivo avanzado', 'Regeneración inteligente', 'Looks por clima y ánimo', 'Experiencia sin anuncios'],
    cta: 'Obtener Premium',
    highlight: true
  },
  {
    type: PlanType.ENTERPRISE,
    name: 'Empresarial',
    price: '59,99€',
    period: 'año',
    features: ['Integración de catálogo real', 'Panel de insights y tendencias', 'Conexión directa a compra', 'Mayor visibilidad de marca'],
    cta: 'Contactar Ventas',
    highlight: false
  }
];
