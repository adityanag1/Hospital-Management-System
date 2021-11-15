import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appoinment } from '../Models/app';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private ApiUrl="http://localhost:63503/api/Apps";
  private getUrl = "http://localhost:63503/GetAppById"


 constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  postApp(app: Appoinment): Observable<Appoinment> {
    return this.httpClient.post<Appoinment>(this.ApiUrl, JSON.stringify(app), this.httpOptions)
  }   
  getApp(): Observable<Appoinment[]> {
    return this.httpClient.get<Appoinment[]>(this.ApiUrl+'/GetPatientApps' ) 
  }
  getapp(): Observable<Appoinment> {
    return this.httpClient.get<Appoinment>(this.ApiUrl ) 
  }
  getAppById(id:number): Observable<Appoinment> {
    return this.httpClient.get<Appoinment>(this.getUrl+"?id="+id) ;
  } 
  // getapp(){
  //   let appdetails:any=sessionStorage.getItem('app')
  //   let app=JSON.parse(appdetails)
  //   return app 
  // } 
  // setapp(app: Appoinment){
  //   sessionStorage.setItem('app',JSON.stringify(app))
  // }
}
