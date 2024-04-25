import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class CustomButtonComponent {
  @Input() public label: string = '';
  @Input() public enabled: boolean = true;
  @Input() public primary: boolean = true;
}
