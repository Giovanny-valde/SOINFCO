import { Injectable, QueryList } from '@angular/core';
import { NgbdSortableHeader } from '../models/sorting';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private data: any[] = [];
  private headers! : QueryList<NgbdSortableHeader>;

  sort(column: string, direction: string): any[] {
    // Resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // Sorting
    let sortedData: any[];
    if (direction === '' || column === '') {
      // Reset to the original data if no sorting is applied
      sortedData = [...this.data];
    } else {
      // Perform sorting
      sortedData = this.data.sort((a, b) => {
        const comparison = this.compare(a[column], b[column]);
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    return sortedData;
  }

  setData(data: any[]): void {
    this.data = data;
  }

  setHeaders(headers: QueryList<NgbdSortableHeader>): void {
    this.headers = headers;
  }

  private compare(a: any, b: any): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}
