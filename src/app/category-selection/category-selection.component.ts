import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Category, Product, CategoryType } from '../models/models';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css']
})
export class CategorySelectionComponent implements OnInit {
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts]; // Initialize with all products
  
    console.log('Categories:', this.categories);
    console.log('All Products:', this.allProducts);
  }


  
  filterProductsByCategory(category: Category): void {
    console.log('Selected Category:', category);
    this.filteredProducts = this.allProducts.filter(product => product.productCategory === category.name);
    console.log('Filtered Products:', this.filteredProducts);
  }
}