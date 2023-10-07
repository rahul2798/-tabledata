import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  arrayData: any;
  dataSource: any;
  mydata: any;
  constructor(private apiService: ApiService) {}
  displayedColumns: string[] = ['id', 'reactions', 'title', 'userId', 'tags'];
  pageSize = 10;
  totalItems: any;
  currentPage = 0;
  ngOnInit(): void {
    // this.loadData(1);
    this.loadData();
  }
  loadData() {
    this.apiService.getData().subscribe((data) => {
      this.mydata = data;
      this.arrayData = this.mydata.posts;
      this.dataSource = new MatTableDataSource(this.arrayData);
      this.dataSource.paginator = this.paginator;
      this.totalItems = this.arrayData.length;
      this.pageSize = 10;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    const startIndex = this.currentPage * this.pageSize;
    this.dataSource = this.arrayData.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
