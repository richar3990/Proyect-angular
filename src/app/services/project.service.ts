import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';
@Injectable()
export class ProjectService {
  public url: string;
  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }
  testService(): any{
    return 'Probando el servicio de Angular';
  }
  saveProject(project: Project): Observable<any>{
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(this.url + 'save-project', params,{ headers: headers});
  }
  getProjects(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'projects', { headers: headers});
  }
  getProject(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'project/' + id, { headers: headers});
  }
  deleteProject(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'project/' + id, { headers: headers});
  }
  updateProject(project): Observable<any>{
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'update-project/' + project._id , params, {headers: headers});
  }
}
