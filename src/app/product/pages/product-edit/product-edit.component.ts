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
  public mode: Mode = Mode.CREATE;

  constructor(
    @Inject(Router) protected router: Router,
    @Inject(ProductService) private productService: ProductService
  ) {
    effect(() => {
      this.validateId();
      this.updateFormValidFlag();
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

    let product: Product | undefined = this.productService.getProduct();
    if (product) {
      this.cleanValidations();
      this.model.set(this.mapToProduct(this.productService.getProduct() || <Product>{}));
      this.mode = Mode.EDIT;
    }
  }

  isEditMode(): boolean {
    return this.mode === Mode.EDIT;
  }

  mapToProduct(request: Product): Product {
    let product: Product = <Product>{};
    product.id = request.id;
    product.name = request.name;
    product.description = request.description;
    product.logo = request.logo;
    product.date_release = DateUtils.formatFromDateTime(request.date_release);
    product.date_revision = DateUtils.formatFromDateTime(request.date_revision);
    return product;
  }

  create(): void {
    let product: Product | undefined = this.model();
    if (product) {
      let productCopy: Product = {...product};
      productCopy.date_release = DateUtils.format(product.date_release);
      productCopy.date_revision = DateUtils.format(product.date_revision);

      if (this.isEditMode()) {
        this.productService.update('123', productCopy).subscribe(() => {
          this.router.navigateByUrl('/product-list');
        });
      }
      else {
        this.productService.create('123', productCopy).subscribe(() => {
          this.router.navigateByUrl('/product-list');
        });
      }
    }
  }

  clearModel(): void {
    let id: string = this.model()?.id || '';
    if (this.isEditMode()) {
      this.model.set(<Product> { id: id });
    }
    else {
      this.model.set(<Product> {});
    }
  }

  validateId(): void {
    if (!this.isEditMode()) {
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
    }
  }

  validateDateRelease(): boolean {
    return DateUtils.isDateGreaterOrEqualThanToday(this.model()?.date_release || '');
  }

  validateDateRevision(): boolean {
    return DateUtils.isDateExactlyAYearLaterThanOtherDate(this.model()?.date_release || '', this.model()?.date_revision || '');
  }

  cleanValidations(): void {
    if (this.validations) {
      for (const validationArray of this.validations) {
        validationArray[1].forEach((validation: Validation) => {validation.valid = true});
      }
    }
  }

  updateFormValidFlag(): void {
    let valid: boolean = true;

    if (this.validations) {
      for (const validationArray of this.validations) {
        const notValid = validationArray[1].find((validation: Validation) => !validation.valid);
        if (notValid) {
          valid = false;
          break;
        }
      }
    }

    this.formValid = valid;
  }
}

enum Mode {
  CREATE = 0,
  EDIT = 1
}