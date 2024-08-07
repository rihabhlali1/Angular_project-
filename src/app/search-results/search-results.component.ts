import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.searchProducts();
    });
  }

  searchProducts(): void {
    if (this.searchTerm) {
      this.productService.searchProduct(this.searchTerm).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        error => {
          console.error('Error fetching products', error);
        }
      );
    }
  }
}
