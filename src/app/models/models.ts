// src/app/models/models.ts

// Define CategoryType as an enum
export enum CategoryType {
  Electronics = 'Electronics',
  Phones = 'Phones',
  Informatique = 'Informatique',
  Mode = 'Mode'
}

// src/app/models/models.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  briefDescription: string; // Add this property
  productCategory: CategoryType;
  price: number;
  quantity: number;
  imageUrl: string;
  images: string[]; // Add this property
  brand?: string;
  details: { [key: string]: string | number };
  technicalSpecifications?: string[];
  warranty?: string;
  dimensions?: string;
  shippingFee?: number;
  estimatedDelivery?: string;
  returnPolicy?: string;
  seller?: Seller;
  reviews?: Review[];
  averageRating?: number;
  stockStatus?: 'In Stock' | 'Out of Stock';
  featured?: boolean;
  onSale?: boolean;
  isNew?: boolean;
  tags?: string[];
  // New properties added:
  originalPrice?: number;
  discount?: number;
  stock?: number;
  shippingDiscount?: number;
  shippingDestination?: string;
  rating?: number;
  longDescription?: string;
  highlights?: string;
  performance?: string;
  battery?: string;
  security?: string;
  
  features?: string[];  // Assuming 'features' is an array of strings
  newCustomerDiscount?: number;
  newCustomerCode?: string;
  newCustomerLimit?: number;
  contactNumber?: string;
  freeShippingThreshold?: number;
  express?: boolean;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  frontCamera?: string;
  rearCamera?: string;
  sim?: number;
  os?: string;
  connectivity?: string;
  sku?: string;
  gtin?: string;
  range?: string;
  model?: string;
  weight?: number;
  color?: string;
}


export interface Seller {
  name: string;
  rating: number;
  followers: number;
  contact: string;
}

export interface Review {
  rating: number;
  comment: string;
  reviewer: string;
  date: Date;
}


// Update Category to only use CategoryType for comparison
export interface Category {
  id: number;
  name: CategoryType; // Use CategoryType for the name
  products: Product[];
}

// User model
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: string;
  password: string;
  createdAt: string;
  modifiedAt: string;
}

// Order model
export interface Order {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  totalPrice: number;
}
