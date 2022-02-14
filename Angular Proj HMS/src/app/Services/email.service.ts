import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appoinment } from '../Models/app';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private ApiUrl="http://localhost:63503/api/EmailSender/SendEmail";

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  email(emailid:string,name:string,adate:string,adesc:string,atime:string,dname:string): Observable<Appoinment> {
    
    let url=this.ApiUrl+"?Emailid="+emailid+"&Name="+name+"&adate="+adate+"&adesc="+adesc+"&atime="+atime+"&dname="+dname
    
    return this.httpClient.post<Appoinment>(url, this.httpOptions)
  } 
}
