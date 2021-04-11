import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import * as crypto from "crypto-js"
import { environment } from '../../../../environments/environment';
import { AwsClient } from 'aws4fetch'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public classSelect = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((qp: { cc: string }) => {
      this.classSelect.setValue(qp.cc);
      console.log(this.classSelect.value);
    });
  }

  public submitRegistration() {
    const url= `https://qgsw8guhb1.execute-api.us-east-1.amazonaws.com/default/pdsemaillambda`
    const service= 'execute-api'
    const region = 'us-east-1'

    const aws = new AwsClient({
      accessKeyId: environment.pdsUserKey,
      secretAccessKey: environment.pdsUserSecret,
      service,
      region
    })

    aws.fetch(url, {
      method: 'GET',
      headers: {
        "x-api-key": environment.apiKey
      }
    }).then(response => response.json())
    .then(data => console.log(data));
  }
}
