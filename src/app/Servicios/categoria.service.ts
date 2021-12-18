import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/issues_api/`;                     
   }

   getById(id:number)
   {
     return this.httpClient.get(`${this.resourceUrl}getCategories?id=${id}`);    
   }
   getCategoriaInfo(id:number)
   {
     return this.httpClient.get(`${this.resourceUrl}getinfoCategory?id=${id}`);    
   }

}
