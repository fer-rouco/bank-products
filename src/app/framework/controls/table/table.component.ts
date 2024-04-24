import { Component, Input } from '@angular/core';

export interface ColumnDefinition {
  attr: string;
  label: string;
}

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() public columnDefinitions: ColumnDefinition[] = [];
  @Input() public rowObjects: Array<any> = []; // eslint-disable-line

  public isImage(source: string): boolean {
    return source.startsWith("http://") || source.startsWith("https://") // && 
      // source.endsWith(".png") || source.endsWith(".jpg") || source.endsWith(".jpeg")
  }

  public isDate(source: string): boolean {
    return !isNaN(new Date(source).getDate());
  }

  public parseDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
