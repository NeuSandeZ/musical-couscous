import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-window',
  standalone: true,
  imports: [],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.css',
})
export class DialogWindowComponent {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { paragraph: string }
  ) {}
}
