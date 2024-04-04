import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DialogWindowComponent {
  image: string = 'https://cdn-icons-png.flaticon.com/512/1047/1047711.png';
  // successfull icon https://www.pngall.com/wp-content/uploads/2016/07/Success-PNG-Image.png
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { paragraph: string; enum: DialogEnum }
  ) {}

  getButtonPositions() {
    return this.data.enum === DialogEnum.Deleted ? 'space-between' : 'center';
  }
}

//TODO STYLE based on this?
export enum DialogEnum {
  Created,
  Updated,
  Deleted,
}
