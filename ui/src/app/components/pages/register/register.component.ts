import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/service/api.gateway.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public classSelect = new FormControl('');
  public registrationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiGateway: ApiGatewayService,
    private fb: FormBuilder
  ) {}

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
      gender: [''],
      phone: [''],
      email: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      preferredStartDate: [''],
      preferredStartTime: [''],
      comments: [''],
    })
  }

  public submitRegistration() {
    const url= `https://qgsw8guhb1.execute-api.us-east-1.amazonaws.com/default/pdsemaillambda`
    this.apiGateway.doPost(url, {
      subject: 'from ng service',
      body: 'aint no body like mine'
    })

  }
}
