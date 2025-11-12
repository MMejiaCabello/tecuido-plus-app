import { Profile, Product, ProfileName, User } from './types';

export const PROFILES: Record<ProfileName, Profile> = {
  [ProfileName.CRONICOS]: {
    name: ProfileName.CRONICOS,
    subcategories: ['Medicamentos', 'Nutrición', 'Vitaminas y Complementos'],
    theme: {
      primary: 'blue',
      accent: 'sky',
      text: 'slate',
      background: 'slate-100',
      font: 'font-sans',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  [ProfileName.WELLNESS]: {
    name: ProfileName.WELLNESS,
    subcategories: ['Vitaminas', 'Nutracéuticos', 'Creatinas', 'Proteínas'],
    theme: {
      primary: 'emerald',
      accent: 'lime',
      text: 'neutral',
      background: 'gray-100',
      font: 'font-mono',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  [ProfileName.BEAUTY]: {
    name: ProfileName.BEAUTY,
    subcategories: ['Dermo', 'SkinCare', 'Maquillaje', 'Corporal', 'Capilar', 'Solares'],
    theme: {
      primary: 'fuchsia',
      accent: 'pink',
      text: 'zinc',
      background: 'rose-50',
      font: 'font-serif',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  [ProfileName.PERSONAL_CARE]: {
    name: ProfileName.PERSONAL_CARE,
    subcategories: ['Capilar', 'Bucal', 'Deos', 'Solares'],
    theme: {
      primary: 'cyan',
      accent: 'teal',
      text: 'stone',
      background: 'cyan-50',
      font: 'font-sans',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1629282534720-9a4597b97364?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  [ProfileName.MAMA_BEBE]: {
    name: ProfileName.MAMA_BEBE,
    subcategories: ['Fórmulas', 'Pañales', 'Pediátricos', 'Vitaminas Kids', 'Skin Care Mamá'],
    theme: {
      primary: 'amber',
      accent: 'yellow',
      text: 'orange',
      background: 'yellow-50',
      font: 'font-serif',
    },
    backgroundImage: 'https://images.unsplash.com/photo-1525925433544-3b68b375b0a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
};

export const MOCK_USERS: User[] = [
    { id: 'user-cronico', firstName: 'Carlos', lastName: 'Ruiz', email: 'cronico@tecuidomas.com', profileName: ProfileName.CRONICOS, preferences: ['Farma', 'Adulto Mayor'], profileTags: ['Práctico', 'Saludable'] },
    { id: 'user-wellness', firstName: 'Elena', lastName: 'Gomez', email: 'wellness@tecuidomas.com', profileName: ProfileName.WELLNESS, preferences: ['Wellness', 'Deportivo'], profileTags: ['Saludable', 'Explorador'] },
    { id: 'user-beauty', firstName: 'Ana', lastName: 'Salazar', email: 'beauty@tecuidomas.com', profileName: ProfileName.BEAUTY, preferences: ['Maquillaje', 'Skin care', 'Dermo cosmética'], profileTags: ['Premium', 'Explorador'] },
    { id: 'user-personal', firstName: 'Javier', lastName: 'Mora', email: 'personal@tecuidomas.com', profileName: ProfileName.PERSONAL_CARE, preferences: ['Personal Care'], profileTags: ['Ahorrador', 'Familiar'] },
    { id: 'user-mama', firstName: 'Lucia', lastName: 'Fernandez', email: 'mama@tecuidomas.com', profileName: ProfileName.MAMA_BEBE, preferences: ['Mundo Bebe', 'Skin care'], profileTags: ['Familiar', 'Práctico'] },
];

export const PREFERENCES_OPTIONS = [
  'Maquillaje', 'Personal Care', 'Wellness', 'Deportivo', 
  'Dermo cosmética', 'Skin care', 'Adulto Mayor', 'Mundo Bebe', 'Farma', 'Otros'
];

export const PROFILE_TAGS_OPTIONS = [
  'Ahorrador', 'Explorador', 'Premium', 'Saludable', 'Familiar', 'Práctico'
];

export const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Proteína Whey', price: 55.00, imageUrl: 'https://picsum.photos/seed/p1/200/200', category: 'Proteínas' },
    { id: '2', name: 'Vitamina C 1000mg', price: 15.00, originalPrice: 20.00, imageUrl: 'https://picsum.photos/seed/p2/200/200', category: 'Vitaminas' },
    { id: '3', name: 'Creatina Monohidratada', price: 45.00, imageUrl: 'https://picsum.photos/seed/p3/200/200', category: 'Creatinas' },
    { id: '4', name: 'Pañales Etapa 3', price: 30.00, imageUrl: 'https://picsum.photos/seed/p4/200/200', category: 'Pañales' },
    { id: '5', name: 'Fórmula Infantil', price: 25.00, imageUrl: 'https://picsum.photos/seed/p5/200/200', category: 'Fórmulas' },
    { id: '6', name: 'Crema Hidratante', price: 35.00, originalPrice: 40.00, imageUrl: 'https://picsum.photos/seed/p6/200/200', category: 'SkinCare' },
    { id: '7', name: 'Protector Solar SPF50', price: 28.00, imageUrl: 'https://picsum.photos/seed/p7/200/200', category: 'Solares' },
    { id: '8', name: 'Shampoo Anticaída', price: 22.00, imageUrl: 'https://picsum.photos/seed/p8/200/200', category: 'Capilar' },
    { id: '9', name: 'Base de Maquillaje', price: 40.00, imageUrl: 'https://picsum.photos/seed/p9/200/200', category: 'Maquillaje' },
    { id: '10', name: 'Medicina para la presión', price: 18.00, imageUrl: 'https://picsum.photos/seed/p10/200/200', category: 'Medicamentos' },
    { id: '11', name: 'Suplemento Omega 3', price: 32.00, imageUrl: 'https://picsum.photos/seed/p11/200/200', category: 'Nutrición' },
    { id: '12', name: 'Pasta Dental Blanqueadora', price: 8.00, originalPrice: 10.00, imageUrl: 'https://picsum.photos/seed/p12/200/200', category: 'Bucal' },
];