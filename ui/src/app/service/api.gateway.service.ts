
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AwsClient } from 'aws4fetch'
import { Promise } from 'es6-promise';

@Injectable({
    providedIn: 'root'
})
export class ApiGatewayService {

    constructor() {}

    doPost(url ,body): Promise<any> {
        
        const service= 'execute-api'
        const region = 'us-east-1'

        const aws = new AwsClient({
            accessKeyId: environment.pdsUserKey,
            secretAccessKey: environment.pdsUserSecret,
            service,
            region
        })

        return aws.fetch(url, {
            method: 'POST',
            headers: {
                "x-api-key": environment.apiKey,
                "content-type": 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => data);
    }
}