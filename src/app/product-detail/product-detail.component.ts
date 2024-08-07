import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service'; // Import CartService
import { Product } from '../models/models'; // Adjust path as per your project structure

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  selectedImage?: string; // Declare selectedImage as an optional property

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id']; // convert string to number
      this.productService.getProduct(productId).subscribe({
        next: (product: Product) => {
          this.product = product;
          if (this.product) {
            this.selectedImage = this.product.imageUrl; // Set selectedImage here
          }
        },
        error: (err: any) => { // Specify the type for 'err'
          console.error('Error fetching product', err);
        }
      });
    });
  }

  // Helper function to get keys of object properties
  getProductKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Method to add a product to the cart (example)
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  
  // Method to change the selected image
  changeImage(image: string) {
    this.selectedImage = image;
  }
}
