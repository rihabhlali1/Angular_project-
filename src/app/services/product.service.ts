// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, CategoryType, Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private usdToTndRate: number = 3; // Assume 1 USD = 3 TND

  private products: Product[] = [
    { 
      id: 1, 
      title: 'Washing Machine', 
      description: 'High efficiency washing machine', 
      briefDescription: 'High efficiency washing machine suitable for large families.',
      longDescription: 'This high efficiency washing machine is perfect for large families...',
      features: ['Energy efficient', 'Large capacity'],
      highlights: 'Suitable for large families, energy efficient',
      performance: 'High performance washing cycles',
      battery: '',
      security: '',
      productCategory: CategoryType.Electronics, 
      price: 899, 
      quantity: 10, 
      imageUrl: 'assets/images/Electronics/washing_machine_samsung_1.png',
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg'
      ], 
      brand: 'Samsung', 
      details: { Capacity: '8 Kg', Power: '800 W', Warranty: '2 Years' },
      technicalSpecifications: ['Capacity: 8 Kg', 'Power: 800 W'],
      warranty: '2 Years Manufacturer Warranty',
      dimensions: '60 cm x 55 cm x 85 cm',
      weight: 50,
      color: 'White',
      sku: 'WM-123',
      gtin: '1234567890123',
      range: 'High Efficiency',
      model: 'WM-8000',
      os: 'Not Applicable',
      connectivity: 'Not Applicable',
      screen: 'Not Applicable',
      resolution: 'Not Applicable',
      frontCamera: 'Not Applicable',
      rearCamera: 'Not Applicable',
      sim: 0,
      discount:25,
      stock:10,
      shippingDiscount:7,
      shippingDestination: 'All Tunisia',
      rating:4.9,
      newCustomerDiscount:50,
      newCustomerCode:'ahdhyllfg',
      contactNumber:'+123-456-789',
      freeShippingThreshold:200,
      express:true
    },
    { 
      id: 2, 
      title: 'Microwave', 
      description: 'Compact microwave', 
      briefDescription: 'Compact microwave ideal for small kitchens.',
      longDescription: 'This compact microwave is perfect for heating up quick meals in small kitchens...',
      features: ['Compact design', 'Easy to use'],
      highlights: 'Ideal for small kitchens',
      performance: 'Quick heating cycles',
      battery: '',
      security: '',
      productCategory: CategoryType.Electronics, 
      price: 99, 
      quantity: 20, 
      imageUrl: 'assets/images/Electronics/246524_ornvkt.png', 
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg'
      ], 
      brand: 'LG', 
      details: { Capacity: '20 L', Power: '800 W', Warranty: '1 Year' },
      technicalSpecifications: ['Capacity: 20 L', 'Power: 800 W'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '45 cm x 35 cm x 25 cm'
    },
    { 
      id: 3, 
      title: 'Television', 
      description: 'Newest TV', 
      briefDescription: 'Cutting-edge television with stunning 4K resolution.',
      longDescription: 'Immerse yourself in stunning visuals with this 4K resolution television...',
      features: ['4K resolution', 'Smart TV capabilities'],
      highlights: 'Stunning visuals, smart TV features',
      performance: 'High-quality display',
      battery: '',
      security: '',
      productCategory: CategoryType.Electronics, 
      price: 1050, 
      quantity: 20, 
      imageUrl: 'assets/images/Electronics/TV-LG1.png', 
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg'
      ], 
      brand: 'LG', 
      details: { ScreenSize: '55"', Resolution: '4K', Warranty: '2 Years' },
      technicalSpecifications: ['Screen Size: 55"', 'Resolution: 4K'],
      warranty: '2 Years Manufacturer Warranty',
      dimensions: '130 cm x 80 cm x 15 cm'
    },
    { 
      id: 4, 
      title: 'Smartphone', 
      description: 'Latest smartphone', 
      briefDescription: 'Stay connected with the latest smartphone technology.',
      longDescription: 'Experience the latest in smartphone technology with this powerful device...',
      features: ['High-resolution camera', 'Fast processing'],
      highlights: 'Cutting-edge smartphone features',
      performance: 'Smooth operation',
      battery: '',
      security: '',
      productCategory: CategoryType.Phones, 
      price: 699, 
      quantity: 15, 
      imageUrl: 'assets/images/Phones/portable-samsung-galaxy-a05s_1.png', 
      images: [
        'assets/images/Phones/portable-samsung-galaxy-a05s_1.png',
        'assets/images/Phones/samsung_sides1.png',
        'assets/images/Phones/3.png',
      ], 
      brand: 'Apple', 
      details: { Model: 'Samsung Galaxy A05s - 6.7" HD+ - 4 Go – 128 Go - 5000 Mah - 50 MP – Silver', Storage: '128 GB', Warranty: '1 Year' },
      technicalSpecifications: ['Model:Samsung Galaxy A05s ', 'Storage: 128 GB'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '15 cm x 7 cm x 0.8 cm'
    },
    { 
      id: 4, 
      title: 'Smartphone', 
      description: 'Latest smartphone', 
      briefDescription: 'Stay connected with the latest smartphone technology.',
      longDescription: 'Experience the latest in smartphone technology with this powerful device...',
      features: ['High-resolution camera', 'Fast processing'],
      highlights: 'Cutting-edge smartphone features',
      performance: 'Smooth operation',
      battery: '',
      security: '',
      productCategory: CategoryType.Phones, 
      price: 699, 
      quantity: 15, 
      imageUrl: 'assets/images/Phones/portable-samsung-galaxy-a05s_1.png', 
      images: [
        'assets/images/Phones/portable-samsung-galaxy-a05s_1.png',
        'assets/images/Phones/samsung_sides1.png',
        'assets/images/Phones/3.png',
      ], 
      brand: 'Apple', 
      details: { Model: 'Samsung Galaxy A05s - 6.7" HD+ - 4 Go – 128 Go - 5000 Mah - 50 MP – Silver', Storage: '128 GB', Warranty: '1 Year' },
      technicalSpecifications: ['Model:Samsung Galaxy A05s ', 'Storage: 128 GB'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '15 cm x 7 cm x 0.8 cm'
    },
    { 
      id: 4, 
      title: 'Smartphone', 
      description: 'Latest smartphone', 
      briefDescription: 'Stay connected with the latest smartphone technology.',
      longDescription: 'Experience the latest in smartphone technology with this powerful device...',
      features: ['High-resolution camera', 'Fast processing'],
      highlights: 'Cutting-edge smartphone features',
      performance: 'Smooth operation',
      battery: '',
      security: '',
      productCategory: CategoryType.Phones, 
      price: 699, 
      quantity: 15, 
      imageUrl: 'assets/images/Phones/portable-samsung-galaxy-a05s_1.png', 
      images: [
        'assets/images/Phones/portable-samsung-galaxy-a05s_1.png',
        'assets/images/Phones/samsung_sides1.png',
        'assets/images/Phones/3.png',
      ], 
      brand: 'Apple', 
      details: { Model: 'Samsung Galaxy A05s - 6.7" HD+ - 4 Go – 128 Go - 5000 Mah - 50 MP – Silver', Storage: '128 GB', Warranty: '1 Year' },
      technicalSpecifications: ['Model:Samsung Galaxy A05s ', 'Storage: 128 GB'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '15 cm x 7 cm x 0.8 cm'
    },
    { 
      id: 4, 
      title: 'Smartphone', 
      description: 'Latest smartphone', 
      briefDescription: 'Stay connected with the latest smartphone technology.',
      longDescription: 'Experience the latest in smartphone technology with this powerful device...',
      features: ['High-resolution camera', 'Fast processing'],
      highlights: 'Cutting-edge smartphone features',
      performance: 'Smooth operation',
      battery: '',
      security: '',
      productCategory: CategoryType.Phones, 
      price: 699, 
      quantity: 15, 
      imageUrl: 'assets/images/Phones/portable-samsung-galaxy-a05s_1.png', 
      images: [
        'assets/images/Phones/portable-samsung-galaxy-a05s_1.png',
        'assets/images/Phones/samsung_sides1.png',
        'assets/images/Phones/3.png',
      ], 
      brand: 'Apple', 
      details: { Model: 'Samsung Galaxy A05s - 6.7" HD+ - 4 Go – 128 Go - 5000 Mah - 50 MP – Silver', Storage: '128 GB', Warranty: '1 Year' },
      technicalSpecifications: ['Model:Samsung Galaxy A05s ', 'Storage: 128 GB'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '15 cm x 7 cm x 0.8 cm'
    },
    { 
      id: 4, 
      title: 'Smartphone', 
      description: 'Latest smartphone', 
      briefDescription: 'Stay connected with the latest smartphone technology.',
      longDescription: 'Experience the latest in smartphone technology with this powerful device...',
      features: ['High-resolution camera', 'Fast processing'],
      highlights: 'Cutting-edge smartphone features',
      performance: 'Smooth operation',
      battery: '',
      security: '',
      productCategory: CategoryType.Phones, 
      price: 699, 
      quantity: 15, 
      imageUrl: 'assets/images/Phones/portable-samsung-galaxy-a05s_1.png', 
      images: [
        'assets/images/Phones/portable-samsung-galaxy-a05s_1.png',
        'assets/images/Phones/samsung_sides1.png',
        'assets/images/Phones/3.png',
      ], 
      brand: 'Apple', 
      details: { Model: 'Samsung Galaxy A05s - 6.7" HD+ - 4 Go – 128 Go - 5000 Mah - 50 MP – Silver', Storage: '128 GB', Warranty: '1 Year' },
      technicalSpecifications: ['Model:Samsung Galaxy A05s ', 'Storage: 128 GB'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '15 cm x 7 cm x 0.8 cm'
    },
    { 
      id: 5, 
      title: 'Laptop', 
      description: 'High performance laptop', 
      briefDescription: 'Powerful laptop for work and entertainment.',
      longDescription: 'Get the job done with this high-performance laptop designed for work and entertainment...',
      features: ['Fast processor', 'Large storage capacity'],
      highlights: 'Ideal for work and entertainment',
      performance: 'High-speed computing',
      battery: '',
      security: '',
      productCategory: CategoryType.Informatique, 
      price: 2200, 
      quantity: 5, 
      imageUrl: 'assets/images/Informatique/asus1.png', 
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg'
      ], 
      brand: 'Dell', 
      details: { Processor: 'Intel i7', RAM: '16 GB', Storage: '512 GB SSD', Warranty: '1 Year' },
      technicalSpecifications: ['Processor: Intel i7', 'RAM: 16 GB', 'Storage: 512 GB SSD'],
      warranty: '1 Year Manufacturer Warranty',
      dimensions: '35 cm x 25 cm x 2 cm'
    },
    { 
      id: 6, 
      title: 'Shoes', 
      description: 'ON FIRE ', 
      briefDescription: 'Stylish shoes for everyday wear.',
      longDescription: 'Step out in style with these comfortable and trendy shoes...',
      features: ['Comfortable fit', 'Stylish design'],
      highlights: 'Perfect for everyday wear',
      performance: '',
      battery: '',
      security: '',
      productCategory: CategoryType.Mode, 
      price: 150, 
      quantity: 25, 
      imageUrl: 'assets/images/Mode/jordan_shoes.jpg', 
      images: [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg'
      ], 
      brand: 'Jordan', 
      details: { Size: 'M', Material: 'Cotton', Warranty: 'No warranty' },
      warranty: 'No Warranty',
      dimensions: '30 cm x 15 cm x 10 cm',
      discount:25
    }
  ];

  private categories: Category[] = [
    {
      id: 1,
      name: CategoryType.Electronics,
      products: this.products.filter(product => product.productCategory === CategoryType.Electronics)
    },
    {
      id: 2,
      name: CategoryType.Phones,
      products: this.products.filter(product => product.productCategory === CategoryType.Phones)
    },
    {
      id: 3,
      name: CategoryType.Informatique,
      products: this.products.filter(product => product.productCategory === CategoryType.Informatique)
    },
    {
      id: 4,
      name: CategoryType.Mode,
      products: this.products.filter(product => product.productCategory === CategoryType.Mode)
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getProducts(): Product[] {
    // Convert prices from USD to TND
    return this.products.map(product => ({
      ...product,
      price: product.price
    }));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
