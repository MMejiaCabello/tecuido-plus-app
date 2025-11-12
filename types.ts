export enum ProfileName {
  CRONICOS = 'Crónicos',
  WELLNESS = 'Wellness & Deportivo',
  BEAUTY = 'Perfil Beauty',
  PERSONAL_CARE = 'Personal Care',
  MAMA_BEBE = 'Mamá y Bebé',
}

export interface Theme {
  primary: string;
  accent: string;
  text: string;
  background: string;
  font: string;
}

export interface Profile {
  name: ProfileName;
  subcategories: string[];
  theme: Theme;
  backgroundImage: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileName: ProfileName;
  preferences: string[];
  profileTags: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
}