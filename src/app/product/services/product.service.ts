import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  public getAll(authorId: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>("https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products", { headers: { authorId } });
  }
}
