import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}`);
  }

  getProductById(productId: Number) {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  getProductByName(name: string) {
    return this.http.get<Product[]>(`${this.url}/search?name=${name}`);
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
