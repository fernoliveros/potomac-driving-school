import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertModalInputs {
    title: string;
    message: string;
}

@Component({
    selector: 'message-modal',
    templateUrl: 'alert.modal.component.html',
    styleUrls: ['./alert.modal.component.css']
  })
  export class AlertModal {
    public title = ''
    public message = ''

    constructor(
      public dialogRef: MatDialogRef<AlertModal>,
      @Inject(MAT_DIALOG_DATA) public data: AlertModalInputs) {
          this.title = data.title
          this.message = data.message
      }
  }