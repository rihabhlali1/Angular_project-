// src/app/home/home.component.ts
import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Category } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHomePage: boolean = false;
  categories: Category[] = [];
  @ViewChildren('scrollContainer') scrollContainers: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    this.scrollContainers = new QueryList<ElementRef>();
  }

  ngOnInit(): void {
    this.isHomePage = this.router.url === '/';
    this.categories = this.productService.getCategories();
    console.log('Categories in HomeComponent:', this.categories);
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/product-detail', productId]);
  }

  showLeftScroll(index: number): boolean {
    const scrollContainer = document.querySelectorAll('.product-list')[index] as HTMLElement;
    return scrollContainer.scrollLeft > 0;
  }

  showRightScroll(index: number): boolean {
    const scrollContainer = document.querySelectorAll('.product-list')[index] as HTMLElement;
    return scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth);
  }

  scrollLeft(index: number) {
    const scrollContainer = document.querySelectorAll('.product-list')[index] as HTMLElement;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft - scrollContainer.clientWidth,
      behavior: 'smooth'
    });
  }

  scrollRight(index: number) {
    const scrollContainer = document.querySelectorAll('.product-list')[index] as HTMLElement;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + scrollContainer.clientWidth,
      behavior: 'smooth'
    });
  }
}