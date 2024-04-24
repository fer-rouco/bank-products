import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FrameworkModule } from '../../../framework/framework.module';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [FrameworkModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  constructor(@Inject(Router) protected router: Router) {}

  public navigateToProductList(): void {
    this.router.navigateByUrl('/product-list');
  }

}
