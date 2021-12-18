import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl=`${window.location.protocol}//${window.location.hostname}:${window.location.port}/issues_api/`;
    //'http://'+window.location.hostname+':3000/issues_api/projects';
    
   }

   /**Devuelve los proyectos */
  get() {         
    return this.httpClient.get(`${this.resourceUrl}projects`);
  }
  /**Devuelve datos de un proyecto */
  getProyectoSolo(id: number){
    return this.httpClient.get(`${this.resourceUrl}projects?id=${id}`);
  }

  /**Obtiene usuarios miembros de un proyecto en particular(project_id) */
  getUsuarios(project_id: Number) {
    return this.httpClient.get(`${this.resourceUrl}getUsuarios?id=${project_id}`);
  }

  getUsuarioSolo(id: number){
    return this.httpClient.get(`${this.resourceUrl}getUser?id=${id}`);
  }
   
}
