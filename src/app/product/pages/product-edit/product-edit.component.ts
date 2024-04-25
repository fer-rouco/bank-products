import { Component, Inject, signal } from '@angular/core';
import type { OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

import { FrameworkModule } from '../../../framework/framework.module';
import { Product } from '../../models/product';

@Component({
  selector: 'product-edit',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  // public model: WritableSignal<ProductModel | undefined> = signal(new ProductModel(""));
  public model: WritableSignal<Product | undefined> = signal(<Product> {});
  public formValid: boolean = true;

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.model.set();
  }

  create(): void {
    let product: Product | undefined = this.model();
    if (product) {
      this.productService.create('123', product).subscribe(console.log);
    }
  }

  clearModel(): void {
    this.model.set(<Product> {});
  }
}

class ProductModel {
  constructor(
    private name: string = ""
  ) {}
  
  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
  }

}