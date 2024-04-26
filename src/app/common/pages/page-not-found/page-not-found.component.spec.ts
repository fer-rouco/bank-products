import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrameworkModule } from '../../../framework/framework.module';

import { PageNotFoundComponent } from './page-not-found.component';
import { CustomButtonComponent } from '../../../framework/controls/button/button.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameworkModule],
      declarations: [CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
