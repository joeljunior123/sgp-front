import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeService } from '../home/service/home.service';
import { Product } from '../../shared/model/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProductComponent implements OnInit {
  id?: number;
  hide = signal(true);
  productForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private homeService: HomeService
  ) { }

  openSnackBar(message: string, duration = 3000) {
    this._snackBar.open(message, '', { duration: duration });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
    });

    if (this.id) {
      this.homeService.getProductById(this.id).subscribe(product => {
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          desc: product.desc,
          price: product.price,
          image: product.image
        });
      });
    }
  }

  createProduct(formValue: Product) {
    this.homeService.createProduct(formValue).subscribe(() => {
      this.openSnackBar('Criado com sucesso')
      this.router.navigate(['/home'], { relativeTo: this.route })
    });
  }

  updateProduct(formValue: Product) {
    this.homeService.updateProduct(formValue).subscribe(() => {
      this.openSnackBar('Atualizado com sucesso')
      this.router.navigate(['/home'], { relativeTo: this.route })
    });
  }
}