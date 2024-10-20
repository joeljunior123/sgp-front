import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteComponent } from '../../shared/components/dialog-delete/dialog-delete.component';
import { Product } from '../../shared/model/product.model';
import { SharedModule } from '../../shared/shared.module';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'desc', 'image', 'acao'];
  dataSource: Product[] = [];
  produtos: Product[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private homeService: HomeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.homeService.getAllProducts().subscribe(produtos => {
      this.produtos = produtos;
      this.dataSource = produtos;
    });
  }

  searchProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();

    if (filterValue) {
      this.homeService.getProductByName(filterValue).subscribe(
        products => {
          this.dataSource = products;
        });
    } else {
      this.getAllProducts();
    }
  }

  openDialog(product: Product): void {
    const dialogDelete = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { productName: product.name } // Passa o nome do produto
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
}
