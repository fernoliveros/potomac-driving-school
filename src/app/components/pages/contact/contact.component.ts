import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailForm } from 'src/app/abstract/email.form';
import { ApiGatewayService } from 'src/app/service/api.gateway.service';
import { LoadingService } from 'src/app/service/loading.service';
import { AlertModal, AlertModalInputs } from '../../common/alert.modal/alert.modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends EmailForm implements OnInit {
  @ViewChild(FormGroupDirective) formToReset;
  @ViewChild('captchaElem') reCaptcha;

  /* 2 fields below for abstract class EmailForm*/
  public emailForm: FormGroup;
  protected emailFailTitle = 'There was an error submitting your message'
 
  constructor(
    protected apiGateway: ApiGatewayService,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    protected loadingService: LoadingService
  ) {
    super(apiGateway, dialog, loadingService)
   }

  ngOnInit(): void {
    this.createNewForm();
  }

  private createNewForm(): void {
    this.emailForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]
    })
  }

  public submitMessage() {
    this.submitEmailForm({
      subject: `New Message From: ${this.studentFullName()}`,
      body: this.buildEmailString(),
      studentEmail: this.getFormVal('email'),
      studentEmailSubject: 'Potomac Driving School - Message Confirmation',
      studentEmailBody: this.buildStudentEmailString()
    })
  }

  protected handleEmailSuccess() {
    this.resetForm();
    
		const modalInputs: AlertModalInputs = {
      title: 'Message Sent',
      message: 'Thanks for reaching out to us. We will contact you shortly'
		}
		this.dialog.open(AlertModal, {
			width: '470px',
			data: modalInputs
		})
  }

  private resetForm(): void {
    this.formToReset.resetForm();
    this.emailForm.reset();
    this.reCaptcha.reloadCaptcha();
  }

  private buildEmailString(): string {
    return [
      `Name: ${this.studentFullName()}`,
      `Phone: ${this.getFormVal('phone')}`,
      `Email: ${this.getFormVal('email')}`,
      `Message: ${this.getFormVal('message')}`,
    ].join('\n')
  }

  private buildStudentEmailString(): string {
     return [
        `${this.getFormVal('fname')},\n`,
        `We have received your message and will be in contact with you soon\n`,
        `If you have any questions feel free to contact us at info@potomacdriving.com or 571-333-8887\n`,
        `Thank you,\n`,
        `Potomac Driving School\n`,
        `This is an automated email do not reply`,
      ].join('\n')
  }

  private studentFullName(): string {    
    return `${this.getFormVal('fname')} ${this.getFormVal('lname')}`
  }

}
