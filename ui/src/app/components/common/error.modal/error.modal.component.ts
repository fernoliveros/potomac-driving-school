import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    errorTitle: string;
    errorMessage: string;
}

@Component({
    selector: 'error-modal',
    templateUrl: 'error.modal.component.html',
    styleUrls: ['./error.modal.component.css']
  })
  export class ErrorModal {
    public errorTitle = ''
    public errorMessage = ''

    constructor(
      public dialogRef: MatDialogRef<ErrorModal>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
          this.errorTitle = data.errorTitle
          this.errorMessage = data.errorMessage
      }
  }