import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/service/api.gateway.service';
import * as moment from "moment";
import { MatDialog } from '@angular/material/dialog';
import { EmailForm } from 'src/app/abstract/email.form';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends EmailForm implements OnInit {
  public classSelect = new FormControl('');
  public registrationForm: FormGroup;
  public tomorrow: any = new Date();
  public emailSuccess = false;
  public today = moment().format('L')

  /* 2 fields below for abstract class EmailForm*/
  protected emailForm: FormGroup;
  protected emailFailTitle = 'There was an error submitting your registration'

  classNameMap: Map<string, string> = new Map([
    ["btw", "Behind The Wheel"],
    ["deo", "Driver's Education - Online"],
    ["dec", "Driver's Education - Classroom"],
    ["dic", "Driver Improvement Clinic"],
    ["re", "Re-Examination"],
    ["pdl", "Private Driving Lessons"],
    ["spt", "Package Deal (Private Lessons + BTW)"]
  ])

  public states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  ]

  constructor(
    private route: ActivatedRoute,
    protected apiGateway: ApiGatewayService,
    private fb: FormBuilder,
    protected dialog: MatDialog,
    protected loadingService: LoadingService
  ) {
    super(apiGateway, dialog, loadingService)
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow = this.tomorrow.toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.emailForm = this.registrationForm = this.fb.group({
      class: ['', Validators.required],
      fname: ['', Validators.required],
      // mname: [''],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      // sex: [''],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['VA', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      preferredStartDate: [''],
      preferredStartTime: [''],
      comments: [''],
      recaptcha: ['', Validators.required]
    })

    this.route.queryParams.subscribe((qp: { cc: string }) => {
      this.emailForm.get('class').setValue(qp.cc)
    });
  }

  public submitRegistration() {
    
    let formWthoutCaptcha = JSON.parse(JSON.stringify(this.emailForm.value))
    delete formWthoutCaptcha['recaptcha'] 
    this.submitEmailForm({
      subject: `New Registration - ${this.studentFullName()}`,
      body: this.buildEmailString(),
      studentEmail: this.getFormVal('email'),
      studentEmailSubject: 'Potomac Driving School - Registration Confirmation',
      studentEmailBody: this.buildStudentEmailString(),
      registrationForm: formWthoutCaptcha
    })
  }

  private buildEmailString() {
    const possibleClassName = this.classNameMap.get(this.getFormVal('class')),
      className = possibleClassName ? possibleClassName : 'Error getting class name',
      phone = this.getFormVal('phone'),
      email = this.getFormVal('email'),
      address = this.getFormVal('address'),
      city = this.getFormVal('city'),
      state = this.getFormVal('state'),
      zip = this.getFormVal('zip'),
      comments = this.getFormVal('comments'),
      preferredStart = this.getPreferredStartDate(),
      dob = this.getFormVal('dob'),
      formattedDob = moment(new Date(dob).getTime()).format('L'),
      ret = [
        `Class: ${className}`,
        `Name: ${this.studentFullName()}`,
        `DOB: ${formattedDob}`,
        `Address: ${address} ${city}, ${state} ${zip}`,
        `Phone: ${phone}`,
        // fields above are required, below are optional so check
        // `Sex: ${sex ? sex : 'N/A'}`,
        `Email: ${email ? email : 'N/A'}`,
        `Preferred Start: ${preferredStart ? preferredStart : 'N/A'}`,
        `Comments: ${comments ? comments : 'N/A'}`
      ]
    return ret.join('\n')
  }

  private buildStudentEmailString() {
    const possibleClassName = this.classNameMap.get(this.getFormVal('class')),
      className = possibleClassName ? possibleClassName : 'Error getting class name',
      ret = [
        `${this.getFormVal('fname')},\n`,
        `We have received your registration for ${className} and will be in contact with you soon\n`,
        `If you have any questions feel free to contact us at info@potomacdriving.com or 571-333-8887\n`,
        `Thank you,\n`,
        `Potomac Driving School\n`,
        `This is an automated email do not reply`,
      ]
    return ret.join('\n')
  }

  private studentFullName(): string {
    return `${this.getFormVal('fname')} ${this.getFormVal('lname')}`
  }

  private getPreferredStartDate() {
    const preferredStartDate = this.getFormVal('preferredStartDate'),
      preferredStartTime = this.getFormVal('preferredStartTime')
    if (preferredStartDate && preferredStartTime) {
      return moment(new Date(preferredStartDate + ' ' + preferredStartTime).getTime()).format('LLL')
    } else if (preferredStartDate) {
      return moment(new Date(preferredStartDate).getTime()).format('ll')
    } else if (preferredStartTime) {
      return moment(new Date(this.today + ' ' + preferredStartTime).getTime()).format('LT')
    }
    return undefined
  }

  protected handleEmailSuccess(): void {
    this.emailSuccess = true;
  }
}
