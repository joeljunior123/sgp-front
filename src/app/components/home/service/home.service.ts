import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, Product } from '../../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getPaginatedProducts(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&itens=${size}`);
  }

  getProductById(productId: Number) {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  getProductByName(name: string, page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.url}/search?name=${name}&page=${page}&size=${size}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${productId}`);
  }
}
