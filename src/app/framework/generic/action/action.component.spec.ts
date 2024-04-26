import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestRequirementsModule } from '../../../../test/test-requirements.module';

import { ActionComponent } from './action.component';

describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionComponent],
      imports: [TestRequirementsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
