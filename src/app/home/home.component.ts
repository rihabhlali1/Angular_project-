import { Component, OnInit, ViewChildren, QueryList, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Category, Product } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHomePage: boolean = false;
  categories: Category[] = [];
  discountProducts: Product[] = [];
  @ViewChildren('scrollContainer') scrollContainers: QueryList<ElementRef>;
  @ViewChildren('discountScrollContainer') discountScrollContainers: QueryList<ElementRef>;

  private phrases: string[] = [
    "Your one-stop shop for all your needs!",
    "Explore our diverse range of products.",
    "Enjoy a seamless shopping experience."
  ];
  private typingSpeed = 100;
  private deletingSpeed = 50;
  private delayBetweenPhrases = 1000;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.scrollContainers = new QueryList<ElementRef>();
    this.discountScrollContainers = new QueryList<ElementRef>();
  }

  ngOnInit(): void {
    this.isHomePage = this.router.url === '/';
    this.loadCategoriesWithProducts();
    this.loadDiscountProducts();
    
    // Only call animateIntroParagraph in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.animateIntroParagraph();
    }
  }

  loadCategoriesWithProducts(): void {
    this.productService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.categories.forEach((category, index) => {
          this.productService.getProductsByCategory(category.id, 1, 20).subscribe({
            next: (products: Product[]) => {
              this.categories[index].products = products;
            },
            error: (error) => {
              console.error(`Failed to load products for category ${category.name}:`, error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      }
    });
  }

  loadDiscountProducts(): void {
    this.productService.getDiscountProducts().subscribe({
      next: (products: Product[]) => {
        this.discountProducts = products;
      },
      error: (error) => {
        console.error('Failed to load discounted products:', error);
      }
    });
  }

  animateIntroParagraph(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const paragraph = document.getElementById('intro-paragraph');
    if (!paragraph) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = this.phrases[phraseIndex];
      let displayText = currentPhrase.substring(0, charIndex);

      if (!isDeleting) {
        charIndex++;
      } else {
        charIndex--;
      }

      paragraph.innerText = displayText;

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, this.delayBetweenPhrases);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % this.phrases.length;
      }

      const speed = isDeleting ? this.deletingSpeed : this.typingSpeed;
      setTimeout(type, speed);
    };

    type();
  }

  scrollLeft(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollContainer = this.scrollContainers.toArray()[index].nativeElement;
      scrollContainer.scrollTo({
        left: scrollContainer.scrollLeft - 200,
        behavior: 'smooth'
      });
    }
  }

  scrollRight(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollContainer = this.scrollContainers.toArray()[index].nativeElement;
      scrollContainer.scrollTo({
        left: scrollContainer.scrollLeft + 200,
        behavior: 'smooth'
      });
    }
  }

  scrollLeftDiscount(): void {
    if (isPlatformBrowser(this.platformId)) {
      const discountScrollContainer = this.discountScrollContainers.first.nativeElement;
      discountScrollContainer.scrollTo({
        left: discountScrollContainer.scrollLeft - 200,
        behavior: 'smooth'
      });
    }
  }

  scrollRightDiscount(): void {
    if (isPlatformBrowser(this.platformId)) {
      const discountScrollContainer = this.discountScrollContainers.first.nativeElement;
      discountScrollContainer.scrollTo({
        left: discountScrollContainer.scrollLeft + 200,
        behavior: 'smooth'
      });
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const introCard = document.querySelector('.intro-card') as HTMLElement;
      const categorySections = document.querySelectorAll('.category-section');

      if (window.scrollY >= introCard.clientHeight) {
        categorySections.forEach(section => section.classList.add('visible'));
      } else {
        categorySections.forEach(section => section.classList.remove('visible'));
      }
    }
  }
}
