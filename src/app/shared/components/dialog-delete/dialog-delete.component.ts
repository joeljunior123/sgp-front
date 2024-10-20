import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteComponent>);

  productName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { productName: string }) {
    this.productName = data.productName;
  }
}
