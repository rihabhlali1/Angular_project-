import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/models';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: string | undefined; // Initialize category as undefined

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params['category']; // Get category from router params
      if (this.category) {
        this.filterProductsByCategory(this.category); // Filter products based on category if it exists
      } else {
        this.products = this.productService.getProducts(); // Default behavior if no category is provided
      }
    });
  }

  filterProductsByCategory(category: string): void {
    this.products = this.productService.getProducts()
      .filter(product => product.productCategory === category);
  }

  addToCart(product: Product): void {
    // Add logic to add the product to the cart
    console.log(`Adding ${product.title} to cart`);
  }
}
