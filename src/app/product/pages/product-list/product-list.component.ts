import { Component, Inject, signal } from '@angular/core';
import type { OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FrameworkModule } from '../../../framework/framework.module';
import { ColumnDefinition } from '../../../framework/controls/table/table.component';

import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  public products: Array<Product> = [];
  public productsToShow: Array<Product> = [];
  public columnDefinition: Array<ColumnDefinition> = [];

  public searchModel: WritableSignal<SearchModel | undefined> = signal(undefined);

  private subject: Subject<any> = new Subject();

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.columnDefinition = [
      { attr: 'logo', label: 'Logo' },
      { attr: 'name', label: 'Nombre del producto' },
      { attr: 'description', label: 'Descripción' },
      { attr: 'date_release', label: 'Fecha de liberación' },
      { attr: 'date_revision', label: 'Fecha de reestructuracion' }
    ];

    this.productService.getAll('123').subscribe((products: Array<Product>) => {
      this.products = products;
      this.productsToShow = this.products;
    });

    this.subject.pipe(
      debounceTime(500)
    ).subscribe((name: string) => this.filterByName(name));
  }

  onSearchChange(text: string): void {
    this.subject.next(text);
  }

  filterByName(name: string): void {
    this.productsToShow = this.products.filter((product: Product) => product.name.includes(name));
  }

  navigateToAddPage(): void {
    this.router.navigateByUrl('/product-edit');
  }

}

interface SearchModel {
  search: string;  
}
