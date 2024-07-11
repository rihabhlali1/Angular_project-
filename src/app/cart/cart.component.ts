import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/models'; // Ensure you have this model defined

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getItems();
  }

  clearCart() {
    this.cartItems = this.cartService.clearCart();
  }

  startShopping() {
    // Logic to handle starting shopping, e.g., navigate to a shopping page or load products
    console.log('Start shopping action');
    // Example: Navigate to shopping page
  }

  updateQuantity(product: Product, quantity: number): void {
    this.cartService.updateQuantity(product, quantity);
    this.cartItems = this.cartService.getItems(); // Refresh the cart items
  }

  removeFromCart(product: Product): void {
    this.cartService.removeItem(product);
    this.cartItems = this.cartService.getItems(); // Refresh the cart items
  }
}
