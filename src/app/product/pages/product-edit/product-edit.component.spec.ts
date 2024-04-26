import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { FrameworkModule } from '../../../framework/framework.module';
import { TextFieldComponent } from '../../../framework/controls/fields/text-field/text-field.component';
import { CustomButtonComponent } from '../../../framework/controls/button/button.component';

import { ProductEditComponent } from './product-edit.component';
import { ProductService } from '../../services/product.service';
import { ProductServiceMock } from '../../../../test/mocks/product.service.mock';
import { routes } from '../../../app.routes';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product';
import { DateUtils } from '../../../common/utils/date-utils';
import { of } from 'rxjs';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let textFieldComponent: TextFieldComponent;
  let textFieldFixture: ComponentFixture<TextFieldComponent>;
  let router: Router;
  let productService: ProductService;

  function updateModel(model: Product) {
    component.model.set(model);
    tick();
    fixture.detectChanges();
  }

  function dispatchChangeEvent(attr: string): void {
    const idInput: DebugElement = fixture.debugElement.query(By.css(`#input_text_${attr}`));   
    idInput.nativeElement.dispatchEvent(new Event('change'));

    tick();
    fixture.detectChanges();
  }

  function updateModelAndDispatchChangeEvent(model: Product, attr: string): void {
    updateModel(model);
    dispatchChangeEvent(attr);
  }

  function expectErrorToBe(attr: string, errorMessage: string) {
    const errorMessageInDom: string = fixture.debugElement.query(By.css(`#error-message_text_${attr}`)).nativeElement.textContent;
    expect(errorMessageInDom).toBe(errorMessage);
  }

  function expectFieldToBeEmpty(attr: string): void {
    const idInput: DebugElement = fixture.debugElement.query(By.css(`#input_text_${attr}`));   
    expect(idInput.nativeElement.value).toBe('');
  }

  function expectFieldToNotBeEmpty(attr: string): void {
    const idInput: DebugElement = fixture.debugElement.query(By.css(`#input_text_${attr}`));   
    expect(idInput.nativeElement.value).not.toBe('');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent, CustomButtonComponent],
      imports: [ProductEditComponent, FrameworkModule, RouterModule.forRoot(routes)],
      providers: [
        { provide: ProductService, useClass: ProductServiceMock }
      ]
    })
    .compileComponents();

    textFieldFixture = TestBed.createComponent(TextFieldComponent);
    textFieldComponent = textFieldFixture.componentInstance;
    textFieldFixture.detectChanges();
    
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    productService = TestBed.inject(ProductService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new product', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
    product.id = "VisaPlat";
    
    spyOn(productService, "create").and.returnValue(of(product));

    updateModelAndDispatchChangeEvent(product, 'id');

    const acceptButton: DebugElement = fixture.debugElement.query(By.css(".custom-button.primary"))
    acceptButton.nativeElement.click();
    fixture.detectChanges();

    expect(productService.create).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');

    flush();
  }));

  it('should update an existing product', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
    product.id = "VisaPlat";
    
    productService.setProduct(product);
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(productService, "update").and.returnValue(of(product));

    updateModelAndDispatchChangeEvent(product, 'id');

    const acceptButton: DebugElement = fixture.debugElement.query(By.css(".custom-button.primary"))
    acceptButton.nativeElement.click();
    fixture.detectChanges();

    expect(productService.update).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-list');

    flush();
  }));

  it('should fill all fields and clean them using the clean button', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};

    updateModelAndDispatchChangeEvent(product, 'id');
    expectFieldToNotBeEmpty('id');
    expectFieldToNotBeEmpty('name');
    expectFieldToNotBeEmpty('description');
    expectFieldToNotBeEmpty('logo');
    expectFieldToNotBeEmpty('date_release');
    expectFieldToNotBeEmpty('date_revision');

    const acceptButton: DebugElement = fixture.debugElement.query(By.css(".custom-button.secondary"))
    acceptButton.nativeElement.click();
    fixture.detectChanges();

    dispatchChangeEvent('id');
    
    expectFieldToBeEmpty('id');
    expectFieldToBeEmpty('name');
    expectFieldToBeEmpty('description');
    expectFieldToBeEmpty('logo');
    expectFieldToBeEmpty('date_release');
    expectFieldToBeEmpty('date_revision');

    flush();
  }));

  it('should check id field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.id = "";
    updateModelAndDispatchChangeEvent(product, "id");
    expectErrorToBe('id', 'Este campo es requerido!');

    product.id = "Vi";
    updateModelAndDispatchChangeEvent(product, "id");
    expectErrorToBe('id', 'Este campo requiere minimo 3 caracteres!');
    
    product.id = "VisaPlatinum";
    updateModelAndDispatchChangeEvent(product, "id");
    expectErrorToBe('id', 'Este campo requiere maximo 10 caracteres!');

    spyOn(productService, "verify").and.returnValue(of(true));
    product.id = "Visa!";
    updateModel(product);
    expectErrorToBe('id', 'ID no válido!');

    flush();
  }));

  it('should check name field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.name = "";
    updateModelAndDispatchChangeEvent(product, "name");
    expectErrorToBe('name', 'Este campo es requerido!');

    product.name = "Vi";
    updateModelAndDispatchChangeEvent(product, "name");
    expectErrorToBe('name', 'Este campo requiere minimo 5 caracteres!');

    product.name = "VisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinum";
    updateModelAndDispatchChangeEvent(product, "name");
    expectErrorToBe('name', 'Este campo requiere maximo 100 caracteres!');

    flush();
  }));

  it('should check description field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.description = "";
    updateModelAndDispatchChangeEvent(product, "description");
    expectErrorToBe('description', 'Este campo es requerido!');

    product.description = "Vi";
    updateModelAndDispatchChangeEvent(product, "description");
    expectErrorToBe('description', 'Este campo requiere minimo 10 caracteres!');

    product.description = "VisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinumVisaPlatinum";
    updateModelAndDispatchChangeEvent(product, "description");
    expectErrorToBe('description', 'Este campo requiere maximo 200 caracteres!');

    flush();
  }));

  it('should check logo field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.logo = "";
    updateModelAndDispatchChangeEvent(product, "logo");
    expectErrorToBe('logo', 'Este campo es requerido!');

    flush();
  }));

  it('should check date_release field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.date_release = "";
    updateModelAndDispatchChangeEvent(product, "date_release");
    expectErrorToBe('date_release', 'Este campo es requerido!');

    const yesterday: Date = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    product.date_release = DateUtils.formatFromDateTime(yesterday.toDateString());
    updateModelAndDispatchChangeEvent(product, "date_release");
    expectErrorToBe('date_release', 'La fecha debe ser mayor o igual a la actual!');

    flush();
  }));

  it('should check date_revision field validations', fakeAsync(() => {
    const product: Product = {...ProductServiceMock.mockProduct()};
        
    product.date_revision = "";
    updateModelAndDispatchChangeEvent(product, "date_revision");
    expectErrorToBe('date_revision', 'Este campo es requerido!');

    const today: Date = new Date();
    
    product.date_revision = DateUtils.formatFromDateTime(today.toDateString());
    updateModelAndDispatchChangeEvent(product, "date_revision");
    expectErrorToBe('date_revision', 'La fecha debe ser exactamente un año posterior a la fecha de liberacion!');

    flush();
  }));

});
