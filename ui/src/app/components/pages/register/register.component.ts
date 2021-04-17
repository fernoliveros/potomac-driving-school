import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/service/api.gateway.service';
import * as moment from "moment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public classSelect = new FormControl('');
  public registrationForm: FormGroup;
  public tomorrow: any = new Date();


  public today = moment().format('L')

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
    private fb: FormBuilder
  ) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow = this.tomorrow.toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qp: { cc: string }) => {
      this.classSelect.setValue(qp.cc);
      console.log(this.classSelect.value);
    });

    this.registrationForm = this.fb.group({
      class: ['', Validators.required],
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
      dob: ['', Validators.required],
      sex: [''],
      phone: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['VA', Validators.required],
      zip: ['', Validators.required],
      preferredStartDate: [''],
      preferredStartTime: [''],
      comments: [''],
    })
  }

  public phoneKeyUpEvent(e): void {
    const phoneNum = e.target.value
    const isDelete = e.key === "Backspace"

    if (isDelete) {
      this.handlePhoneDelete(phoneNum, e)
    } else {
      this.handlePhoneAddChar(phoneNum, e)
    }
  }

  private handlePhoneDelete(phoneNum, e): void {
    const len = phoneNum.length
    switch (len) {
      case 13:
        this.setPhone(phoneNum.substr(0,9), e)
        break
      case 7:
        this.setPhone(phoneNum.substr(0,4), e)
        break
      case 2:
        this.setPhone('',e)
        break
    }
  }

  private handlePhoneAddChar(phoneNum, e): void {
    const len = phoneNum.length
    const newChar = e.key
    if (!/\d/.test(newChar)) {
      this.stopEvent(e)
    } else {
      switch (len) {
        case 0:
          this.setPhone('(' + phoneNum + newChar, e)
          break
        case 4:
          this.setPhone(phoneNum + ') ' + newChar, e)
          break
        case 9:
          this.setPhone(phoneNum + ' - ' + newChar, e)
          break
        case 16:
          this.stopEvent(e)
      }
    }
  }

  private stopEvent(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  private setPhone(formattedPhone, e): void {
    this.stopEvent(e)
    this.registrationForm.patchValue({ phone: formattedPhone }, { emitEvent: false })
  }

  private getFormVal(controlName: string): any {
    return this.registrationForm.get(controlName).value
  }

  private buildEmailString() {
    // map value could be undefined
    const possibleClassName = this.classNameMap.get(this.getFormVal('class'))

    const className = possibleClassName ? possibleClassName : 'Error getting class name',
      fname = this.getFormVal('fname'),
      mname = this.getFormVal('mname'),
      lname = this.getFormVal('lname'),
      sex = this.getFormVal('sex'),
      phone = this.getFormVal('phone'),
      email = this.getFormVal('email'),
      address = this.getFormVal('address'),
      city = this.getFormVal('city'),
      state = this.getFormVal('state'),
      zip = this.getFormVal('zip'),
      preferredStartDate = this.getFormVal('preferredStartDate'),
      preferredStartTime = this.getFormVal('preferredStartTime'),
      comments = this.getFormVal('comments')

    let preferredStart: any
    if (preferredStartDate && preferredStartTime) {
      preferredStart = moment(new Date(preferredStartDate + ' ' + preferredStartTime).getTime()).format('LLL')
    } else if (preferredStartDate) {
      preferredStart = moment(new Date(preferredStartDate).getTime()).format('ll')
    } else if (preferredStartTime) {
      preferredStart = moment(new Date(this.today + ' ' + preferredStartTime).getTime()).format('LT')
    }

    let dob = this.getFormVal('dob')
    dob = moment(new Date(dob).getTime()).format('L')

    const ret = [
      `Class: ${className}`,
      `Name: ${fname} ${mname} ${lname}`,
      `DOB: ${dob}`,
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

  public submitRegistration() {
    const url = `https://qgsw8guhb1.execute-api.us-east-1.amazonaws.com/default/pdsemaillambda`
    this.apiGateway.doPost(url, {
      subject: 'New Student Registration',
      body: this.buildEmailString()
    })
  }
}
