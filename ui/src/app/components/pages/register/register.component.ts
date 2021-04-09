import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import * as crypto from "crypto-js"
import { environment } from '../../../../environments/environment';

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

  public submitRegistration(): void {
    const url= `https://qgsw8guhb1.execute-api.us-east-1.amazonaws.com/default/helloWorldLambda`
    
    // var kDate = crypto.HmacSHA256(new Date(), "AWS4" + environment.pdsUserKey);
    // var kRegion = crypto.HmacSHA256('us-east-1', kDate);
    // var kService = crypto.HmacSHA256('execute-api', kRegion);
    // var kSigning = crypto.HmacSHA256("aws4_request", kService);
    const headers = new HttpHeaders({
        'AcessKey': environment.pdsUserKey,
        'SecretKey': environment.pdsUserSecret
      })
     this.http.get(url, {headers}).subscribe(res => console.log(res), err => console.log(err));
  }
}
