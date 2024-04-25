import type { OnInit, WritableSignal } from '@angular/core';
import { Component, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

import { Validation } from '../../../framework/controls/validations-interface';
import { FrameworkModule } from '../../../framework/framework.module';

import { Product } from '../../models/product';

@Component({
  selector: 'product-edit',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  public model: WritableSignal<Product | undefined> = signal(<Product> {});
  public formValid: boolean = true;
  public validations: Map<string, Array<Validation>> | undefined = undefined;

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.validations = new Map([
      [ 'id',
        [{ name: 'required' }, { name: 'min', value: '3' }, { name: 'max', value: '10' }] 
      ],
      [ 'name', 
        [{ name: 'required' }, { name: 'min', value: '5' }, { name: 'max', value: '100' }] 
      ],
      [ 'description', 
        [{ name: 'required' }, { name: 'min', value: '10' }, { name: 'max', value: '200' }] 
      ],
      [ 'logo',
        [{ name: 'required' }] 
      ],
      [ 'date_release', 
        [{ name: 'required' }]
      ],
      [ 'date_revision', 
        [{ name: 'required' }]
      ]
    ]);
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
