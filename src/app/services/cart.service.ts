import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { product: Product; quantity: number }[] = [];
  private items$ = new BehaviorSubject<{ product: Product; quantity: number }[]>(this.items);

  constructor() {
    // Load items from localStorage when service initializes
    if (typeof localStorage !== 'undefined') {
      this.loadItemsFromStorage();
    }
  }

  addToCart(product: Product): void {
    const item = this.items.find(item => item.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.items$.next(this.items);
    this.saveItemsToStorage(); // Save items to localStorage if available
  }

  getItems$(): BehaviorSubject<{ product: Product; quantity: number }[]> {
    return this.items$;
  }

  clearCart(): void {
    this.items = [];
    this.items$.next(this.items);
    this.saveItemsToStorage(); // Save empty cart to localStorage if available
  }

  removeFromCart(product: Product): void {
    this.items = this.items.filter(item => item.product.id !== product.id);
    this.items$.next(this.items);
    this.saveItemsToStorage(); // Save updated cart to localStorage if available
  }

  updateQuantity(product: Product, quantity: number): void {
    const item = this.items.find(item => item.product.id === product.id);
    if (item) {
      item.quantity = quantity;
      this.items$.next(this.items);
      this.saveItemsToStorage(); // Save updated cart to localStorage if available
    }
  }

  private saveItemsToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  }

  private loadItemsFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const savedItems = localStorage.getItem('cartItems');
      this.items = savedItems ? JSON.parse(savedItems) : [];
      this.items$.next(this.items);
    }
  }

  startShopping(): void {
    console.log('Start shopping action');
    // Example: Navigate to shopping page if needed
    // Implement logic based on your application requirements
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
