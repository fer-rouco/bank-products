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
    this.model[this.attr] = this.visualModel;
  }

  public updateVisualModel(): void {
    if (this.model) {
      this.visualModel = this.model[this.attr];
    }
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
