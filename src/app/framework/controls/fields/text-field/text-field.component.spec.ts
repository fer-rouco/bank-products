import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestRequirementsModule } from '../../../../../test/test-requirements.module';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      imports: [TestRequirementsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
