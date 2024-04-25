import { Component, Inject, signal } from '@angular/core';
import type { OnInit, WritableSignal } from '@angular/core';
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


  ngOnInit(): void {
    // this.model.set();
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