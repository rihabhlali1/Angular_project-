import { Injectable } from '@angular/core';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { product: Product, quantity: number }[] = [];

  addToCart(product: Product): void {
    const item = this.items.find(item => item.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  clearCart(): { product: Product, quantity: number }[] {
    this.items = [];
    return this.items;
  }


  removeItem(product: Product): void {
    this.items = this.items.filter(item => item.product.id !== product.id);
  }

  updateQuantity(product: Product, quantity: number): void {
    const item = this.items.find(item => item.product.id === product.id);
    if (item) {
      item.quantity = quantity;
    }
  }

  startShopping() {
    // Logic to handle starting shopping, e.g., navigate to a shopping page or load products
    console.log('Start shopping action');
    // Example: Navigate to shopping page
    
  }
}
