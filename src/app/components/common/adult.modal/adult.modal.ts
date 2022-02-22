import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AdultModalInputs {
    className: string;
}

@Component({
    selector: 'adult-modal',
    templateUrl: 'adult.modal.html',
    styleUrls: ['./adult.modal.css']
  })
  export class AdultModal {
    public className = ''

    constructor(
      public dialogRef: MatDialogRef<AdultModal>,
      @Inject(MAT_DIALOG_DATA) public data: AdultModalInputs) {
          this.className = data.className
      }
  }