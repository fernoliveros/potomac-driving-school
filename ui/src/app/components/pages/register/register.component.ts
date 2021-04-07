import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as aws4 from "aws4";

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
    let request = {
      host: '/qgsw8guhb1.execute-api.us-east-1.amazonaws.com',
      method: 'GET',
      url:  `https://qgsw8guhb1.execute-api.us-east-1.amazonaws.com/default/helloWorldLambda`,
      path: '/default/helloWorldLambda'
    }
   
     let signedRequest = aws4.sign(request, {
       secretAccessKey: 'cP7pLprQkDaT8VoceJbaleqXOsZMaFXHqL2sE+21',
       accessKeyId: 'AKIA4CFHWVLTHA4V3G7O',
      //  secretAccessKey: AWS.config.credentials.secretAccessKey,
      //  accessKeyId: AWS.config.credentials.accessKeyId,
     });
     delete signedRequest.headers['Host'];
     this.http.get(signedRequest.url, signedRequest).subscribe(res => console.log(res), err => console.log(err));
  }
}
