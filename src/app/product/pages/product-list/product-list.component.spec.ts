
import { DebugElement } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FrameworkModule } from '../../../framework/framework.module';
import { TableComponent } from '../../../framework/controls/table/table.component';
import { TextFieldComponent } from '../../../framework/controls/fields/text-field/text-field.component';
import { SelectFieldComponent } from '../../../framework/controls/fields/select-field/select-field.component';
import { CustomButtonComponent } from '../../../framework/controls/button/button.component';
import { Product } from '../../models/product';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { ProductServiceMock } from '../../../../test/mocks/product.service.mock';
import { routes } from '../../../app.routes';
import { Observable, of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let textFieldComponent: TextFieldComponent;
  let textFieldFixture: ComponentFixture<TextFieldComponent>;
  let tableComponent: TableComponent;
  let tableFixture: ComponentFixture<TableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, TextFieldComponent, SelectFieldComponent, CustomButtonComponent],
      imports: [ProductListComponent, FrameworkModule, RouterModule.forRoot(routes)],
      providers: [
        { provide: ProductService, useClass: ProductServiceMock }
      ]
    })
    .compileComponents();

    textFieldFixture = TestBed.createComponent(TextFieldComponent);
    textFieldComponent = textFieldFixture.componentInstance;
    textFieldFixture.detectChanges();  

    tableFixture = TestBed.createComponent(TableComponent);
    tableComponent = tableFixture.componentInstance;
    tableFixture.detectChanges();  
    
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show product table', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    expect(tableComponent).toBeTruthy();
  });

  it('should show the product items', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    expect(tableComponent.componentInstance.rowObjects.length).toBe(6);
  });

  it('should show the product items quantity', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    const quantityText = tableComponent.query(By.css('.footer .quantity')).nativeElement.textContent;
    expect(quantityText).toBe('5 Resultados');
  });

  it('should navigate to create page when create button is clicked', () => {
    const createButton: DebugElement = fixture.debugElement.query(By.css('#create'));
    createButton.nativeElement.click();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-edit');
  });

  it('should navigate to edit page when edit context menu item is clicked', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    const contextMenu: DebugElement = tableComponent.queryAll(By.css('.table__context-menu .context-menu'))[0];
    contextMenu.nativeElement.style.display = 'block';
    fixture.detectChanges();
    contextMenu.nativeElement.children[0].dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith('/product-edit');
  });

  it('should show delete modal when delete context menu item is clicked', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    const contextMenu: DebugElement = tableComponent.queryAll(By.css('.table__context-menu .context-menu'))[0];
    contextMenu.nativeElement.style.display = 'block';
    fixture.detectChanges();
    contextMenu.nativeElement.children[1].dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    
    const deleteModal: DebugElement = fixture.debugElement.query(By.css('.modal'));
    expect(deleteModal).toBeTruthy();

    const titleText: string = deleteModal.query(By.css('.title-text')).nativeElement.textContent;
    expect(titleText).toBe('Estas seguro de eliminar el producto Visa Platinum?');
  });

  it('should delete an item when delete context menu item is clicked and accept button in the modal is clicked', () => {
    const productIndexToBeDeleted: number = 1;
    const productsAfterDelete: Array<Product> = ProductServiceMock.mockProductList().filter((product: Product, index: number) => index !== productIndexToBeDeleted);
    const productsToReturn$: Observable<Array<Product>> = of(productsAfterDelete);
    const productService = TestBed.inject(ProductService);
    spyOn(productService, "getAll").and.returnValue(productsToReturn$);

    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    const contextMenu: DebugElement = tableComponent.queryAll(By.css('.table__context-menu .context-menu'))[productIndexToBeDeleted];
    contextMenu.nativeElement.style.display = 'block';
    fixture.detectChanges();
    contextMenu.nativeElement.children[1].dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    
    let deleteModal: DebugElement = fixture.debugElement.query(By.css('.modal'));
    const acceptButton: DebugElement = deleteModal.query(By.css(".custom-button.primary"))
    acceptButton.nativeElement.click();
    fixture.detectChanges();

    deleteModal = fixture.debugElement.query(By.css('.modal'));
    expect(deleteModal).toBeFalsy();

    const tableRows: Array<DebugElement> = tableComponent.queryAll(By.css('.table tr.body'));
    expect(productsAfterDelete.length).toBe(tableRows.length);
  });

  it('should hide delete modal when cancel button is clicked', () => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    
    const contextMenu: DebugElement = tableComponent.queryAll(By.css('.table__context-menu .context-menu'))[0];
    contextMenu.nativeElement.style.display = 'block';
    fixture.detectChanges();
    contextMenu.nativeElement.children[1].dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    
    let deleteModal: DebugElement = fixture.debugElement.query(By.css('.modal'));
    const acceptButton: DebugElement = deleteModal.query(By.css(".custom-button.secondary"))
    acceptButton.nativeElement.click();
    fixture.detectChanges();

    deleteModal = fixture.debugElement.query(By.css('.modal'));
    expect(deleteModal).toBeFalsy();
  });

  xit('should filter items on search field typing', fakeAsync(() => {
    // fixture.debugElement.query(By.css('#input_text_search')).nativeElement.value = 'Visa';
    // textFieldComponent.attr = 'search';
    // textFieldComponent.model = {search: 'Visa'};
    // textFieldComponent.model.set({search: 'Visa'});
    component.searchModel.set({search: 'Visa'});
    tick(500); // debounce
    textFieldFixture.detectChanges();

    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));
    expect(tableComponent.componentInstance.rowObjects.length).toBe(3);

    const quantityText = tableComponent.query(By.css('.footer .quantity')).nativeElement.textContent;
    expect(quantityText).toBe('3 Resultados');
    flush();
  }));
  
  it('should items quantity change on quantity select change', fakeAsync(() => {
    const tableComponent: DebugElement = fixture.debugElement.query(By.directive(TableComponent));  

    tableComponent.componentInstance.rowQuantity.set({ value: '10' });
    fixture.detectChanges();
    tableComponent.componentInstance.ngOnChanges({ rowObjects: { currentValue: tableComponent.componentInstance.rowObjects } });
    fixture.detectChanges();
    tick();

        
    const quantityText = tableComponent.query(By.css('.footer .quantity')).nativeElement.textContent;
    expect(quantityText).toBe('6 Resultados');

    const tableRows: Array<DebugElement> = tableComponent.queryAll(By.css('.table tr.body'));
    expect(tableRows.length).toBe(6);
    
    flush();
  }));
});
