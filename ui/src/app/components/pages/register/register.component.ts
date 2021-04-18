import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/service/api.gateway.service';
import * as moment from "moment";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModal } from '../../common/error.modal/error.modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public classSelect = new FormControl('');
  public registrationForm: FormGroup;
  public tomorrow: any = new Date();
  public emailSuccess = false;
  public today = moment().format('L')
  public siteKey = environment.recaptchaKey

  classNameMap: Map<string, string> = new Map([
    ["btwt", "License for Teens"],
    ["btwa", "License for Adults"],
    ["re", "Re-Examination"],
    ["rc", "Re-Certification"],
    ["dic", "Driver Improvement Clinic"],
    ["btw", "Behind The Wheel"],
    ["dec", "Driver's Education - Classroom"],
    ["deo", "Driver's Education - Online"],
    ["pdl", "Private Drivig Lessons"],
    ["spt", "Special Package for Teens"],
    ["spa", "Special Package for Adults"]
  ])

  public states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  ]


  constructor(
    private route: ActivatedRoute,
    private apiGateway: ApiGatewayService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow = this.tomorrow.toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qp: { cc: string }) => {
      this.classSelect.setValue(qp.cc);
    });

    this.registrationForm = this.fb.group({
      class: ['', Validators.required],
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      sex: [''],
      phone: ['', [Validators.required, Validators.minLength(16)]],
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
  }

  public submitRegistration() {
    if (this.registrationForm.valid) {
      const path = `/default/pdsemaillambda`
      this.apiGateway.doPost(path, {
        subject: `New Registration - ${this.studentFullName()}`,
        body: this.buildEmailString(),
        studentEmail: this.getFormVal('email'),
        studentEmailBody: this.buildStudentEmailString()
      }).then(resp => {
        if (resp.statusCode === 200) {
          this.emailSuccess = true;
        } else {
          this.handleEmailFailure()
        }
      })
    }
  }

  private getFormVal(controlName: string): any {
    return this.registrationForm.get(controlName).value
  }

  private buildEmailString() {
    const possibleClassName = this.classNameMap.get(this.getFormVal('class')),
      className = possibleClassName ? possibleClassName : 'Error getting class name',
      sex = this.getFormVal('sex'),
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
        `Sex: ${sex ? sex : 'N/A'}`,
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
        `We have received your registration for ${className}, and will be in contact with you soon\n`,
        `If you have any questions feel free to contact us at info@potomacdriving.com or at 571-333-8887\n`,
        `Thank you,\n`,
        `Potomac Driving School\n`,
        `This is an automated email, please do not reply`,
      ]
    return ret.join('\n')
  }

  private studentFullName(): string {    
    return `${this.getFormVal('fname')} ${this.getFormVal('mname')} ${this.getFormVal('lname')}`
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

  private handleEmailFailure(): void {
    this.dialog.open(ErrorModal, {
      width: '470px',
      data: {
        errorTitle: 'There was an error submitting your registration',
        errorMessage: 'Please try again later or contact us directly at 571-333-8887 or info@potomacdriving.com'
      }
    })
  }
}
