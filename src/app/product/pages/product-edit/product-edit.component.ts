import type { OnInit, WritableSignal } from '@angular/core';
import { Component, Inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProductService } from '../../services/product.service';

import { Validation } from '../../../framework/controls/validations-interface';
import { FrameworkModule } from '../../../framework/framework.module';
import { DateUtils } from '../../../common/utils/date-utils';

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
  public errorMessage: string | undefined = undefined;

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService
  ) {
    effect(() => {
      this.validateId();
    });
  }

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
        [{ name: 'required' }, { name: 'custom', fn: this.validateDateRelease, model: this.model, message: 'La fecha debe ser mayor o igual a la actual!' }]
      ],
      [ 'date_revision', 
        [{ name: 'required' }, { name: 'custom', fn: this.validateDateRevision, model: this.model, message: 'La fecha debe ser exactamente un año posterior a la fecha de liberacion!' }]
      ]
    ]);
  }

  create(): void {
    let product: Product | undefined = this.model();
    if (product) {
      let productCopy: Product = {...product};
      productCopy.date_release = DateUtils.format(product.date_release);
      productCopy.date_revision = DateUtils.format(product.date_revision);
      this.productService.create('123', productCopy).subscribe(console.log);
    }
  }

  clearModel(): void {
    this.model.set(<Product> {});
  }

  validateId(): boolean {
    this.errorMessage = undefined;
    let product: Product | undefined = this.model();
    if (product && product.id) {
      this.productService.verify('123', product).pipe(
        tap((idInvalido: boolean) => {
          if (idInvalido) {
            this.errorMessage = 'ID no válido!';
          }
        })
      ).subscribe();
    }
    return false;
  }

  validateDateRelease(): boolean {
    return DateUtils.isDateGreaterOrEqualThanToday(this.model()?.date_release || '');
  }

  validateDateRevision(): boolean {
    return DateUtils.isDateExactlyAYearLaterThanOtherDate(this.model()?.date_release || '', this.model()?.date_revision || '');
  }
}
