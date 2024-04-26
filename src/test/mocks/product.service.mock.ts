import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../app/product/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceMock { 

  private product: Product | undefined = undefined;

  constructor() { }

  private mockProductList(): Array<Product> {
    return [
      <Product>{
        id: 'VisaPlatinum',
        name: 'Visa Platinum',
        description: 'Visa Platinum Product',
        logo: 'https://www.copaair.com/assets/Produbanco-Platinum.png',
        date_release: '25/05/2030',
        date_revision: '25/05/2031'
      },
      <Product>{
        id: 'VisaSignature',
        name: 'Visa Signature',
        description: 'Visa Signature Product',
        logo: 'https://www.copaair.com/assets/Banco-General-Signature.png',
        date_release: '12/05/2028',
        date_revision: '12/05/2029'
      },
      <Product>{
        id: 'VisaAereo',
        name: 'Visa Aereo',
        description: 'Visa Aereo Product',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Run%20Your%20Business/Commercial%20Solutions/Corporate%20Cards/CTA/CTA%20Aereo/corporaciones-cta-aereo-640x404.jpg',
        date_release: '10/02/2028',
        date_revision: '10/02/2029'
      },
      <Product>{
        id: 'MasterCard',
        name: 'MasterCard',
        description: 'MasterCard Product',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrAXxIMPWJK42ScuyeOzQRh7t6S886WFVBZjIDJ7_6MJ1cIr7NVJ3JEIKAga75sKuJ4U&usqp=CAU',
        date_release: '01/08/2026',
        date_revision: '01/08/2027'
      },
      <Product>{
        id: 'Prestamo',
        name: 'Prestamo',
        description: 'Prestamo Product',
        logo: 'https://kapitalizateya.com/wp-content/uploads/2023/06/prestamo.jpeg',
        date_release: '10/02/2028',
        date_revision: '10/02/2029'
      },
      <Product>{
        id: 'BancoPichincha',
        name: 'Banco Pichincha',
        description: 'Banco Pichincha Product',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Banco-Pichincha.png',
        date_release: '16/09/2028',
        date_revision: '16/09/2029'
      }
    ];
  }
  
  public getAll(authorId: string): Observable<Array<Product>> {
    return of(this.mockProductList());
  }

  // public create(authorId: string, product: Product): Observable<Product> {
  //   return this.httpClient.post<Product>(`${this.BASE_URL}/bp/products`, product, this.buildHeader(authorId));
  // }

  // public update(authorId: string, product: Product): Observable<Product> {
  //   return this.httpClient.put<Product>(`${this.BASE_URL}/bp/products`, product, this.buildHeader(authorId));
  // }

  // public delete(authorId: string, product: Product): Observable<string> {
  //   return this.httpClient.delete<string>(`${this.BASE_URL}/bp/products?id=${product.id}`, this.buildHeader(authorId));
  // }

  // public verify(authorId: string, product: Product): Observable<boolean> {
  //   return this.httpClient.get<boolean>(`${this.BASE_URL}/bp/products/verification?id=${product.id}`, this.buildHeader(authorId));
  // }

  public setProduct(product: Product | undefined): void {
    this.product = product;
  }

  public getProduct(): Product | undefined {
    return this.product;
  }
}