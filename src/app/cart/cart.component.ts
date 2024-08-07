import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<{ product: Product; quantity: number }[]>;
  showOrderModal = false;
  selectedOrderItem!: { product: Product; quantity: number };
  subTotal: number = 0;
  orderTotal: number = 0;
  iconVisible: boolean = false;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems$();
    this.cartItems$.subscribe(items => {
      this.calculateTotals(items);
    });
  }

  ngOnInit(): void {}

  calculateTotals(items: { product: Product; quantity: number }[]): void {
    this.subTotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.orderTotal = this.subTotal; // Add any additional charges if needed
  }

  updateQuantity(product: Product, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);
    if (!isNaN(quantity)) {
      this.cartService.updateQuantity(product, quantity);
    }
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.iconVisible = false;
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.iconVisible = false;
  }

  order(item: { product: Product; quantity: number }): void {
    this.selectedOrderItem = item;
    this.showOrderModal = true;
}

  closeOrderDialog(): void {
    this.showOrderModal = false;
  }

  confirmOrder(): void {
    alert('Order confirmed!');
    this.closeOrderDialog();
  }

  startShopping(): void {
    this.cartService.startShopping();
  }

  showIcon(): void {
    this.iconVisible = true;
    setTimeout(() => {
      this.iconVisible = false;
    }, 2000);
  }
}
