import { Component, Input } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';


@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent extends BaseFieldComponent {
  @Input() public type: string = 'text';

  public override updateModel(): void {
    this.model[this.attr] = Number.parseInt(this.visualModel);
  }
}
