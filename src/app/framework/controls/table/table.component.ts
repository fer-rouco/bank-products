import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Option } from '../fields/select-field/select-field.component';

export interface ColumnDefinition {
  attr: string;
  label: string;
}

export interface TableAction {
  id: string;
  label: string;
  fn(rowObject: any): void;
}

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {

  @Input() public columnDefinitions: ColumnDefinition[] = [];
  @Input() public rowObjects: Array<any> = []; // eslint-disable-line
  @Input() public rowObjectsToShow: Array<any> = []; // eslint-disable-line
  @Input() public actions: Array<TableAction> = [];

  public options: Array<Option> = [
    { label: '5' , value: '5' },
    { label: '10' , value: '10' },
    { label: '20' , value: '20' }
  ];
  
  public rowQuantity: RowQuantity = <RowQuantity>{ value: this.options[0].value };

  updateRowQuantity(value: string): void {
    this.rowObjectsToShow = this.rowObjects.slice(0, parseInt(value));
  }


  onRowQuantityChange(value: string): void {
    this.updateRowQuantity(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowObjects'].currentValue !== changes['rowObjects'].previousValue) {
      this.updateRowQuantity(this.rowQuantity.value);
    }
  }

  public isURL(source: string): boolean {
    return source.startsWith("http://") || source.startsWith("https://");
  }

  public isDate(source: string): boolean {
    return !isNaN(new Date(source).getDate());
  }

  public parseDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  public actionClick(action: TableAction, rowObject: any): void {
    action.fn(rowObject);
  }
}

interface RowQuantity {
  value: string
}