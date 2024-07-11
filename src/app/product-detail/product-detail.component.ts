import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id']; // convert string to number
      this.productService.getProductById(productId).subscribe({
        next: (product: Product | undefined) => {
          this.product = product;
          if (this.product) {
            this.selectedImage = this.product.imageUrl; // Set selectedImage here
          }
        },
        error: err => {
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
  addToCart(): void {
    // Implement your add to cart logic here
    console.log('Product added to cart:', this.product);
  }

  // Method to change the selected image
  changeImage(image: string) {
    this.selectedImage = image;
  }
}
