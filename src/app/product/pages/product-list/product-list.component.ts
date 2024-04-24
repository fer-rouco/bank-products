import { Component, Inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FrameworkModule } from '../../../framework/framework.module';
import { ColumnDefinition } from '../../../framework/controls/table/table.component';



@Component({
  selector: 'product-list',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public products: Array<Product> = [];
  public columnDefinition: Array<ColumnDefinition> = [];

  constructor(@Inject(ProductService) private productService: ProductService) {}

  ngOnInit(): void {
    this.columnDefinition = [
      { attr: 'logo', label: 'Logo' },
      { attr: 'name', label: 'Nombre del producto' },
      { attr: 'description', label: 'Descripción' },
      { attr: 'date_release', label: 'Fecha de liberación' },
      { attr: 'date_revision', label: 'Fecha de reestructuracion' }
    ];

    this.productService.getAll().subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }

}
