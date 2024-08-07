import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      transition('hidden => visible', [
        animate('1s ease-out')
      ]),
      transition('visible => hidden', [
        animate('1s ease-in')
      ])
    ])
  ],
  
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryId: number | null = null;
  page = 1;
  pageSize = 20;
  isLoading = false;
  allProductsLoaded = false;
  introCards = [
    {
      title: 'Welcome to Our Product List!',
      description: 'Explore our wide range of products categorized just for you. Find what you need and more!',
      image: 'assets/category-list.png'
    },
    {
      title: 'Exclusive Deals!',
      description: 'Get access to exclusive deals and discounts on your favorite products.',
      image: 'assets/line-discount.jpg'
    },
    {
      title: 'Top Picks for You!',
      description: 'Check out our top picks based on your interests and preferences.',
      image: 'assets/category-list-11.jpeg'
    }
  ];
  currentCardIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryIdParam = params.get('categoryID');
      if (categoryIdParam !== null) {
        const categoryId = +categoryIdParam;
        if (!isNaN(categoryId)) {
          this.categoryId = categoryId;
          this.products = [];
          this.page = 1;
          this.allProductsLoaded = false;
          this.loadAllProducts();
        } else {
          console.error('Invalid categoryId:', categoryIdParam);
        }
      }
    });

    this.startIntroCardSequence();
  }

  loadAllProducts(): void {
    if (!this.isLoading && this.categoryId !== null && !this.allProductsLoaded) {
      this.isLoading = true;
      this.productService.getProductsByCategory(this.categoryId, this.page, 100)
        .subscribe(
          (newProducts: Product[]) => {
            if (newProducts.length > 0) {
              this.products = [...this.products, ...newProducts];
              this.page++;
              if (newProducts.length < this.pageSize) {
                this.allProductsLoaded = true;
              }
            } else {
              this.allProductsLoaded = true;
            }
            this.isLoading = false;
          },
          error => {
            console.error('Error loading products:', error);
            this.isLoading = false;
          }
        );
    }
  }

  startIntroCardSequence(): void {
    setInterval(() => {
      this.currentCardIndex = (this.currentCardIndex + 1) % this.introCards.length;
    }, 3000); // Change every 3 seconds
  }

  addToCart(product: Product): void {
    console.log(`Adding ${product.title} to cart`);
  }

  prevCard(): void {
    this.currentCardIndex = (this.currentCardIndex - 1 + this.introCards.length) % this.introCards.length;
  }

  nextCard(): void {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.introCards.length;
  }
}
