import { Component, Inject, signal } from '@angular/core';
import type { OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FrameworkModule } from '../../../framework/framework.module';
import { ColumnDefinition, TableAction } from '../../../framework/controls/table/table.component';
import { NotificationService } from '../../../framework/generic/notification.service';


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
  public tableActions: Array<TableAction> = [];

  public searchModel: WritableSignal<SearchModel | undefined> = signal(undefined);

  private searchDebounceSubject: Subject<any> = new Subject();

  public showDeleteModal: boolean = false;
  public productToDelete: Product | undefined;

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService,
    @Inject(NotificationService) private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.columnDefinition = [
      { attr: 'logo', label: 'Logo' },
      { attr: 'name', label: 'Nombre del producto' },
      { attr: 'description', label: 'Descripción' },
      { attr: 'date_release', label: 'Fecha de liberación' },
      { attr: 'date_revision', label: 'Fecha de reestructuracion' }
    ];

    this.tableActions = [
      { id: 'update', label: "Editar", fn: (product: Product) => { 
        this.productService.setProduct(product);
        this.router.navigateByUrl('/product-edit'); 
      }},
      { id: 'delete', label: "Borrar", fn: (product: Product) => {
        this.productToDelete = product;
        this.showDeleteModal = true;
      }}
    ];

    this.fetch();

    this.searchDebounceSubject.pipe(
      debounceTime(500)
    ).subscribe((name: string) => this.filterByName(name));
  }

  fetch(): void {
    this.productService.getAll('123').subscribe((products: Array<Product>) => {
      this.products = products;
      this.productsToShow = this.products;
    });
  }

  onSearchChange(text: string): void {
    this.searchDebounceSubject.next(text);
  }

  filterByName(name: string): void {
    this.productsToShow = this.products.filter((product: Product) => product.name.includes(name));
  }

  navigateToAddPage(): void {
    this.productService.setProduct(undefined);
    this.router.navigateByUrl('/product-edit');
  }

  acceptModal(): void {
    if (this.productToDelete) {
      this.productService.delete('123', this.productToDelete).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.notificationService.addSuccess('Producto eliminado exitosamente!');
          this.fetch();
        },
        error: (error: Response) => {
          this.showDeleteModal = false;
          if (error.status === 200) {
            // No termino de entender el motivo pero misteriosamente la api me responde con error pero de todas
            // formas borra el producto, por eso duplique este codigo 
            this.notificationService.addSuccess('Producto eliminado exitosamente!');
            this.fetch();

            return;
          }

          this.notificationService.addError('Error al intentar eliminar el producto!');
        }
      });
    } 
  }

  cancelModal(): void {
    this.showDeleteModal = false;
  }

}

interface SearchModel {
  search: string;  
}
