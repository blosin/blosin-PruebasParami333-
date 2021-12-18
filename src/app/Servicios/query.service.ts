import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/cron_api/getQuerys/`;
    //'http://'+window.location.hostname+':3000/cron_api/getQuerys/';
   }

   getQuerys()
   {
     return this.httpClient.get(this.resourceUrl);
   }

   
}
