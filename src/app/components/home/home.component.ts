import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteComponent } from '../../shared/components/dialog-delete/dialog-delete.component';
import { Product } from '../../shared/model/product.model';
import { SharedModule } from '../../shared/shared.module';
import { HomeService } from './service/home.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  providers: [HomeService, MatPaginatorIntl],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'desc', 'image', 'acao'];
  dataSource: Product[] = [];
  produtos: Product[] = [];
  readonly dialog = inject(MatDialog);
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  filterValue: string = '';

  constructor(private homeService: HomeService, private router: Router, private route: ActivatedRoute, private paginatorIntl: MatPaginatorIntl) {
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.homeService.getPaginatedProducts(this.page, this.size).subscribe(response => {
      this.dataSource = response.content;
      this.totalElements = response.totalElements;
    });
  }

  searchProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();

    if (filterValue) {
      this.homeService.getProductByName(filterValue, this.page, this.size).subscribe(
        response => {
          this.dataSource = response.content;
          this.totalElements = response.totalElements;
        }
      );
    } else {
      this.getAllProducts();
    }
  }

  openDialog(product: Product): void {
    const dialogDelete = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { productName: product.name }
    });

    dialogDelete.afterClosed().subscribe(confirm => {
      if (confirm) this.deleteProduct(product.id);
    });
  }


  goToCreateProduct() {
    this.router.navigate(['/product'], { relativeTo: this.route });
  }

  goToEditProduct(id: number) {
    this.router.navigate(['/product', id], { relativeTo: this.route });
  }

  deleteProduct(id: number) {
    this.homeService.deleteProduct(id).subscribe(() => {
      this.getAllProducts();
    });
  }

  onPaginateChange(event: any): void {
    this.page = event.pageIndex;
    this.size = 10;
    this.getAllProducts();
  }
}
