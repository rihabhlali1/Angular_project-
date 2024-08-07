import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery: string = '';
  cartItems: { product: Product; quantity: number }[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  showCategories: boolean = false;
  currentRoute: string = '';
  showLoginDropdown: boolean = false;
  showLogin: boolean = false;
  showRegister: boolean = false;

  private routerEvents$: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cartService.getItems$().subscribe((items: { product: Product; quantity: number }[]) => {
      this.cartItems = items;
      this.totalItems = this.cartService.getTotalItems();
      this.totalPrice = this.cartService.getTotalPrice();
    });

    this.routerEvents$ = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('click', this.handleClickOutside.bind(this));
    }
    this.routerEvents$.unsubscribe();
  }

  toggleCategories(event: MouseEvent) {
    event.stopPropagation(); // Prevent event from bubbling up
    this.showCategories = !this.showCategories;
  }

  toggleLoginDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent event from bubbling up
    this.showLoginDropdown = !this.showLoginDropdown;
    this.showLogin = false; // Ensure other modals are closed
    this.showRegister = false; // Ensure other modals are closed
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if the target is not inside the login dropdown
    if (this.showLoginDropdown && !target.closest('.login-dropdown') && !target.closest('.dropdown')) {
      this.showLoginDropdown = false;
    }
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    if (this.showLogin) {
      this.showRegister = false;
    }
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
    if (this.showRegister) {
      this.showLogin = false;
    }
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }

  handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModals();
    }
  }

  handleModalContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  search() {
    if (this.searchQuery.trim() === '') {
      return;
    }

    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }

  getCartButtonText(): string {
    return `Checkout (${this.totalItems})`;
  }
}
