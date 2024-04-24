import { Component } from '@angular/core';
import { FrameworkModule } from '../../../framework/framework.module';

@Component({
  selector: 'product-edit',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {

}
