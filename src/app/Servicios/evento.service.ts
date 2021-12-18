import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/cron_api/`;
    //'http://'+window.location.hostname+':3000/cron_api/';
   }

   get()
   {
     return this.httpClient.get(this.resourceUrl);
   }

   delete(id:number)
   {
      return this.httpClient.delete(`${this.resourceUrl}delete?id=${id}`);
        //this.resourceUrl+'delete?id='+ id);
   }
   
  
   /**Salva el reminder de los issue, past due [FormReg2] */
  postReminder(obj: any){
    return this.httpClient.post(`${this.resourceUrl}postReminder`, JSON.stringify(obj));
  }


   postAllIssuesAllProjects(obj: any){
     return this.httpClient.post(`${this.resourceUrl}postAllIssuesAllProjects`, JSON.stringify(obj));       
   }
   postOneProjectAllIssues(obj: any){
     return this.httpClient.post(`${this.resourceUrl}postOneProjectAllIssues`, JSON.stringify(obj));       
   }
   postQueryGeneral(obj: any){
     return this.httpClient.post(`${this.resourceUrl}postQueryGeneral`,  JSON.stringify(obj));     
   }
   postOneProjectOneIssue(obj: any){
     return this.httpClient.post(`${this.resourceUrl}postOneProjectOneIssue`, JSON.stringify(obj));     
   }
   postQueryGenralOneProject(obj: any){
     return this.httpClient.post(`${this.resourceUrl}post`, JSON.stringify(obj));  
   }

   

}
