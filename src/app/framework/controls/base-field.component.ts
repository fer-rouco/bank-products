import {
  AfterViewInit,
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

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

  public visualModel: string = '';

  public updateModel(): void {
    if (typeof this.model === 'function') {
      if(this.model()) {
        this.model()[this.attr] = this.visualModel;
      }
    }
    else {
      this.model[this.attr] = this.visualModel;
    }
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
