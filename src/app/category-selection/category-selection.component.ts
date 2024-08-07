import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Category, Product } from '../models/models'; // Ensure models are imported correctly

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
    this.productService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.productService.getProducts().subscribe((products: Product[]) => {
      this.allProducts = products;
      this.filteredProducts = [...this.allProducts];
    });
  }

  filterProductsByCategory(category: Category): void {
    console.log('Selected Category:', category);
    this.filteredProducts = this.allProducts.filter(product => product.productCategory === category.name);
    console.log('Filtered Products:', this.filteredProducts);
  }
}
