// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItems: any[] = [];
  showCategories: boolean = false; 
  currentRoute: string = '';
  showLogin: boolean = false;
  showRegister: boolean = false;
    

  constructor(private cartService: CartService , private router: Router) {
    this.cartItems = this.cartService.getItems();
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
          this.currentRoute = val.url;
      }
  });
  }

  openModal(type?: string) { // Optional parameter
    // Define your modal opening logic here based on 'type'
    console.log(`Opening modal for ${type}`);
}

toggleCategories() {
  this.showCategories = !this.showCategories; 
}

closeCategories() {
  this.showCategories = false;

}
toggleLogin() {
  this.showLogin = !this.showLogin;
  if (this.showLogin) {
      this.showRegister = false; // Close register if open
  }
}

toggleRegister() {
  this.showRegister = !this.showRegister;
  if (this.showRegister) {
      this.showLogin = false; // Close login if open
  }
}


}

