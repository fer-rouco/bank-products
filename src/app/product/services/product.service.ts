import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL: string = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  private product: Product | undefined = undefined;

  private buildHeader(authorId: string) {
    return { headers: { authorId } }
  }

  public getAll(authorId: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.BASE_URL}/bp/products`, this.buildHeader(authorId));
  }

  public create(authorId: string, product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.BASE_URL}/bp/products`, product, this.buildHeader(authorId));
  }

  public update(authorId: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.BASE_URL}/bp/products`, product, this.buildHeader(authorId));
  }

  public delete(authorId: string, product: Product): Observable<string> {
    return this.httpClient.delete<string>(`${this.BASE_URL}/bp/products?id=${product.id}`, this.buildHeader(authorId));
  }

  public verify(authorId: string, product: Product): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.BASE_URL}/bp/products/verification?id=${product.id}`, this.buildHeader(authorId));
  }

  public setProduct(product: Product | undefined): void {
    this.product = product;
  }

  public getProduct(): Product | undefined {
    return this.product;
  }
}
