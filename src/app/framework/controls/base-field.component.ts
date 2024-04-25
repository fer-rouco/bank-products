import {
  AfterViewInit,
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
  effect
} from '@angular/core';

import { Validation } from './validations-interface';
@Component({
  selector: 'base-field',
  template: '',
})
export class BaseFieldComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public label: string = '';
  @Input() public model: any; // eslint-disable-line
  @Input() public attr: string = '';
  @Input() public enabled: boolean = true;
  @Input() public placeholder: string = '';
  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  @Input() public validations: Array<Validation> | undefined = new Array<Validation>();

  public visualModel: string = '';
  @Input() public errorMessage: string | undefined = undefined;

  constructor() {
    effect(() => {
      this.updateVisualModel();
    });
  }

  public getModel(): any {
    if (typeof this.model === 'function') {
      if(this.model()) {
        return this.model()[this.attr];
      }
    }

    return this.model[this.attr];
  }

  public updateModel(): void {
    if (typeof this.model === 'function') {
      if(this.model()) {
        let modelCopy: any = {...this.model()};
        modelCopy[this.attr] = this.visualModel;
        this.model.set(modelCopy);
      }
    }
    else {
      this.model[this.attr] = this.visualModel;
    }

    this.validate();
  }

  public updateVisualModel(): void {
    if (this.model) {
      if (typeof this.model === 'function') {
        this.visualModel = (this.model()) ? this.model()[this.attr] : "";
      }
      else {
        this.visualModel = this.model[this.attr];
      }
    }
  }

  public onFieldChange(value: string): void {
    this.onChange.emit(value);
  }

  public onInputChange(): void {
    this.updateModel();
  }

  public validate(): void {
    this.errorMessage = undefined;

    this.validations?.forEach((validation: Validation) => {
      if(!this.errorMessage) {
        switch (validation.name) {
          case 'required':
            if (!this.getModel()) {
              this.errorMessage = 'Este campo es requerido!';
            }
            break;
    
          case 'min':
            const valueMin: number = (validation.value) ? parseInt(validation.value) : 0;
            if (this.getModel() && this.getModel().length < valueMin) {
              this.errorMessage = `Este campo requiere minimo ${validation.value} caracteres!`;
            }
            break;
    
          case 'max':
            const valueMax: number = (validation.value) ? parseInt(validation.value) : 0;
            if (this.getModel() && this.getModel().length > valueMax) {
              this.errorMessage = `Este campo requiere maximo ${validation.value} caracteres!`;
            }
            break;
          
          default:
            if (validation.fn && !validation.fn()) {
              this.errorMessage = validation.message;
            }
            break;
        }
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.updateVisualModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.updateVisualModel();
    }
  }
}
