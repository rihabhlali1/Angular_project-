import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:5217/api/products';
  private categoriesUrl = 'http://localhost:5217/api/categories';

  constructor(private http: HttpClient) { }

  getProductsByCategory(categoryID: number, page: number, pageSize: number): Observable<Product[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
    return this.http.get<Product[]>(`${this.productsUrl}/category/${categoryID}`, { params });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  searchProduct(query: string): Observable<Product[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<Product[]>(`${this.productsUrl}/search`, { params });
  }

  getDiscountProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/discounts`); // Ensure this endpoint is set up in your backend
  }
}
